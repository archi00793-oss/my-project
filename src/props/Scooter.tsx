import React from "react";
import { COLORS } from "../config/video";
import { PropSvg, type PropProps } from "./PropSvg";

export const Scooter: React.FC<PropProps> = (props) => (
  <PropSvg canvas={[480, 450]} label="Самокат Лёхи" {...props}>
    <circle cx={92} cy={386} r={42} fill={COLORS.shoes} />
    <circle cx={92} cy={386} r={24} fill={COLORS.plasticLight} />
    <circle cx={92} cy={386} r={10} fill={COLORS.courier} />
    <circle cx={397} cy={386} r={42} fill={COLORS.shoes} />
    <circle cx={397} cy={386} r={24} fill={COLORS.plasticLight} />
    <circle cx={397} cy={386} r={10} fill={COLORS.courier} />
    <rect x={75} y={354} width={262} height={24} rx={12} fill={COLORS.lyokhaHoodie} />
    <rect x={110} y={349} width={190} height={12} rx={6} fill={COLORS.plasticLight} />
    <path d="M320 365 L382 365 L406 380 L396 393 L373 382 L323 382Z" fill={COLORS.lyokhaHoodieShadow} />
    <path d="M371 369 L334 67 L354 64 L392 373Z" fill={COLORS.plasticLight} />
    <path d="M330 155 L344 153 L366 322 L351 325Z" fill={COLORS.courier} />
    <rect x={274} y={47} width={145} height={23} rx={11} fill={COLORS.lyokhaHoodie} />
    <rect x={264} y={43} width={49} height={30} rx={12} fill={COLORS.shoes} />
    <rect x={386} y={43} width={47} height={30} rx={12} fill={COLORS.shoes} />
    <rect x={335} y={25} width={24} height={15} rx={5} fill={COLORS.plastic} />
  </PropSvg>
);
