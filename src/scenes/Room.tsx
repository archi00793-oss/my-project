// Комната героя — основной фон сериала (1080×1920).
import React from "react";
import { COLORS, VIDEO } from "../config/video";

export type RoomProps = {
  /** Число на настенном календаре */
  calendarDay?: number;
  /** Время суток за окном */
  night?: boolean;
};

const { width: W, height: H } = VIDEO;
const FLOOR_Y = 1380;

export const Room: React.FC<RoomProps> = ({ calendarDay = 1, night = true }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    {/* Стена с вертикальными полосами */}
    <rect width={W} height={FLOOR_Y} fill={COLORS.wall} />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={i * 90 + 40} y={0} width={14} height={FLOOR_Y} fill={COLORS.wallStripe} />
    ))}

    {/* Пол с досками */}
    <rect y={FLOOR_Y} width={W} height={H - FLOOR_Y} fill={COLORS.floor} />
    {[1480, 1600, 1740, 1880].map((y) => (
      <rect key={y} y={y} width={W} height={8} fill={COLORS.floorLine} />
    ))}
    <rect y={FLOOR_Y - 18} width={W} height={18} fill={COLORS.floorLine} />

    {/* Окно */}
    <rect x={370} y={230} width={340} height={400} rx={18} fill={COLORS.windowFrame} />
    <rect x={392} y={252} width={296} height={356} fill={night ? COLORS.night : COLORS.screenSky} />
    <rect x={536} y={252} width={10} height={356} fill={COLORS.windowFrame} />
    <rect x={392} y={425} width={296} height={10} fill={COLORS.windowFrame} />
    {night ? (
      <>
        <circle cx={628} cy={320} r={34} fill={COLORS.moon} />
        <circle cx={612} cy={308} r={32} fill={COLORS.night} />
        {[
          [430, 290],
          [490, 360],
          [600, 500],
          [450, 520],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill={COLORS.moon} />
        ))}
      </>
    ) : (
      <circle cx={620} cy={320} r={40} fill="#FFE27A" />
    )}

    {/* Постер слева */}
    <g transform="rotate(-4 205 560)">
      <rect x={90} y={400} width={230} height={310} fill={COLORS.poster} />
      <rect x={115} y={425} width={180} height={190} fill={COLORS.night} />
      <path d="M205 450 L265 585 L145 585 Z" fill={COLORS.captionAccent} />
      <rect x={130} y={635} width={150} height={18} fill={COLORS.paper} />
      <rect x={150} y={665} width={110} height={12} fill={COLORS.paper} opacity={0.7} />
    </g>

    {/* Календарь справа */}
    <g transform="rotate(3 885 540)">
      <rect x={790} y={430} width={190} height={220} fill={COLORS.paper} />
      <rect x={790} y={430} width={190} height={56} fill={COLORS.calendarRed} />
      <text
        x={885}
        y={610}
        textAnchor="middle"
        fontFamily="Oswald"
        fontWeight={700}
        fontSize={110}
        fill="#1E1E24"
      >
        {calendarDay}
      </text>
    </g>

    {/* Стол с монитором справа */}
    <rect x={760} y={1110} width={320} height={26} fill={COLORS.desk} />
    <rect x={1040} y={1136} width={22} height={250} fill={COLORS.desk} />
    <rect x={790} y={900} width={260} height={180} rx={10} fill={COLORS.monitorFrame} />
    <rect x={806} y={916} width={228} height={148} fill={COLORS.screenSky} />
    <path d="M806 1030 Q880 980 950 1010 Q1000 985 1034 1000 L1034 1064 L806 1064 Z" fill={COLORS.screenHill} />
    <rect x={905} y={1080} width={30} height={30} fill={COLORS.monitorFrame} />

    {/* Кресло слева */}
    <rect x={40} y={1040} width={220} height={300} rx={40} fill={COLORS.poster} />
    <rect x={70} y={1250} width={160} height={40} rx={20} fill="#9E3830" />
  </svg>
);
