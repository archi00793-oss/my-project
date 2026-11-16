import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { blink, breathe } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Captions, type Caption } from "../../components/Captions";
import { COLORS, FONTS, sec, VIDEO } from "../../config/video";
import { TapeBox, Vcr } from "../../props";
import { Apartment } from "../../scenes/Apartment";

export const SCENE08_DURATION = sec(5);
const captions: Caption[] = [
  { text: "Каждый лайк —", from: 0, to: sec(0.65), accent: ["лайк"] },
  { text: "десять рублей", from: sec(0.65), to: sec(1.15), accent: ["десять рублей"] },
  { text: "в кассу Лёхи.", from: sec(1.15), to: sec(1.6) },
  { text: "Соберём на дорогу —", from: sec(1.6), to: sec(2.4) },
  { text: "Лёха поедет и узнает,", from: sec(2.4), to: sec(3.25) },
  { text: "что там.", from: sec(3.25), to: sec(3.65) },
  { text: "Не соберём —", from: sec(3.65), to: sec(4.2) },
  { text: "не узнает никто.", from: sec(4.2), to: SCENE08_DURATION, accent: ["никто"] },
];

/** Локальная касса серии: баланс не растёт без фактического сбора. В сцене 9 остаётся в углу. */
export const CashCounter: React.FC<{ settled?: boolean }> = ({ settled = false }) => {
  const frame = useCurrentFrame();
  const move = settled ? 1 : interpolate(frame, [sec(1.1), sec(2)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
  });
  return (
    <div style={{ position: "absolute", left: 90 - move * 40,
      top: VIDEO.height / 2 - 70 - move * (VIDEO.height / 2 - 250),
      width: VIDEO.width - 180, height: 140, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 24, background: COLORS.monitorFrame, color: COLORS.captionAccent,
      fontFamily: FONTS.caption, fontSize: 76, fontWeight: 700, whiteSpace: "nowrap",
      transformOrigin: "top left", transform: `scale(${1 - move * 0.15})`,
      opacity: settled ? 1 : interpolate(frame, [0, sec(0.2)], [0, 1], { extrapolateRight: "clamp" }) }}>
      КАССА: 400 / 3 000 ₽
    </div>
  );
};

/** 0:51–0:56. Касса сначала в центре, затем уезжает в левый верхний угол. */
export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Camera keyframes={[{ frame: 0, zoom: 1 }]}>
        <Apartment />
        <Vcr width={300} style={{ position: "absolute", left: 440, top: 1198 }} />
        <Lyokha width={570} jacket holdingPhone expression="confused" mouthOpen={0}
          lookX={0.6} headTilt={8} eyesOpen={blink(frame)} bob={breathe(frame) * 2}
          style={{ position: "absolute", left: 120, top: 490 }} />
        <TapeBox width={250}
          labels={["", "", "", ""]}
          style={{ position: "absolute", left: 810, top: 1288 }} />
      </Camera>
      <CashCounter />
      <Captions captions={captions} fontSize={124} top={1360} />
    </AbsoluteFill>
  );
};
