import React from "react";
import { COLORS, VIDEO } from "../config/video";

export type DoorwayProps = {
  /** Открытый проём виден из квартиры; закрытая дверь — перед звонком. */
  open?: boolean;
};

const { width: W, height: H } = VIDEO;

/** Пустая лестничная площадка. Коробка и герой добавляются самой сценой. */
export const Doorway: React.FC<DoorwayProps> = ({ open = true }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
    style={{ position: "absolute", inset: 0 }} role="img"
    aria-label={open ? "Открытая дверь на пустую лестничную площадку" : "Закрытая дверь квартиры"}>
    <rect width={W} height={H} fill={COLORS.apartmentWall} />
    <rect y={1535} width={W} height={H - 1535} fill={COLORS.floor} />
    <rect x={80} y={1515} width={850} height={20} rx={6} fill={COLORS.apartmentTrim} />

    {/* Площадка в глубине, двухцветная стена типового подъезда. */}
    <rect x={144} y={305} width={680} height={1232} rx={20} fill={COLORS.landingWall} />
    <rect x={144} y={870} width={680} height={440} fill={COLORS.landingDado} />
    <rect x={144} y={861} width={680} height={12} fill={COLORS.cabinet} />
    <rect x={144} y={1290} width={680} height={247} fill={COLORS.landingFloor} />
    <path d="M144 1290 H824 V1310 H144Z" fill={COLORS.landingStep} />

    {/* Лестничный марш справа и перила из плоских заливок. */}
    <path d="M487 1289 V1190 H545 V1096 H603 V1002 H661 V908 H719 V814 H777 V720 H824 V1289Z" fill={COLORS.landingStep} />
    {[[487, 1190], [545, 1096], [603, 1002], [661, 908], [719, 814], [777, 720]].map(([x, y]) => (
      <rect key={x} x={x} y={y} width={824 - x} height={13} rx={4} fill={COLORS.counter} />
    ))}
    <path d="M465 1130 L794 601 L807 610 L478 1140Z" fill={COLORS.monitorFrame} />
    {[[496, 1090], [583, 950], [670, 810], [757, 670]].map(([x, y]) => (
      <rect key={x} x={x} y={y} width={12} height={155} rx={5} fill={COLORS.monitorFrame} />
    ))}
    <rect x={355} y={425} width={135} height={26} rx={13} fill={COLORS.apartmentTrim} />
    <rect x={368} y={430} width={109} height={15} rx={7} fill={COLORS.moon} />

    {/* Косяки и порог со стороны однушки. */}
    <rect x={113} y={277} width={733} height={49} rx={12} fill={COLORS.doorInset} />
    <rect x={113} y={305} width={43} height={1234} rx={10} fill={COLORS.doorWood} />
    <rect x={815} y={305} width={31} height={1234} rx={9} fill={COLORS.doorWood} />
    <rect x={131} y={1515} width={700} height={27} rx={6} fill={COLORS.cardboardLight} />
    <rect x={137} y={1542} width={698} height={16} rx={5} fill={COLORS.doorInset} />

    {open ? (
      <g>
        <path d="M156 326 L308 407 Q316 411 316 425 V1436 Q316 1447 306 1453 L156 1515Z" fill={COLORS.doorWood} />
        <path d="M178 380 L290 438 V1399 L178 1453Z" fill={COLORS.doorInset} />
        <ellipse cx={264} cy={776} rx={5} ry={10} fill={COLORS.monitorFrame} />
        <path d="M265 1053 L281 1047 V1110 L265 1116Z" fill={COLORS.plasticLight} />
        <path d="M263 1063 L299 1049 V1065 L263 1079Z" fill={COLORS.counter} />
      </g>
    ) : (
      <g>
        <rect x={156} y={326} width={659} height={1189} rx={11} fill={COLORS.doorWood} />
        <rect x={190} y={366} width={591} height={527} rx={18} fill={COLORS.doorInset} />
        <rect x={190} y={929} width={591} height={547} rx={18} fill={COLORS.doorInset} />
        <circle cx={485} cy={744} r={14} fill={COLORS.counter} />
        <circle cx={485} cy={744} r={7} fill={COLORS.monitorFrame} />
        <rect x={720} y={1010} width={27} height={111} rx={9} fill={COLORS.plasticLight} />
        <rect x={656} y={1031} width={87} height={18} rx={9} fill={COLORS.counter} />
        <circle cx={734} cy={1094} r={6} fill={COLORS.monitorFrame} />
      </g>
    )}

    <rect x={907} y={866} width={59} height={89} rx={15} fill={COLORS.apartmentTrim} />
    <circle cx={936} cy={910} r={17} fill={COLORS.counter} />
  </svg>
);
