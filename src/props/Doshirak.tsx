import React from "react";
import { COLORS, FONTS } from "../config/video";
import { PropSvg, type PropProps } from "./PropSvg";

export type DoshirakProps = PropProps & {
  /** Сюда Лёха запишет адрес, когда он появится в сценарии. */
  note?: string;
};

export const Doshirak: React.FC<DoshirakProps> = ({ note, ...props }) => (
  <PropSvg canvas={[360, 280]} label="Дошик" {...props}>
    <path d="M36 98 L324 98 L296 246 Q180 272 64 246Z" fill={COLORS.paper} />
    <path d="M48 140 L312 140 L299 217 Q180 241 61 217Z" fill={COLORS.calendarRed} />
    <ellipse cx={180} cy={100} rx={149} ry={55} fill={COLORS.cardboardLight} />
    <ellipse cx={180} cy={98} rx={132} ry={42} fill={COLORS.noodle} />
    {[0, 1, 2, 3].map((i) => <path key={i}
      d={`M${70 + i * 14} ${83 + i * 10} q28 -22 56 0 t56 0 t56 0 l-5 8 q-28 22 -56 0 t-56 0 t-56 0Z`}
      fill={COLORS.courierShadow} />)}
    <rect x={126} y={75} width={13} height={12} rx={3} fill={COLORS.forest} />
    <rect x={214} y={102} width={15} height={12} rx={3} fill={COLORS.forest} />
    <text x={180} y={193} textAnchor="middle" fontSize={36} fontFamily={FONTS.caption} fill={COLORS.paper}>ДОШИК</text>
    {note && <g>
      <rect x={61} y={144} width={238} height={67} rx={8} fill={COLORS.paper} />
      <text x={180} y={185} textAnchor="middle" fontSize={22} fontFamily={FONTS.caption}
        fill={COLORS.hair} textLength={note.length > 19 ? 216 : undefined} lengthAdjust="spacingAndGlyphs">{note}</text>
    </g>}
    <path d="M261 80 L274 85 L332 18 Q337 10 329 6 Q322 4 317 12Z" fill={COLORS.plasticLight} />
    <path d="M255 82 L277 92 L268 109 L247 99Z" fill={COLORS.plasticLight} />
  </PropSvg>
);
