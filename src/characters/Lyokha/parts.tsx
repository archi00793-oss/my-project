import React from "react";
import { COLORS } from "../../config/video";
import { Phone } from "../../props/Phone";
import { Face, type FaceProps } from "../shared/Face";

export const LyokhaArm: React.FC<{
  side: "left" | "right"; angle: number; jacket: boolean; holdingPhone?: boolean;
}> = ({ side, angle, jacket, holdingPhone }) => {
  const x = side === "left" ? 190 : 410;
  return (
    <g transform={`rotate(${side === "left" ? angle : -angle} ${x} 460)`}>
      <rect x={x - 28} y={440} width={56} height={246} rx={28}
        fill={jacket ? COLORS.courier : COLORS.lyokhaHoodie} />
      <rect x={x - 28} y={648} width={56} height={25} rx={8}
        fill={jacket ? COLORS.courierShadow : COLORS.lyokhaHoodieShadow} />
      {holdingPhone && <Phone x={x - 29} y={600} width={66} />}
      <ellipse cx={x - (holdingPhone ? 13 : 0)} cy={697} rx={28} ry={32} fill={COLORS.skin} />
    </g>
  );
};

export const LyokhaTorso: React.FC<{ jacket: boolean }> = ({ jacket }) => (
  <g>
    <rect x={271} y={340} width={58} height={91} rx={22} fill={COLORS.skinShadow} />
    <path d="M180 462 Q180 409 240 405 L360 405 Q420 409 420 462 L407 778 Q300 801 193 778Z" fill={COLORS.lyokhaHoodie} />
    <path d="M237 405 Q300 471 363 405 L348 467 Q300 496 252 467Z" fill={COLORS.lyokhaHoodieShadow} />
    <rect x={270} y={463} width={6} height={76} rx={3} fill={COLORS.paper} />
    <rect x={324} y={463} width={6} height={76} rx={3} fill={COLORS.paper} />
    <rect x={239} y={655} width={122} height={74} rx={22} fill={COLORS.lyokhaHoodieShadow} />
    <path d="M214 576 L244 582 L242 590 L214 584Z M353 613 L386 606 L388 613 L356 621Z" fill={COLORS.lyokhaHoodieShadow} />
    {jacket && <g>
      <path d="M236 406 L279 441 L279 779 L187 779 L178 465 Q177 420 236 406Z" fill={COLORS.courier} />
      <path d="M364 406 L321 441 L321 779 L413 779 L422 465 Q423 420 364 406Z" fill={COLORS.courier} />
      <path d="M238 404 L274 431 L258 488 L217 436Z M362 404 L326 431 L342 488 L383 436Z" fill={COLORS.courierShadow} />
      <rect x={183} y={585} width={96} height={18} rx={4} fill={COLORS.paper} />
      <rect x={321} y={585} width={96} height={18} rx={4} fill={COLORS.paper} />
      <rect x={340} y={513} width={48} height={29} rx={7} fill={COLORS.lyokhaHoodieShadow} />
      <path d="M352 527 L361 519 L361 524 L376 524 L376 530 L361 530 L361 535Z" fill={COLORS.paper} />
      <rect x={208} y={664} width={56} height={8} rx={4} fill={COLORS.courierShadow} />
      <rect x={336} y={664} width={56} height={8} rx={4} fill={COLORS.courierShadow} />
    </g>}
  </g>
);

export const LyokhaHead: React.FC<FaceProps & { tilt: number }> = ({ tilt, ...face }) => (
  <g transform={`rotate(${tilt} 300 365)`}>
    <ellipse cx={197} cy={250} rx={23} ry={31} fill={COLORS.skinShadow} />
    <ellipse cx={403} cy={250} rx={23} ry={31} fill={COLORS.skinShadow} />
    <path d="M201 196 Q203 115 300 116 Q397 115 399 196 L393 279 Q386 365 300 382 Q214 365 207 279Z" fill={COLORS.skin} />
    <path d="M207 284 Q238 353 300 361 Q362 353 393 284 Q380 366 300 382 Q220 365 207 284Z" fill={COLORS.skinShadow} />
    <path d="M193 194 Q178 103 239 92 Q275 58 322 89 Q394 74 410 155 L400 213 L375 171 L358 192 L340 156 L306 179 L290 144 L251 184 L249 153 L216 204Z" fill={COLORS.hair} />
    {/* Кепка козырьком назад: козырёк слева за головой. */}
    <path d="M205 142 L144 144 Q116 140 126 119 Q136 103 205 112Z" fill={COLORS.cap} />
    <path d="M197 129 Q207 49 297 48 Q382 43 401 126 L358 121 Q300 94 239 128Z" fill={COLORS.cap} />
    <path d="M266 100 Q299 87 331 100 L331 118 Q299 106 266 118Z" fill={COLORS.hair} />
    <rect x={281} y={105} width={39} height={10} rx={5} fill={COLORS.courier} />
    <g transform="translate(300 235)"><Face {...face} /></g>
  </g>
);
