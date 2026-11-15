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

      {/* Ось кровати x=936: обе стороны одинаково сходятся к изголовью. */}
      <path d="M848 1460 H1024 L1066 1601 H806Z" fill={COLORS.floorLine} />
      <ellipse cx={936} cy={1594} rx={139} ry={32} fill={COLORS.floorLine} />
      <rect x={821} y={1564} width={18} height={54} rx={5} fill={COLORS.plastic} />
      <rect x={1033} y={1564} width={18} height={54} rx={5} fill={COLORS.plastic} />
      {/* Мягкое изголовье у стены, с двумя утяжками в ткани. */}
      <path d="M842 1344 V1213 Q842 1187 868 1187 H1004 Q1030 1187 1030 1213 V1344Z" fill={COLORS.blanketShade} />
      <rect x={856} y={1202} width={160} height={94} rx={21} fill={COLORS.blanket} />
      <circle cx={902} cy={1254} r={4} fill={COLORS.blanketShade} />
      <circle cx={970} cy={1254} r={4} fill={COLORS.blanketShade} />
      {/* Каркас и матрас симметричны относительно общей оси; углы скруглены. */}
      <path d="M838 1320 H1034 L1070 1552 V1562 Q1070 1576 1056 1576 H816 Q802 1576 802 1562 V1552Z" fill={COLORS.plasticLight} />
      <path d="M838 1320 L802 1552 V1562 Q802 1576 816 1576 H828 L852 1340Z" fill={COLORS.plastic} />
      <path d="M844 1298 H1028 L1062 1510 V1534 Q1064 1548 1050 1548 H822 Q808 1548 810 1534 V1510Z" fill={COLORS.grayHairShadow} />
      <path d="M854 1288 H1018 Q1026 1288 1028 1298 L1062 1510 Q1064 1524 1050 1524 H822 Q808 1524 810 1510 L844 1298 Q846 1288 854 1288Z" fill={COLORS.grayHair} />
      {/* Подушка чуть примята: нижний слой даёт толщину, верхний — мягкий силуэт. */}
      <path d="M880 1308 Q916 1300 937 1308 Q970 1301 994 1310 Q1010 1311 1012 1327 L1013 1354 Q1007 1371 990 1369 Q954 1361 931 1369 Q894 1376 873 1369 Q857 1364 860 1350 L862 1327 Q863 1313 880 1308Z" fill={COLORS.grayHairShadow} />
      <path d="M880 1301 Q916 1293 937 1301 Q970 1294 994 1303 Q1010 1304 1012 1320 L1013 1347 Q1007 1364 990 1362 Q954 1354 931 1362 Q894 1369 873 1362 Q857 1357 860 1343 L862 1320 Q863 1306 880 1301Z" fill={COLORS.paper} />
      <path d="M989 1320 Q1003 1332 990 1350 Q996 1333 989 1320Z" fill={COLORS.grayHair} />
      {/* Одеяло свободно свисает с торца, верхний край отогнут после сна. */}
      <path d="M810 1514 Q848 1505 881 1517 T943 1518 Q985 1508 1018 1517 Q1042 1524 1063 1512 L1064 1541 Q1064 1561 1045 1560 Q1008 1549 979 1561 Q944 1571 911 1559 Q874 1550 850 1560 Q815 1570 811 1547Z" fill={COLORS.blanketShade} />
      <path d="M833 1371 Q873 1360 906 1371 Q944 1386 980 1375 Q1013 1367 1038 1376 L1063 1509 Q1065 1525 1051 1529 Q1025 1534 996 1527 Q964 1522 940 1531 Q905 1542 871 1531 Q844 1525 824 1531 Q809 1532 810 1517Z" fill={COLORS.blanket} />
      <path d="M833 1371 Q873 1360 906 1371 Q944 1386 980 1375 Q1013 1367 1038 1376 L1041 1400 Q1014 1391 979 1400 Q943 1412 906 1397 Q870 1382 829 1394Z" fill={COLORS.blanketLight} />
      {/* Складки — небольшие криволинейные заливки, без обводок и градиентов. */}
      <path d="M852 1421 Q838 1459 841 1491 Q851 1460 852 1421Z" fill={COLORS.blanketShade} />
      <path d="M959 1424 Q979 1449 968 1483 Q984 1458 972 1436Z" fill={COLORS.blanketLight} />
      <path d="M1008 1492 Q1033 1480 1045 1498 Q1028 1489 1008 1492Z" fill={COLORS.blanketShade} />
      <path d="M871 1531 Q893 1541 915 1535 L910 1559 Q888 1552 871 1555Z" fill={COLORS.blanketLight} />

      {/* Самокат из общего набора ассетов, без перерисовки. */}
      <Scooter x={15} y={1390} width={242} />
    </svg>
  );
};
