import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mouthFlap } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Captions, isTalking, type Caption } from "../../components/Captions";
import { Sfx } from "../../components/Sfx";
import { COLORS, sec } from "../../config/video";
import { Vcr } from "../../props";
import { Apartment } from "../../scenes/Apartment";
import { DedRecording, RecordingCloseup } from "./DedRecording";

export const SCENE06_DURATION = sec(5);
const CUTOFF = sec(4.05);
const dedCaptions: Caption[] = [
  { text: "И ещё.", from: 0, to: sec(0.55) },
  { text: "Если появится", from: sec(0.55), to: sec(1.15) },
  { text: "Жмыхов —", from: sec(1.15), to: sec(1.85), accent: ["Жмыхов"] },
  { text: "ничего ему не отдавай.", from: sec(1.85), to: sec(2.95) },
  { text: "Ни за какие деньги.", from: sec(2.95), to: CUTOFF },
];
const lyokhaCaptions: Caption[] = [
  { text: "…Кому?", from: sec(4.3), to: SCENE06_DURATION },
];

/** 0:38–0:43. Предупреждение, резкий обрыв записи и открытый рот Лёхи. */
export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const stopped = frame >= CUTOFF;
  return (
    <AbsoluteFill>
      <Camera keyframes={[{ frame: 0, zoom: 1 }]}>
        {stopped ? <>
          <Apartment view="tv" tvContent={<AbsoluteFill style={{ background: COLORS.black }} />} />
          <Vcr width={480} style={{ position: "absolute", left: 210, top: 1180 }} />
          <Lyokha width={600} holdingPhone={false} jacket expression="surprised"
            mouthOpen={isTalking(lyokhaCaptions, frame) ? 0.25 + mouthFlap(frame, true) * 0.65 : 0.65}
            eyesOpen={1} lookX={-0.8} headTilt={-7}
            style={{ position: "absolute", left: 360, top: 560 }} />
        </> : <RecordingCloseup noise={0.13}>
          <DedRecording serious lean={1} mouthOpen={mouthFlap(frame, isTalking(dedCaptions, frame)) * 0.7} />
        </RecordingCloseup>}
      </Camera>
      <Captions captions={[...dedCaptions, ...lyokhaCaptions]} fontSize={82} top={1420} />
      <Sfx src="ep01-tape-stop.wav" from={CUTOFF} durationInFrames={sec(0.25)} volume={0.65} />
    </AbsoluteFill>
  );
};
