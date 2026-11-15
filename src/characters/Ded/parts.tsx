import React from "react";
import { COLORS } from "../../config/video";
import { Face, type FaceProps } from "../shared/Face";

export const DedArm: React.FC<{ side: "left" | "right"; angle: number }> = ({ side, angle }) => {
  const x = side === "left" ? 136 : 464;
  return <g transform={`rotate(${side === "left" ? angle : -angle} ${x} 420)`}>
    <rect x={x - 38} y={401} width={76} height={190} rx={38} fill={COLORS.paper} />
    <rect x={x - 38} y={449} width={76} height={23} fill={COLORS.telnyashka} />
    <rect x={x - 38} y={499} width={76} height={23} fill={COLORS.telnyashka} />
    <rect x={x - 34} y={557} width={68} height={118} rx={34} fill={COLORS.skin} />
  </g>;
};

export const DedTorso: React.FC = () => (
  <g>
    <rect x={265} y={312} width={70} height={100} rx={24} fill={COLORS.skinShadow} />
    <path d="M123 447 Q117 382 225 367 Q300 405 375 367 Q483 382 477 447 L480 700 L120 700Z" fill={COLORS.paper} />
    {[432, 487, 542, 597, 652].map((y) => <rect key={y} x={123} y={y} width={354} height={24} rx={6} fill={COLORS.telnyashka} />)}
    <path d="M225 367 Q300 420 375 367 L367 393 Q300 448 233 393Z" fill={COLORS.telnyashka} />
  </g>
);

export const DedHead: React.FC<FaceProps & { tilt: number }> = ({ tilt, ...face }) => (
  <g transform={`rotate(${tilt} 300 345)`}>
    <ellipse cx={187} cy={226} rx={26} ry={33} fill={COLORS.skinShadow} />
    <ellipse cx={413} cy={226} rx={26} ry={33} fill={COLORS.skinShadow} />
    <ellipse cx={300} cy={206} rx={116} ry={143} fill={COLORS.skin} />
    <path d="M186 223 Q166 108 216 83 Q205 53 239 68 Q286 32 319 61 Q361 44 379 80 Q431 99 414 223 L389 189 L380 128 Q300 103 218 134 L212 195Z" fill={COLORS.grayHair} />
    <path d="M202 269 Q227 284 239 275 Q300 302 361 275 Q373 284 398 269 Q384 358 300 378 Q216 358 202 269Z" fill={COLORS.grayHair} />
    <path d="M235 329 Q300 367 365 329 Q334 374 300 378 Q266 374 235 329Z" fill={COLORS.grayHairShadow} />
    {/* Морщины — короткие заполненные формы, без обводок. */}
    <rect x={270} y={126} width={60} height={5} rx={2.5} fill={COLORS.skinShadow} />
    <rect x={280} y={138} width={40} height={4} rx={2} fill={COLORS.skinShadow} />
    <path d="M203 224 L229 231 L226 236 L202 229Z M397 224 L371 231 L374 236 L398 229Z" fill={COLORS.skinShadow} />
    <g transform="translate(300 215)"><Face {...face} elderly /></g>
    <path d="M265 269 Q279 257 300 267 Q321 257 335 269 L329 284 Q313 285 300 277 Q287 285 271 284Z" fill={COLORS.grayHairShadow} />
  </g>
);
