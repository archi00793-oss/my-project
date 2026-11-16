import React from "react";
import { COLORS } from "../../config/video";
import type { FaceProps } from "../shared/Face";
import { LyokhaArm, LyokhaHead, LyokhaTorso, LyokhaReachArm, type HandTarget } from "./parts";

export type LyokhaProps = FaceProps & {
  /** Снять курьерскую куртку, оставив мятое худи. */
  jacket?: boolean;
  holdingPhone?: boolean;
  /** Содержимое экрана и укрупнение телефона для читаемого переднего плана. */
  phoneContent?: React.ReactNode;
  phoneWidth?: number;
  /** Подъём рук наружу в градусах, 0 — опущены. */
  armLeft?: number;
  armRight?: number;
  /** Сгиб локтей внутрь; 0 сохраняет прежнюю прямую руку. */
  bendLeft?: number;
  bendRight?: number;
  headTilt?: number;
  bob?: number;
  /** Приседание 0..1; подошвы остаются на полу. Точки рук — в координатах SVG. */
  crouch?: number;
  /** Смещение ступней для шага на опору, в координатах персонажа. */
  stepLeft?: number;
  stepRight?: number;
  handLeft?: HandTarget;
  handRight?: HandTarget;
  leftHandItem?: React.ReactNode;
  rightHandItem?: React.ReactNode;
  /** Удерживаемый реквизит позади кистей, в координатах персонажа. */
  children?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
};

export const LYOKHA_ASPECT = 1100 / 600;

export const Lyokha: React.FC<LyokhaProps> = ({
  jacket = true, holdingPhone = true, armLeft = 0, armRight = 0, bendLeft = 0, bendRight = 0,
  phoneContent, phoneWidth, headTilt = 0, bob = 0, crouch = 0, stepLeft = 0, stepRight = 0, handLeft, handRight,
  leftHandItem, rightHandItem, children, width = 600, style, ...face
}) => (
  <svg viewBox="0 0 600 1100" width={width} height={width * LYOKHA_ASPECT}
    style={{ overflow: "visible", ...style }} role="img" aria-label="Лёха">
    <path d={`M224 ${747 + crouch * 160} Q${185 - crouch * 40} ${925 + crouch * 25 + stepLeft * 0.5} 224 ${1056 + stepLeft} H288 Q${255 - crouch * 50} ${930 + stepLeft * 0.5} 288 ${747 + crouch * 160}Z`} fill={COLORS.pants} />
    <path d={`M312 ${747 + crouch * 160} Q${345 + crouch * 50} ${930 + stepRight * 0.5} 312 ${1056 + stepRight} H376 Q${415 + crouch * 40} ${925 + crouch * 25 + stepRight * 0.5} 376 ${747 + crouch * 160}Z`} fill={COLORS.pants} />
    <g transform={`translate(0 ${stepLeft})`}>
      <path d="M217 1023 L281 1023 L285 1064 Q269 1092 196 1079 Q182 1072 192 1050Z" fill={COLORS.shoes} />
      <rect x={190} y={1067} width={95} height={10} rx={5} fill={COLORS.paper} />
    </g>
    <g transform={`translate(0 ${stepRight})`}>
      <path d="M319 1023 L383 1023 L408 1050 Q418 1072 404 1079 Q331 1092 315 1064Z" fill={COLORS.shoes} />
      <rect x={315} y={1067} width={95} height={10} rx={5} fill={COLORS.paper} />
    </g>
    <g transform={`translate(0 ${bob + crouch * 160})`}>
      <LyokhaTorso jacket={jacket} />
      {children}
      {handLeft ? <LyokhaReachArm side="left" target={[handLeft[0], handLeft[1] - crouch * 160 - bob]} jacket={jacket} item={leftHandItem} />
        : <LyokhaArm side="left" angle={armLeft} bend={bendLeft} jacket={jacket} />}
      {handRight ? <LyokhaReachArm side="right" target={[handRight[0], handRight[1] - crouch * 160 - bob]} jacket={jacket} item={rightHandItem} />
        : <LyokhaArm side="right" angle={armRight} bend={bendRight} jacket={jacket} holdingPhone={holdingPhone}
          phoneContent={phoneContent} phoneWidth={phoneWidth} />}
      <LyokhaHead tilt={headTilt} {...face} />
    </g>
  </svg>
);
