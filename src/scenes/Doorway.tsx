import React from "react";
import { COLORS, VIDEO } from "../config/video";

export type DoorwayProps = {
  /** Открытый проём виден из квартиры; закрытая дверь — перед звонком. */
  open?: boolean;
  openProgress?: number;
};

const { width: W, height: H } = VIDEO;

/** Пустая лестничная площадка. Коробка и герой добавляются самой сценой. */
export const Doorway: React.FC<DoorwayProps> = ({ open = true, openProgress = open ? 1 : 0 }) => (
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

    <g>
      <path d={`M156 326 L${815 - openProgress * 499} ${326 + openProgress * 81} V${1515 - openProgress * 62} L156 1515Z`} fill={COLORS.doorWood} />
      <path d={`M180 366 L${780 - openProgress * 490} ${366 + openProgress * 72} V${1476 - openProgress * 77} L180 1476Z`} fill={COLORS.doorInset} />
      <ellipse cx={485 - openProgress * 221} cy={744 + openProgress * 32} rx={14 - openProgress * 9} ry={14} fill={COLORS.monitorFrame} />
      <rect x={720 - openProgress * 455} y={1010 + openProgress * 43} width={27 - openProgress * 11} height={111 - openProgress * 48} rx={6} fill={COLORS.plasticLight} />
      <rect x={656 - openProgress * 393} y={1031 + openProgress * 29} width={87 - openProgress * 51} height={18} rx={7} fill={COLORS.counter} />
    </g>

    <rect x={907} y={866} width={59} height={89} rx={15} fill={COLORS.apartmentTrim} />
    <circle cx={936} cy={910} r={17} fill={COLORS.counter} />
  </svg>
);
