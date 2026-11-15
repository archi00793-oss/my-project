import React from "react";
import type { FaceProps } from "../shared/Face";
import { DedArm, DedHead, DedTorso } from "./parts";

export type DedProps = FaceProps & {
  armLeft?: number;
  armRight?: number;
  headTilt?: number;
  bob?: number;
  width?: number;
  style?: React.CSSProperties;
};

export const DED_ASPECT = 700 / 600;

/** Дед по пояс. Прищур по умолчанию; eyesOpen управляет морганием поверх него. */
export const Ded: React.FC<DedProps> = ({
  expression = "sly", eyesOpen = 1, armLeft = 0, armRight = 0,
  headTilt = 0, bob = 0, width = 600, style, ...face
}) => (
  <svg viewBox="0 0 600 700" width={width} height={width * DED_ASPECT}
    style={{ overflow: "visible", ...style }} role="img" aria-label="Дед Михалыч">
    <g transform={`translate(0 ${bob})`}>
      <DedTorso />
      <DedArm side="left" angle={armLeft} />
      <DedArm side="right" angle={armRight} />
      <DedHead tilt={headTilt} expression={expression}
        eyesOpen={eyesOpen * (expression === "sly" ? 0.42 : expression === "serious" ? 0.65 : 1)} {...face} />
    </g>
  </svg>
);
