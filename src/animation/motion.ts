// Общие анимационные помощники. Все функции детерминированы (зависят только от кадра),
// поэтому рендер всегда даёт одинаковый результат. Math.random() не используем.
import { interpolate, spring } from "remotion";

/**
 * Моргание: возвращает открытость глаз 1 → 0 → 1.
 * Моргает каждые `every` кадров, со сдвигом `offset`.
 */
export const blink = (frame: number, every = 95, offset = 20): number => {
  const t = (frame + offset) % every;
  if (t > 6) return 1;
  return interpolate(t, [0, 3, 6], [1, 0.05, 1]);
};

/** Дыхание: плавное покачивание от -1 до 1 с периодом `period` кадров. */
export const breathe = (frame: number, period = 60): number =>
  Math.sin((frame / period) * Math.PI * 2);

/**
 * «Болтающий» рот: пока персонаж говорит, рот открывается и закрывается.
 * Если есть озвучка — используйте useMouthFromAudio из lipsync.ts.
 */
export const mouthFlap = (frame: number, talking: boolean): number => {
  if (!talking) return 0;
  const v = Math.abs(Math.sin(frame * 0.9)) * 0.7 + Math.abs(Math.sin(frame * 0.37)) * 0.3;
  return Math.min(1, v);
};

/** Пружинное появление 0 → 1, начиная с кадра `start`. */
export const popIn = (frame: number, fps: number, start = 0): number =>
  spring({ frame: frame - start, fps, config: { damping: 12, stiffness: 160 } });

/** Плавный переход 0 → 1 между кадрами from и to (с ограничением). */
export const ease = (frame: number, from: number, to: number): number =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
