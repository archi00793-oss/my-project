import React from "react";
import { random, useCurrentFrame } from "remotion";
import { COLORS } from "../config/video";
import { PropSvg, type PropProps } from "./PropSvg";
import { clampUnit } from "../characters/shared/Face";

export type TvProps = PropProps & {
  /** Любой React-контент экрана: SVG, персонаж, текст или видео. */
  children?: React.ReactNode;
  /** Сила помех 0..1. Кадры локальны относительно родительской Sequence. */
  noise?: number;
};

export const Tv: React.FC<TvProps> = ({ children, noise = 0, ...props }) => {
  const frame = useCurrentFrame();
  const intensity = clampUnit(noise);
  return (
    <PropSvg canvas={[480, 360]} label="Телевизор с видеозаписью" {...props}>
      <rect x={81} y={318} width={54} height={25} rx={8} fill={COLORS.shoes} />
      <rect x={346} y={318} width={54} height={25} rx={8} fill={COLORS.shoes} />
      <rect x={9} y={13} width={462} height={311} rx={32} fill={COLORS.plastic} />
      <rect x={25} y={29} width={366} height={270} rx={29} fill={COLORS.shoes} />
      <foreignObject x={37} y={41} width={342} height={246}>
        <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 23,
          position: "relative", background: COLORS.glass, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {children}
          {intensity > 0 && <svg viewBox="0 0 342 246" width="100%" height="100%"
            style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: intensity }}>
            <rect width={342} height={246} fill={COLORS.grayHairShadow} opacity={intensity * 0.8} />
            {Array.from({ length: 110 }, (_, i) => <rect key={i}
              x={random(`tv-x-${frame}-${i}`) * 342} y={random(`tv-y-${frame}-${i}`) * 246}
              width={6 + random(`tv-w-${frame}-${i}`) * 50} height={2 + random(`tv-h-${frame}-${i}`) * 8}
              fill={i % 2 === 0 ? COLORS.paper : COLORS.shoes} />)}
            {Array.from({ length: 20 }, (_, i) => <rect key={`line-${i}`} x={0} y={i * 13}
              width={342} height={2} fill={COLORS.shoes} opacity={0.45} />)}
            <rect x={0} y={(frame * 7) % 246} width={342} height={15} fill={COLORS.paper} opacity={0.6} />
          </svg>}
        </div>
      </foreignObject>
      <circle cx={430} cy={77} r={19} fill={COLORS.plasticLight} />
      <rect x={425} y={62} width={9} height={29} rx={4} fill={COLORS.grayHair} />
      <circle cx={430} cy={131} r={15} fill={COLORS.plasticLight} />
      {[190, 205, 220, 235, 250].map((y) => <rect key={y} x={409} y={y} width={42} height={5} rx={2.5} fill={COLORS.shoes} />)}
      <circle cx={429} cy={281} r={5} fill={COLORS.progress} />
    </PropSvg>
  );
};
