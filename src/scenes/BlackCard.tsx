import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONTS, VIDEO } from "../config/video";

export type BlackCardProps = {
  /** Для финального титра передать «ЛЁХИНО»; по умолчанию фон пустой. */
  title?: string;
  /** Крупные планы реквизита размещаются поверх чёрного фона. */
  children?: React.ReactNode;
};

export const BlackCard: React.FC<BlackCardProps> = ({ title, children }) => (
  <AbsoluteFill>
    <svg viewBox={`0 0 ${VIDEO.width} ${VIDEO.height}`} width={VIDEO.width} height={VIDEO.height}
      style={{ position: "absolute", inset: 0 }} role="img" aria-label={title ?? "Чёрный фон"}>
      <rect width={VIDEO.width} height={VIDEO.height} fill={COLORS.black} />
      {title && <text x={VIDEO.width / 2} y={VIDEO.height / 2} textAnchor="middle" dominantBaseline="central"
        fontFamily={FONTS.caption} fontWeight={700} fontSize={150} fill={COLORS.paper}>{title}</text>}
    </svg>
    {children}
  </AbsoluteFill>
);
