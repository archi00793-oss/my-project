// Камера не знает о персонажах: рассчитывает только положение содержимого сцены.
import { Easing, interpolate, random } from "remotion";

export type CameraKeyframe = {
  frame: number;
  zoom?: number;
  x?: number;
  y?: number;
};

export type CameraShake = {
  from: number;
  durationInFrames: number;
  /** Сила сдвига в пикселях. */
  strength?: number;
  /** Максимальный поворот в градусах. */
  rotation?: number;
  /** Скорость колебаний в радианах на кадр. */
  frequency?: number;
  seed?: string;
};

export type CameraState = { zoom: number; x: number; y: number; rotation: number };

/** Кадры локальные: внутри Sequence отсчёт камеры тоже начинается с нуля. */
export const getCameraState = (
  frame: number,
  keyframes: readonly CameraKeyframe[] = [],
  shakes: readonly CameraShake[] = [],
): CameraState => {
  let previous = { zoom: 1, x: 0, y: 0 };
  const points = keyframes.map((point, index) => {
    if (
      !Number.isInteger(point.frame) || point.frame < 0 ||
      (index > 0 && point.frame <= keyframes[index - 1].frame)
    ) {
      throw new Error("Кадры камеры должны быть целыми, неотрицательными и строго возрастать.");
    }
    previous = {
      zoom: point.zoom ?? previous.zoom,
      x: point.x ?? previous.x,
      y: point.y ?? previous.y,
    };
    if (!Object.values(previous).every(Number.isFinite) || previous.zoom <= 0) {
      throw new Error("Координаты камеры должны быть конечными, zoom — больше нуля.");
    }
    return { frame: point.frame, ...previous };
  });

  const sample = (property: "zoom" | "x" | "y", fallback: number) => {
    if (points.length === 0) return fallback;
    if (points.length === 1) return points[0][property];
    return interpolate(frame, points.map((p) => p.frame), points.map((p) => p[property]), {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
  };

  const state: CameraState = {
    zoom: sample("zoom", 1), x: sample("x", 0), y: sample("y", 0), rotation: 0,
  };

  for (const shake of shakes) {
    const { from, durationInFrames, strength = 12, rotation = 0.6, frequency = 1.8, seed = "camera" } = shake;
    if (
      !Number.isInteger(from) || from < 0 ||
      !Number.isInteger(durationInFrames) || durationInFrames < 2 ||
      ![strength, rotation, frequency].every(Number.isFinite) ||
      strength < 0 || rotation < 0 || frequency <= 0
    ) {
      throw new Error("Некорректные параметры тряски камеры.");
    }
    const elapsed = frame - from;
    if (elapsed <= 0 || elapsed >= durationInFrames - 1) continue;
    // Плавная огибающая убирает скачки на начале и конце эффекта.
    const envelope = Math.sin(Math.PI * elapsed / (durationInFrames - 1));
    const wave = (axis: string, speed: number) =>
      Math.sin(elapsed * frequency * speed + random(`${seed}:${axis}`) * Math.PI * 2);
    state.x += wave("x", 1) * strength * envelope;
    state.y += wave("y", 1.31) * strength * envelope;
    state.rotation += wave("rotation", 0.83) * rotation * envelope;
  }

  return state;
};
