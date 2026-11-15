// Плашки в верхнем левом углу: «ДЕНЬ N» и процент прогресса.
// Сквозной элемент сериала — по нему зритель узнаёт ролик с первого кадра.
import React from "react";
import { COLORS, FONTS } from "../config/video";

type Props = {
  day: number;
  /** Прогресс 0..100 */
  progress: number;
  top?: number;
  left?: number;
};

const badge: React.CSSProperties = {
  background: COLORS.badgeBg,
  borderRadius: 18,
  padding: "8px 22px",
  fontFamily: FONTS.caption,
  fontWeight: 700,
  lineHeight: 1.1,
  textAlign: "center",
};

export const DayCounter: React.FC<Props> = ({ day, progress, top = 170, left = 50 }) => (
  <div style={{ position: "absolute", top, left, display: "flex", gap: 16 }}>
    <div style={badge}>
      <div style={{ fontSize: 30, color: COLORS.captionMain, opacity: 0.8 }}>ДЕНЬ</div>
      <div style={{ fontSize: 64, color: COLORS.captionAccent }}>{day}</div>
    </div>
    <div style={badge}>
      <div style={{ fontSize: 30, color: COLORS.captionMain, opacity: 0.8 }}>ПРОГРЕСС</div>
      <div style={{ fontSize: 64, color: COLORS.progress }}>{Math.round(progress)}%</div>
    </div>
  </div>
);
