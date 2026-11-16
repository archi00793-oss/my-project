import React from "react";
import { AbsoluteFill, spring, useCurrentFrame } from "remotion";
import { blink, breathe } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Captions, type Caption } from "../../components/Captions";
import { COLORS, FONTS, VIDEO, sec } from "../../config/video";
import { TapeBox, Vcr, VhsTape } from "../../props";
import { Apartment } from "../../scenes/Apartment";
import { CashCounter } from "./Scene08";

export const SCENE09_DURATION = sec(4);
const TITLE_FROM = sec(3.3);
const captions: Caption[] = [
  { text: "А дед, похоже,", from: 0, to: sec(1.5) },
  { text: "знал, что делает.", from: sec(1.5), to: TITLE_FROM },
];

/** 0:56–1:00. Наезд на кассету Жмыхова и резкая склейка на финальный титр. */
export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= TITLE_FROM) return <AbsoluteFill style={{ background: COLORS.black, justifyContent: "center", alignItems: "center" }}>
    <div style={{ fontFamily: FONTS.caption, color: COLORS.paper, fontSize: 220, lineHeight: 1,
      scale: spring({ frame: frame - TITLE_FROM, fps: VIDEO.fps, config: { damping: 11, stiffness: 260 } }) }}>ЛЁХИНО<span style={{ color: COLORS.courier }}>.</span></div>
  </AbsoluteFill>;
  return (
    <AbsoluteFill>
      <Camera transformOrigin="50% 55%" keyframes={[
        { frame: 0, zoom: 1 },
        { frame: TITLE_FROM - 1, zoom: 3.2, x: -1160, y: -850 },
      ]}>
        <Apartment />
        <Vcr width={300} style={{ position: "absolute", left: 440, top: 1198 }} />
        <Lyokha width={570} jacket holdingPhone expression="serious" mouthOpen={0}
          lookX={1} headTilt={18} eyesOpen={blink(frame)} bob={breathe(frame) * 2}
          style={{ position: "absolute", left: 120, top: 490 }} />
        <TapeBox width={250} labels={["", "", ""]}
          style={{ position: "absolute", left: 810, top: 1288 }} />
        <VhsTape width={220} label="Если придёт Жмыхов"
          style={{ position: "absolute", left: 820, top: 1263 }} />
      </Camera>
      <CashCounter settled />
      <Captions captions={captions} fontSize={124} top={1360} />
    </AbsoluteFill>
  );
};
