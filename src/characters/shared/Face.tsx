import React, { useId } from "react";
import { COLORS } from "../../config/video";

export type CharacterExpression =
  | "neutral" | "happy" | "sad" | "surprised" | "angry"
  | "confused" | "sly" | "serious";

export type FaceProps = {
  expression?: CharacterExpression;
  /** Открытость рта и глаз 0..1; взгляд -1..1. */
  mouthOpen?: number;
  eyesOpen?: number;
  lookX?: number;
  elderly?: boolean;
};

export const clampUnit = (value: number) => Math.max(0, Math.min(1, value));

const BROWS: Record<CharacterExpression, [number, number, number]> = {
  neutral: [0, 0, 0], happy: [-6, -7, -7], sad: [-18, -3, -3],
  surprised: [0, -22, -22], angry: [19, 5, 5], confused: [-12, -17, 3],
  sly: [9, -7, 2], serious: [10, 2, 2],
};

/** Лицо в локальных координатах: глаза на y=0, рот на y=82. Только заливки. */
export const Face: React.FC<FaceProps> = ({
  expression = "neutral", mouthOpen = 0, eyesOpen = 1, lookX = 0, elderly = false,
}) => {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [angle, leftY, rightY] = BROWS[expression];
  const eyeHeight = Math.max(2, 24 * clampUnit(eyesOpen));
  const shift = Math.max(-1, Math.min(1, lookX)) * 9;
  const mouth = clampUnit(mouthOpen);
  const browColor = elderly ? COLORS.grayHairShadow : COLORS.hair;
  return (
    <g>
      <defs>
        <clipPath id={`${id}-eyes`}>
          <ellipse cx={-42} cy={0} rx={25} ry={eyeHeight} />
          <ellipse cx={42} cy={0} rx={25} ry={eyeHeight} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-eyes)`}>
        <rect x={-72} y={-28} width={144} height={56} fill={COLORS.eyeWhite} />
        <circle cx={-42 + shift} cy={3} r={11} fill={COLORS.pupil} />
        <circle cx={42 + shift} cy={3} r={11} fill={COLORS.pupil} />
      </g>
      <rect x={-70} y={-44 + leftY} width={56} height={12} rx={6}
        fill={browColor} transform={`rotate(${angle} -14 ${-38 + leftY})`} />
      <rect x={14} y={-44 + rightY} width={56} height={12} rx={6}
        fill={browColor} transform={`rotate(${-angle} 14 ${-38 + rightY})`} />
      <ellipse cx={0} cy={40} rx={16} ry={12} fill={COLORS.skinShadow} />
      {mouth > 0.06 ? (
        <g>
          <ellipse cx={0} cy={82} rx={25} ry={5 + mouth * 27} fill={COLORS.mouth} />
          {mouth > 0.45 && <ellipse cx={0} cy={76 - mouth * 15} rx={17} ry={4} fill={COLORS.paper} />}
        </g>
      ) : expression === "happy" || expression === "sly" ? (
        <path d={expression === "sly" ? "M-27 80 Q0 88 30 73 Q15 100 -9 91Z" : "M-29 77 Q0 90 29 77 Q0 112 -29 77Z"} fill={COLORS.mouth} />
      ) : expression === "sad" || expression === "confused" ? (
        <path d="M-25 88 Q0 62 25 88 Q0 78 -25 88Z" fill={COLORS.mouth} />
      ) : expression === "surprised" ? (
        <ellipse cx={0} cy={82} rx={13} ry={19} fill={COLORS.mouth} />
      ) : <rect x={-24} y={80} width={48} height={7} rx={3.5} fill={COLORS.mouth} />}
    </g>
  );
};
