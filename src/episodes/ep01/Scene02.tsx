import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { blink, breathe } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Captions, type Caption } from "../../components/Captions";
import { COLORS, sec } from "../../config/video";
import { Doshirak } from "../../props";
import { Apartment } from "../../scenes/Apartment";

export const SCENE02_DURATION = sec(6);

const captions: Caption[] = [
  { text: "Это Лёха.", from: 0, to: sec(0.8), accent: ["Лёха"] },
  { text: "Ему двадцать семь.", from: sec(0.8), to: sec(1.8) },
  { text: "Из имущества — самокат,", from: sec(1.8), to: sec(3.2) },
  { text: "кредит за телефон", from: sec(3.2), to: sec(4.3) },
  { text: "и четыреста рублей", from: sec(4.3), to: sec(5.4), accent: ["четыреста рублей"] },
  { text: "на карте.", from: sec(5.4), to: SCENE02_DURATION },
];

/** 0:04–0:10. Общий план сохраняет самокат и ночное окно в кадре. */
export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const cycle = frame % sec(2.8);
  const lift = interpolate(cycle, [0, sec(0.6), sec(1.15), sec(1.65), sec(2.8)], [0, 1, 1, 0, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const bob = breathe(frame, sec(2.4)) * 2;


  return (
    <AbsoluteFill>
      <Camera transformOrigin="0 0" keyframes={[{ frame: 0, zoom: 1 }, { frame: sec(0.6), zoom: 1 }, { frame: sec(1), zoom: 1.65, x: 30, y: -580 }]}>
        <Apartment />
        <Lyokha width={500} holdingPhone={false} jacket
          handLeft={[250, 590]} handRight={[340 - lift * 35, 570 - lift * 125]}
          leftHandItem={<Doshirak showFork={false} x={-110} y={-55} width={200} />}
          rightHandItem={<g><rect x={-5} y={-100} width={10} height={115} rx={4} fill={COLORS.counter} />
            {[0, 1, 2].map(i => <rect key={i} x={-12 + i * 9} y={-130} width={5} height={36} rx={2} fill={COLORS.counter} />)}
            <path d="M-8 -130 Q-20 -95 -8 -70 Q8 -50 0 -32 L6 -32 Q18 -55 0 -77 Q-11 -95 -2 -130Z" fill={COLORS.noodle} /></g>}
          eyesOpen={blink(frame)} expression="neutral" headTilt={6 * lift} bob={bob}
          mouthOpen={lift > 0.8 ? 0.2 + Math.abs(Math.sin(frame * 0.6)) * 0.25 : 0}
          style={{ position: "absolute", left: 60, top: 600 }} />
      </Camera>
      <Captions captions={captions} fontSize={124} top={1360} />
    </AbsoluteFill>
  );
};
