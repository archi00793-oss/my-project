// Единые параметры видео и стиля. Меняем только здесь, не хардкодим в сценах.

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

/** Перевод секунд в кадры: sec(2.5) === 75 при 30 fps */
export const sec = (seconds: number) => Math.round(seconds * VIDEO.fps);

/** Палитра сериала. Плоские цвета, без градиентов и обводок. */
export const COLORS = {
  // комната
  wall: "#2E2F6B",
  wallStripe: "#34367A",
  floor: "#5A3F33",
  floorLine: "#4C352B",
  windowFrame: "#4A4C8F",
  night: "#14163A",
  moon: "#F3E9C6",
  desk: "#3B3E58",
  monitorFrame: "#1F2230",
  screenSky: "#7DB8F0",
  screenHill: "#7CC46E",
  poster: "#C9483E",
  calendarRed: "#D2463C",
  paper: "#F4F1EA",

  // персонаж
  skin: "#F1C5A3",
  skinShadow: "#E0AD8A",
  hair: "#4A2E22",
  hoodie: "#E2803A",
  hoodieShadow: "#C86C2C",
  pants: "#2F4E86",
  shoes: "#1E1E24",
  eyeWhite: "#FFFFFF",
  pupil: "#1E1E24",
  mouth: "#7A2E2E",

  // интерфейс
  captionMain: "#FFFFFF",
  captionAccent: "#F5C33B",
  captionStroke: "#141414",
  badgeBg: "rgba(20, 20, 30, 0.75)",
  progress: "#59D07A",
} as const;

export const FONTS = {
  caption: "Oswald",
} as const;
