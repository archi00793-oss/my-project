import React from "react";
import { COLORS, FONTS } from "../config/video";
import { PropSvg, type PropProps } from "./PropSvg";

export type VhsTapeProps = PropProps & { label?: string };

const wrapLabel = (label: string): string[] => {
  const lines: string[] = [];
  for (const word of label.trim().split(/\s+/)) {
    const last = lines.length - 1;
    if (last < 0 || `${lines[last]} ${word}`.length > 29) lines.push(word);
    else lines[last] += ` ${word}`;
  }
  return lines;
};

export const VhsTape: React.FC<VhsTapeProps> = ({
  label = "Открой, когда меня не станет", ...props
}) => {
  const lines = wrapLabel(label);
  const fontSize = Math.min(25, 68 / Math.max(1, lines.length));
  return (
    <PropSvg canvas={[480, 270]} label={`Видеокассета: ${label}`} {...props}>
      <rect x={8} y={8} width={464} height={254} rx={19} fill={COLORS.shoes} />
      <rect x={24} y={21} width={432} height={223} rx={13} fill={COLORS.plastic} />
      <path d="M38 37 L442 32 L438 122 L42 126Z" fill={COLORS.paper} />
      <text x={240} y={78 - ((lines.length - 1) * fontSize * 1.15) / 2}
        textAnchor="middle" dominantBaseline="middle" fill={COLORS.hair}
        fontFamily={FONTS.caption} fontStyle="italic" fontSize={fontSize}>
        {lines.map((line, i) => <tspan key={i} x={240} dy={i === 0 ? 0 : fontSize * 1.15}
          textLength={line.length > 29 ? 370 : undefined} lengthAdjust="spacingAndGlyphs">{line}</tspan>)}
      </text>
      <rect x={60} y={144} width={360} height={77} rx={13} fill={COLORS.shoes} />
      {[140, 340].map((x) => <g key={x}>
        <circle cx={x} cy={182} r={31} fill={COLORS.plasticLight} />
        <circle cx={x} cy={182} r={19} fill={COLORS.paper} />
        <circle cx={x} cy={182} r={8} fill={COLORS.shoes} />
        {[0, 60, 120].map((angle) => <rect key={angle} x={x - 3} y={157} width={6} height={50} rx={3}
          fill={COLORS.plastic} transform={`rotate(${angle} ${x} 182)`} />)}
      </g>)}
      <rect x={209} y={153} width={62} height={59} rx={8} fill={COLORS.glass} />
      <text x={46} y={242} fontFamily={FONTS.caption} fontSize={13} fill={COLORS.grayHair}>VHS / E-180</text>
      <rect x={374} y={232} width={46} height={8} rx={3} fill={COLORS.plasticLight} />
    </PropSvg>
  );
};
