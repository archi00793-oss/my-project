import React from "react";
import { COLORS, FONTS } from "../config/video";
import { PropSvg, type PropProps } from "./PropSvg";

export const Vcr: React.FC<PropProps> = (props) => (
  <PropSvg canvas={[500, 210]} label="Старый видеомагнитофон" {...props}>
    <rect x={50} y={172} width={59} height={22} rx={8} fill={COLORS.shoes} />
    <rect x={391} y={172} width={59} height={22} rx={8} fill={COLORS.shoes} />
    <path d="M20 58 L58 16 L443 16 L480 58Z" fill={COLORS.plasticLight} />
    <rect x={20} y={52} width={460} height={126} rx={17} fill={COLORS.plastic} />
    <rect x={46} y={73} width={281} height={44} rx={7} fill={COLORS.shoes} />
    <rect x={64} y={79} width={246} height={6} rx={3} fill={COLORS.plasticLight} />
    <text x={178} y={104} textAnchor="middle" fontFamily={FONTS.caption} fontSize={16} fill={COLORS.grayHair}>VIDEO CASSETTE RECORDER</text>
    <rect x={345} y={73} width={109} height={44} rx={7} fill={COLORS.glass} />
    <text x={399} y={104} textAnchor="middle" fontFamily={FONTS.caption} fontSize={25} fill={COLORS.progress}>00:01</text>
    <circle cx={60} cy={145} r={10} fill={COLORS.courier} />
    {[104, 138, 172, 206, 240].map((x) => <rect key={x} x={x} y={134} width={23} height={17} rx={4} fill={COLORS.plasticLight} />)}
    <path d="M356 135 L356 151 L370 143Z" fill={COLORS.paper} />
    <circle cx={395} cy={143} r={7} fill={COLORS.calendarRed} />
    <rect x={427} y={137} width={12} height={12} rx={2} fill={COLORS.paper} />
  </PropSvg>
);
