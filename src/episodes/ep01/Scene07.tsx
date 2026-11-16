import { LyokhaPovHand } from "../../characters/Lyokha/LyokhaPovHand";
import { LyokhaCloseup } from "./LyokhaCloseup";
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Camera } from "../../components/Camera";
import { Captions, type Caption } from "../../components/Captions";
import { COLORS, FONTS, sec } from "../../config/video";
import { Apartment } from "../../scenes/Apartment";

export const SCENE07_DURATION = sec(5);
const BANK_FROM = sec(3.2);
/** У Oswald буква «У» опускается ниже строки; в «рублей» оптически выравниваем её низ. */
const alignRubleWord = (word: string): React.ReactNode => word === "рублей."
  ? [...word].map((letter, i) => letter === "у"
    ? <span key={i} style={{ display: "inline-block", transform: "scaleY(0.76)", transformOrigin: "50% 22%" }}>{letter}</span>
    : letter)
  : word;
const captions: Caption[] = [
  { text: "Чтобы доехать,", from: 0, to: sec(1) },
  { text: "Лёхе нужно", from: sec(1), to: sec(1.8) },
  { text: "три тысячи рублей.", from: sec(1.8), to: BANK_FROM, accent: ["три тысячи"] },
  { text: "У Лёхи их нет.", from: BANK_FROM, to: SCENE07_DURATION },
];

/** Схема в телефоне без названий и адреса: тайна места остаётся закрытой. */
const RouteScreen: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.paper, padding: "36px 10px 16px", boxSizing: "border-box",
    color: COLORS.monitorFrame, fontFamily: FONTS.caption }}>
    <div style={{ fontSize: 12 }}>МАРШРУТ</div>
    <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>340 км</div>
    <svg viewBox="0 0 120 100" width={120} height={100} aria-label="Схема пути без адреса">
      <rect y={7} width={120} height={86} rx={12} fill={COLORS.counter} />
      <path d="M0 26 H120 V32 H0Z M24 7 H30 V93 H24Z M72 7 H78 V93 H72Z M0 67 H120 V73 H0Z"
        fill={COLORS.paper} />
      <path d="M19 76 V47 Q19 40 26 40 H91 V22 H97 V42 Q97 46 93 46 H28 Q25 46 25 49 V76Z"
        fill={COLORS.telnyashka} />
      <circle cx={22} cy={76} r={8} fill={COLORS.telnyashka} />
      <circle cx={94} cy={24} r={8} fill={COLORS.courier} />
    </svg>
    <div style={{ fontSize: 15, lineHeight: 1.35, marginTop: 4 }}>
      <div>Электричка</div>
      <div>↓ Автобус</div>
      <div>↓ 6 км пешком</div>
    </div>
  </AbsoluteFill>
);

const BankScreen: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.glass, padding: "44px 10px 16px", boxSizing: "border-box",
    color: COLORS.paper, fontFamily: FONTS.caption }}>
    <div style={{ fontSize: 14 }}>БАНК</div>
    <div style={{ marginTop: 47, fontSize: 12 }}>На карте</div>
    <div style={{ fontSize: 35, fontWeight: 700, color: COLORS.courier, whiteSpace: "nowrap" }}>400 ₽</div>
  </AbsoluteFill>
);

/** 0:46–0:51. Лёха с телефоном в руке: маршрут сменяется банковским приложением. */
export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {frame >= sec(4.1) ? <LyokhaCloseup expression="sad" headTilt={8} lookX={0} /> :
        <Camera><Apartment />
          <LyokhaPovHand mode="phone" x={95} y={260} width={1000}
            screen={frame < BANK_FROM ? <RouteScreen /> : <BankScreen />} />
        </Camera>}
      <Captions captions={captions} fontSize={124} top={1360} renderWord={alignRubleWord} />
    </AbsoluteFill>
  );
};
