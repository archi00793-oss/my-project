import React from "react";
import { COLORS, VIDEO } from "../config/video";
import { Scooter, Tv } from "../props";

export type ApartmentView = "wide" | "sink" | "tv";

export type ApartmentProps = {
  /** Общий план, у раковины или у телевизора. */
  view?: ApartmentView;
  /** Содержимое существующего компонента Tv; без него экран чёрный. */
  tvContent?: React.ReactNode;
  tvNoise?: number;
};

const { width: W, height: H } = VIDEO;
const FLOOR_Y = 1450;

/** Окна одной декорации. Координаты предметов не меняются при смене ракурса. */
export const APARTMENT_VIEWS = {
  wide: { x: 0, y: 0, width: W, height: H },
  sink: { x: -55, y: 440, width: W / 1.5, height: H / 1.5 },
  tv: { x: 300, y: 460, width: W / 1.6, height: H / 1.6 },
} as const satisfies Record<ApartmentView, { x: number; y: number; width: number; height: number }>;

/** Тесная однушка ночью: кухня и кровать находятся в одной комнате. */
export const Apartment: React.FC<ApartmentProps> = ({ view = "wide", tvContent, tvNoise = 0 }) => {
  const camera = APARTMENT_VIEWS[view];
  return (
    <svg
      viewBox={`${camera.x} ${camera.y} ${camera.width} ${camera.height}`}
      width={W} height={H} style={{ position: "absolute", inset: 0 }}
      role="img" aria-label={`Однушка ночью: ${view === "wide" ? "общий план" : view === "sink" ? "у раковины" : "у телевизора"}`}
    >
      {/* Декорация продолжается за кадром для обоих укрупнений. */}
      <rect x={-W} y={-H} width={W * 3} height={H + FLOOR_Y} fill={COLORS.apartmentWall} />
      <rect x={-W} y={FLOOR_Y} width={W * 3} height={H} fill={COLORS.floor} />
      <rect x={-W} y={FLOOR_Y - 22} width={W * 3} height={22} fill={COLORS.apartmentTrim} />
      <rect x={1030} y={0} width={W} height={FLOOR_Y - 22} fill={COLORS.apartmentWallShade} />
      <path d={`M1030 ${FLOOR_Y - 22} H${W} V${FLOOR_Y + 20}Z`} fill={COLORS.apartmentWallShade} />
      <path d={`M1030 ${FLOOR_Y - 22} L${W} ${FLOOR_Y + 20} V${FLOOR_Y + 42} L1030 ${FLOOR_Y}Z`} fill={COLORS.apartmentTrim} />
      {[1560, 1710, 1880].map((y) => (
        <rect key={y} x={-W} y={y} width={W * 3} height={6} fill={COLORS.floorLine} />
      ))}

      {/* Антресоль: открытая ниша справа оставлена для подвижного реквизита. */}
      <rect x={48} y={240} width={490} height={237} rx={20} fill={COLORS.apartmentWallShade} />
      <rect x={60} y={250} width={465} height={205} rx={12} fill={COLORS.doorInset} />
      <rect x={60} y={250} width={240} height={205} rx={12} fill={COLORS.cabinet} />
      <rect x={80} y={270} width={200} height={163} rx={9} fill={COLORS.cabinetShade} />
      <rect x={253} y={334} width={10} height={43} rx={5} fill={COLORS.counter} />
      <rect x={302} y={250} width={12} height={205} fill={COLORS.cabinetShade} />
      <rect x={42} y={449} width={502} height={24} rx={7} fill={COLORS.counter} />

      {/* Небольшая картина с парусником оживляет стену над кухней. */}
      <rect x={122} y={581} width={302} height={236} rx={13} fill={COLORS.apartmentWallShade} />
      <rect x={116} y={575} width={302} height={236} rx={11} fill={COLORS.doorWood} />
      <rect x={131} y={590} width={272} height={206} rx={5} fill={COLORS.paper} />
      <rect x={145} y={604} width={244} height={178} rx={3} fill={COLORS.moon} />
      <circle cx={326} cy={644} r={24} fill={COLORS.courier} />
      <path d="M145 712 Q206 697 267 712 T389 712 V782 H145Z" fill={COLORS.blanket} />
      <path d="M145 750 Q206 736 267 750 T389 750 V782 H145Z" fill={COLORS.blanketShade} />
      <path d="M223 717 H299 L286 733 H240Z" fill={COLORS.doorInset} />
      <rect x={261} y={637} width={5} height={81} rx={2.5} fill={COLORS.doorWood} />
      <path d="M255 646 L255 709 H211Z" fill={COLORS.paper} />
      <path d="M272 668 L301 709 H272Z" fill={COLORS.counter} />

      {/* Единственное окно: ночное небо и силуэты соседнего дома. */}
      <rect x={527} y={525} width={260} height={348} rx={18} fill={COLORS.apartmentWallShade} />
      <rect x={540} y={538} width={234} height={322} rx={11} fill={COLORS.apartmentTrim} />
      <rect x={553} y={551} width={208} height={296} rx={6} fill={COLORS.night} />
      <circle cx={708} cy={606} r={25} fill={COLORS.moon} />
      <circle cx={696} cy={596} r={24} fill={COLORS.night} />
      <path d="M553 779 V735 H603 V704 H659 V757 H716 V723 H761 V847 H553Z" fill={COLORS.monitorFrame} />
      {[[567, 755], [620, 729], [680, 794], [733, 748]].map(([x, y]) => (
        <rect key={x} x={x} y={y} width={9} height={15} rx={2} fill={COLORS.moon} />
      ))}
      <rect x={650} y={547} width={13} height={305} fill={COLORS.apartmentTrim} />
      <rect x={523} y={851} width={268} height={20} rx={6} fill={COLORS.counter} />

      {/* Кухонный уголок: две конфорки, фартук, раковина и нижние шкафы. */}
      <rect x={-40} y={934} width={415} height={237} rx={12} fill={COLORS.cabinetShade} />
      {[1000, 1070, 1140].map((y) => (
        <rect key={y} x={-40} y={y} width={415} height={4} fill={COLORS.cabinet} />
      ))}
      {[50, 150, 250, 350].map((x) => (
        <rect key={x} x={x} y={934} width={4} height={237} fill={COLORS.cabinet} />
      ))}
      <rect x={-25} y={1180} width={385} height={274} rx={12} fill={COLORS.cabinetShade} />
      <rect x={-15} y={1200} width={160} height={232} rx={9} fill={COLORS.cabinet} />
      <rect x={158} y={1200} width={184} height={232} rx={9} fill={COLORS.cabinet} />
      <rect x={105} y={1220} width={25} height={9} rx={4.5} fill={COLORS.counter} />
      <rect x={174} y={1220} width={25} height={9} rx={4.5} fill={COLORS.counter} />
      <rect x={-32} y={1155} width={405} height={30} rx={10} fill={COLORS.counter} />
      <rect x={-24} y={1142} width={121} height={20} rx={7} fill={COLORS.monitorFrame} />
      <ellipse cx={12} cy={1144} rx={22} ry={8} fill={COLORS.plasticLight} />
      <ellipse cx={65} cy={1144} rx={18} ry={7} fill={COLORS.plasticLight} />
      <ellipse cx={225} cy={1154} rx={108} ry={29} fill={COLORS.sink} />
      <ellipse cx={225} cy={1152} rx={87} ry={19} fill={COLORS.sinkInner} />
      <ellipse cx={236} cy={1157} rx={12} ry={4} fill={COLORS.monitorFrame} />
      {/* Кран собран заливками, без обводки. */}
      <path d="M284 1138 V1062 Q284 1028 251 1028 Q218 1028 218 1062 V1082 H233 V1062 Q233 1044 251 1044 Q268 1044 268 1062 V1138Z" fill={COLORS.counter} />
      <rect x={260} y={1130} width={37} height={16} rx={7} fill={COLORS.sink} />
      <rect x={307} y={1095} width={16} height={42} rx={7} fill={COLORS.counter} />
      <rect x={304} y={1091} width={37} height={9} rx={4.5} fill={COLORS.counter} />

      {/* Тумба с пустой полкой: видик появится при сборке сцены 4. */}
      <rect x={393} y={1152} width={397} height={27} rx={9} fill={COLORS.cardboardLight} />
      <rect x={410} y={1179} width={365} height={258} rx={14} fill={COLORS.doorWood} />
      <rect x={432} y={1197} width={321} height={96} rx={8} fill={COLORS.doorInset} />
      <rect x={432} y={1313} width={321} height={98} rx={8} fill={COLORS.doorInset} />
      <rect x={557} y={1331} width={70} height={10} rx={5} fill={COLORS.cardboardLight} />
      <rect x={432} y={1430} width={22} height={39} rx={6} fill={COLORS.doorInset} />
      <rect x={730} y={1430} width={22} height={39} rx={6} fill={COLORS.doorInset} />
      <Tv x={400} y={882} width={380} noise={tvNoise}>
        {tvContent ?? <div style={{ width: "100%", height: "100%", background: COLORS.black }} />}
      </Tv>

      {/* Кровать в правом углу: верх, боковина и торец дают объём плоскими заливками. */}
      <path d="M858 1464 H1032 L1050 1608 Q1048 1634 1019 1634 H757 Q735 1634 746 1613Z" fill={COLORS.floorLine} />
      <rect x={866} y={1390} width={17} height={95} rx={5} fill={COLORS.plastic} />
      <rect x={1005} y={1390} width={17} height={95} rx={5} fill={COLORS.plastic} />
      <rect x={777} y={1576} width={18} height={51} rx={5} fill={COLORS.plastic} />
      <rect x={978} y={1576} width={18} height={51} rx={5} fill={COLORS.plastic} />
      {/* Изголовье касается стены у угла комнаты. */}
      <path d="M845 1365 V1200 Q845 1184 861 1184 H1012 Q1028 1184 1028 1200 V1365Z" fill={COLORS.plasticLight} />
      <rect x={860} y={1201} width={152} height={96} rx={12} fill={COLORS.blanketShade} />
      {/* Несущий каркас ниже матраса; передние ножки доходят до тени на полу. */}
      <path d="M852 1334 H1034 L1014 1562 H756Z" fill={COLORS.plasticLight} />
      <path d="M852 1334 L756 1562 V1587 L852 1359Z" fill={COLORS.plastic} />
      <path d="M756 1562 H1014 V1577 Q1014 1587 1004 1587 H766 Q756 1587 756 1577Z" fill={COLORS.plasticLight} />
      {/* Толщина матраса видна на длинной стороне и на торце. */}
      <path d="M858 1304 L766 1529 V1558 L858 1333Z" fill={COLORS.grayHairShadow} />
      <path d="M1028 1304 L1008 1529 V1558 L1028 1333Z" fill={COLORS.grayHairShadow} />
      <path d="M766 1529 H1008 V1548 Q1008 1558 998 1558 H776 Q766 1558 766 1548Z" fill={COLORS.counter} />
      <path d="M868 1304 H1018 Q1029 1304 1028 1315 L1008 1529 H766 L854 1315 Q858 1304 868 1304Z" fill={COLORS.grayHair} />
      {/* Подушка и покрывало лежат в той же перспективе, что и поверхность матраса. */}
      <path d="M878 1325 H996 Q1016 1325 1013 1338 L1008 1364 Q1005 1376 985 1376 H864 Q846 1376 851 1361 L861 1338 Q866 1325 878 1325Z" fill={COLORS.grayHairShadow} />
      <path d="M878 1319 H996 Q1016 1319 1013 1332 L1008 1358 Q1005 1370 985 1370 H864 Q846 1370 851 1355 L861 1332 Q866 1319 878 1319Z" fill={COLORS.paper} />
      <path d="M826 1384 H1021 L1008 1529 H766Z" fill={COLORS.blanket} />
      <path d="M826 1384 L766 1529 V1558 L826 1413Z" fill={COLORS.blanketShade} />
      <path d="M766 1529 H1008 V1548 Q1008 1558 998 1558 H776 Q766 1558 766 1548Z" fill={COLORS.blanketShade} />
      <path d="M850 1390 H861 L812 1517 H800Z" fill={COLORS.blanketShade} />

      {/* Самокат из общего набора ассетов, без перерисовки. */}
      <Scooter x={15} y={1390} width={242} />
    </svg>
  );
};
