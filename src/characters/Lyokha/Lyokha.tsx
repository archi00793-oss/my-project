import React from "react";
import { COLORS } from "../../config/video";
import type { FaceProps } from "../shared/Face";
import { LyokhaArm, LyokhaHead, LyokhaTorso } from "./parts";

export type LyokhaProps = FaceProps & {
  /** Снять курьерскую куртку, оставив мятое худи. */
  jacket?: boolean;
  holdingPhone?: boolean;
  /** Подъём рук наружу в градусах, 0 — опущены. */
  armLeft?: number;
  armRight?: number;
  headTilt?: number;
  bob?: number;
  width?: number;
  style?: React.CSSProperties;
};

export const LYOKHA_ASPECT = 1100 / 600;

export const Lyokha: React.FC<LyokhaProps> = ({
  jacket = true, holdingPhone = true, armLeft = 0, armRight = 0,
  headTilt = 0, bob = 0, width = 600, style, ...face
}) => (
  <svg viewBox="0 0 600 1100" width={width} height={width * LYOKHA_ASPECT}
    style={{ overflow: "visible", ...style }} role="img" aria-label="Лёха">
    <rect x={224} y={747} width={64} height={309} rx={24} fill={COLORS.pants} />
    <rect x={312} y={747} width={64} height={309} rx={24} fill={COLORS.pants} />
    <path d="M217 1023 L281 1023 L285 1064 Q269 1092 196 1079 Q182 1072 192 1050Z M319 1023 L383 1023 L408 1050 Q418 1072 404 1079 Q331 1092 315 1064Z" fill={COLORS.shoes} />
    <rect x={190} y={1067} width={95} height={10} rx={5} fill={COLORS.paper} />
    <rect x={315} y={1067} width={95} height={10} rx={5} fill={COLORS.paper} />
    <g transform={`translate(0 ${bob})`}>
      <LyokhaTorso jacket={jacket} />
      <LyokhaArm side="left" angle={armLeft} jacket={jacket} />
      <LyokhaArm side="right" angle={armRight} jacket={jacket} holdingPhone={holdingPhone} />
      <LyokhaHead tilt={headTilt} {...face} />
    </g>
  </svg>
);
