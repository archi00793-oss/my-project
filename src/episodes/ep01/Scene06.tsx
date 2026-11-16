import { LyokhaCloseup } from "./LyokhaCloseup";
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mouthFlap } from "../../animation/motion";
import { Camera } from "../../components/Camera";
import { Captions, isTalking, type Caption } from "../../components/Captions";
import { Sfx } from "../../components/Sfx";
import { sec } from "../../config/video";
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

/** 0:41–0:46. Предупреждение, резкий обрыв записи и открытый рот Лёхи. */
export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const stopped = frame >= CUTOFF;
  return (
    <AbsoluteFill>
      {stopped || (frame >= sec(2.2) && frame < sec(2.95)) ?
        <LyokhaCloseup expression="surprised" headTilt={-7} lookX={-0.7}
          mouthOpen={stopped ? 0.25 + mouthFlap(frame, isTalking(lyokhaCaptions, frame)) * 0.6 : 0.2} /> :
        <Camera transformOrigin="50% 40%" keyframes={[
          { frame: 0, zoom: 1 }, { frame: sec(1.15), zoom: 1 }, { frame: sec(1.3), zoom: 1.3 },
        ]} shakes={[{ from: sec(1.15), durationInFrames: sec(0.4), strength: 10, rotation: 0.4 }]}>
          <RecordingCloseup noise={0.13}><DedRecording serious lean={1}
            mouthOpen={mouthFlap(frame, isTalking(dedCaptions, frame)) * 0.7} /></RecordingCloseup>
        </Camera>}
      <Captions captions={[...dedCaptions, ...lyokhaCaptions]} fontSize={124} top={1360} />
      <Sfx src="ep01-tape-stop.wav" from={CUTOFF} durationInFrames={sec(0.25)} volume={0.65} />
    </AbsoluteFill>
  );
};
