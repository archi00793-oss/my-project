import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, breathe } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Captions, type Caption } from "../../components/Captions";
import { sec } from "../../config/video";
import { TapeBox, Vcr, VhsTape } from "../../props";
import { Apartment } from "../../scenes/Apartment";
import { BlackCard } from "../../scenes/BlackCard";
import { CashCounter } from "./Scene08";

export const SCENE09_DURATION = sec(4);
const TITLE_FROM = sec(3.3);
const captions: Caption[] = [
  { text: "А дед, похоже,", from: 0, to: sec(1.5) },
  { text: "знал, что делает.", from: sec(1.5), to: TITLE_FROM },
];

/** 0:53–0:57. Наезд на кассету Жмыхова и резкая склейка на финальный титр. */
export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= TITLE_FROM) return <BlackCard title="ЛЁХИНО" />;
  return (
    <AbsoluteFill>
      <Camera transformOrigin="50% 55%" keyframes={[
        { frame: 0, zoom: 1 },
        { frame: TITLE_FROM - 1, zoom: 2, x: -360, y: -160 },
      ]}>
        <Apartment />
        <Vcr width={300} style={{ position: "absolute", left: 440, top: 1198 }} />
        <Lyokha width={570} jacket holdingPhone expression="serious" mouthOpen={0}
          lookX={1} headTilt={18} eyesOpen={blink(frame)} bob={breathe(frame) * 2}
          style={{ position: "absolute", left: 120, top: 490 }} />
        <TapeBox width={500} labels={["Когда приедешь", "Когда станет совсем тяжело", "Когда влюбишься"]}
          style={{ position: "absolute", left: 530, top: 980 }} />
        <VhsTape width={440} label="Если придёт Жмыхов"
          style={{ position: "absolute", left: 550, top: 930 }} />
      </Camera>
      <CashCounter settled />
      <Captions captions={captions} fontSize={82} top={1430} />
    </AbsoluteFill>
  );
};
