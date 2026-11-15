import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { blink, breathe, ease, mouthFlap } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Captions, isTalking, type Caption } from "../../components/Captions";
import { Sfx } from "../../components/Sfx";
import { sec } from "../../config/video";
import { TapeBox, VhsTape } from "../../props";
import { Apartment } from "../../scenes/Apartment";
import { Doorway } from "../../scenes/Doorway";
import { FIRST_TAPE_LABEL } from "./Scene01";

export const SCENE03_DURATION = sec(8);

const TAPE_LABELS = [
  "Когда приедешь", "Если придёт Жмыхов",
  "Когда станет совсем тяжело", "Когда влюбишься",
] as const;
const BOX_LABELS = [...TAPE_LABELS, FIRST_TAPE_LABEL];
const captions: Caption[] = [
  { text: "Дед…", from: sec(5.8), to: sec(6.5) },
  { text: "У тебя даже", from: sec(6.5), to: sec(7.2) },
  { text: "видика не было.", from: sec(7.2), to: SCENE03_DURATION },
];

/** 0:10–0:18. Закрытая посылка → пустая площадка → перенос → распаковка. */
export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const openedDoor = frame >= sec(0.7);
  const inside = frame >= sec(2.7);
  const unpacked = frame >= sec(3.4);
  const inspecting = unpacked && frame < sec(5.8);
  const reaction = frame >= sec(5.8);
  const carry = ease(frame, sec(1.7), sec(2.7));
  const tapeIndex = Math.min(TAPE_LABELS.length - 1, Math.max(0, Math.floor((frame - sec(3.4)) / sec(0.6))));

  return (
    <AbsoluteFill>
      <Camera transformOrigin="50% 55%" keyframes={[
        { frame: 0, zoom: inspecting ? 1.7 : 1, y: inspecting ? -250 : 0 },
      ]}>
        {inside ? <Apartment /> : <Doorway open={openedDoor} />}
        <Lyokha width={inside ? 570 : 500} jacket holdingPhone={false}
          expression={reaction ? "sad" : "confused"}
          eyesOpen={blink(frame, sec(3.5), sec(0.8))}
          mouthOpen={mouthFlap(frame, isTalking(captions, frame)) * 0.65}
          lookX={inside ? -0.5 : 0.6} headTilt={reaction ? 9 : 4}
          armLeft={inside ? 30 : 0}
          armRight={inside ? 30 : openedDoor ? 0 : ease(frame, 0, sec(0.5)) * 80}
          bendLeft={inside ? 50 : carry * 100} bendRight={inside ? 50 : carry * 100}
          bob={breathe(frame, sec(2.5)) * 2}
          style={{ position: "absolute", left: inside ? 300 : openedDoor ? -65 + carry * 150 : 210, top: inside ? 440 : 620 }} />
        {openedDoor && !inside && <TapeBox open={false} width={300 + carry * 80}
          style={{ position: "absolute", left: 410 - carry * 265, top: 1310 - carry * 360 }} />}
        {inside && <TapeBox open={unpacked} labels={BOX_LABELS} width={500}
          style={{ position: "absolute", left: 310, top: 970 }} />}
        {/* Камера укрупняет весь план коробки, сохраняя масштаб предметов относительно героя. */}
        {unpacked && <VhsTape label={inspecting ? TAPE_LABELS[tapeIndex] : FIRST_TAPE_LABEL} width={460}
          style={{ position: "absolute", left: 330, top: interpolate(frame,
            [sec(5.8), sec(6.2)], [970, 930], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />}
      </Camera>
      <Captions captions={captions} fontSize={90} top={1460} />
      <Sfx src="ep01-doorbell.wav" name="Звонок в дверь" from={0} durationInFrames={sec(0.7)} volume={0.65} />
    </AbsoluteFill>
  );
};
