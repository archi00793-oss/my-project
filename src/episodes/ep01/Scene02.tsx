import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { blink, breathe } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Captions, type Caption } from "../../components/Captions";
import { sec } from "../../config/video";
import { Doshirak } from "../../props";
import { Apartment } from "../../scenes/Apartment";

export const SCENE02_DURATION = sec(6);

const captions: Caption[] = [
  { text: "Это Лёха.", from: 0, to: sec(0.8), accent: ["Лёха"] },
  { text: "Ему двадцать семь.", from: sec(0.8), to: sec(1.8) },
  { text: "Из имущества — самокат,", from: sec(1.8), to: sec(3.2) },
  { text: "кредит за айфон", from: sec(3.2), to: sec(4.3) },
  { text: "и четыреста рублей на карте.", from: sec(4.3), to: SCENE02_DURATION, accent: ["четыреста рублей"] },
];

/** 0:04–0:10. Общий план сохраняет самокат и ночное окно в кадре. */
export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const cycle = frame % sec(2.8);
  const lift = interpolate(cycle, [0, sec(0.6), sec(1.15), sec(1.65), sec(2.8)], [0, 1, 1, 0, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const bob = breathe(frame, sec(2.4)) * 2;
  const scale = 500 / 600;

  return (
    <AbsoluteFill>
      <Camera keyframes={[{ frame: 0, zoom: 1 }]}>
        <Apartment />
        <Lyokha width={500} holdingPhone={false} jacket
          bendLeft={100 + lift * 64} bendRight={100 + lift * 64}
          eyesOpen={blink(frame)} expression="neutral" headTilt={6 * lift} bob={bob}
          mouthOpen={lift > 0.8 ? 0.2 + Math.abs(Math.sin(frame * 0.6)) * 0.25 : 0}
          style={{ position: "absolute", left: 60, top: 600 }} />
        {/* Миска следует за согнутыми руками и поднимается от раковины ко рту. */}
        <Doshirak width={200 * scale} style={{ position: "absolute",
          left: 60 + 200 * scale, top: 600 + (460 - lift * 130 + bob) * scale }} />
      </Camera>
      <Captions captions={captions} fontSize={82} top={1430} />
    </AbsoluteFill>
  );
};
