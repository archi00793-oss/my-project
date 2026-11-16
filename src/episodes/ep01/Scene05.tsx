import { LyokhaPovHand } from "../../characters/Lyokha/LyokhaPovHand";
import { LyokhaCloseup } from "./LyokhaCloseup";
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ease, mouthFlap } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Captions, isTalking, type Caption } from "../../components/Captions";
import { Sfx } from "../../components/Sfx";
import { COLORS, sec } from "../../config/video";
import { Apartment } from "../../scenes/Apartment";
import { DedRecording, RecordingCloseup } from "./DedRecording";

export const SCENE05_DURATION = sec(16);

const captions: Caption[] = [
  { text: "Лёшка.", from: 0, to: sec(0.8) },
  { text: "Раз смотришь — значит, всё.", from: sec(0.8), to: sec(2.8) },
  { text: "Не реви.", from: sec(2.8), to: sec(3.7) },
  { text: "Есть одно место.", from: sec(4), to: sec(5.4), accent: ["одно место"] },
  { text: "Про него не знает никто.", from: sec(5.4), to: sec(7.2), accent: ["никто"] },
  { text: "Даже бабка твоя не знала.", from: sec(7.2), to: sec(9.1) },
  { text: "Там тебя ждёт то,", from: sec(9.3), to: sec(10.6) },
  { text: "что я берёг всю жизнь.", from: sec(10.6), to: sec(12.2) },
  { text: "Записывай адрес.", from: sec(12.3), to: sec(13.4), accent: ["адрес"] },
];

/** 0:25–0:41. Адрес заглушён помехами и не придуман для изображения. */
export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const writing = frame >= sec(13.4);
  const lean = ease(frame, sec(11.8), sec(12.5));
  const noise = writing ? 0.9 + Math.sin(frame * 0.8) * 0.1 : 0.13;
  const mouthOpen = mouthFlap(frame, isTalking(captions, frame) || writing) * 0.7;
  const reaction = !writing && ((frame >= sec(2.8) && frame < sec(4.5)) || (frame >= sec(7) && frame < sec(9.3)) || (frame >= sec(11) && frame < sec(12.3)));
  const stroke = Math.min(15, Math.max(0, (frame - sec(14.1)) / sec(1.9) * 16));
  const grabbing = frame >= sec(13.4) && frame < sec(14.1);
  return (
    <AbsoluteFill>
      {reaction ? <LyokhaCloseup expression="confused" headTilt={6} lookX={-0.5} /> : writing ? grabbing ?
        <Camera transformOrigin="0 0" keyframes={[{ frame: 0, zoom: 1.25, x: -90, y: -200 }]}>
          <Apartment />
          <div style={{ position: "absolute", left: 430, top: 1050, width: 300, height: 210, background: COLORS.paper,
            translate: `${-ease(frame, sec(13.4), sec(14.1)) * 80}px ${-ease(frame, sec(13.4), sec(14.1)) * 70}px` }} />
          <Lyokha width={600} holdingPhone={false} handLeft={[380, 620]} handRight={[520, 650]}
            rightHandItem={<rect x={-7} y={-90} width={14} height={120} rx={6} fill={COLORS.telnyashka} />}
            expression="confused" style={{ position: "absolute", left: 160, top: 480 }} />
        </Camera> : <Camera>
          <AbsoluteFill style={{ background: COLORS.doorWood }} />
          <svg width="1080" height="1920" style={{ position: "absolute" }}>
            <rect x={130} y={550} width={790} height={740} rx={12} fill={COLORS.paper} />
            {Array.from({ length: 16 }, (_, i) => <path key={i}
              d={`M${240 + i % 6 * 78} ${730 + Math.floor(i / 6) * 105} q-18 -30 14 -17 t24 15 l-20 15 l4 -8 q20 -14 -10 -17 q-14 8 -12 4Z`}
              fill={COLORS.hair}
              opacity={frame >= sec(14.15 + i * 0.1) ? 1 : 0} />)}
          </svg>
          <LyokhaPovHand mode="pen" x={240 + Math.floor(stroke) % 6 * 78 - 315 + Math.sin(frame * 0.7) * 12}
            y={730 + Math.floor(stroke / 6) * 105 - 582 + Math.cos(frame * 0.6) * 9} width={950} />
        </Camera> : <Camera transformOrigin="50% 40%" keyframes={[
          { frame: 0, zoom: 1 }, { frame: sec(12.3), zoom: 1 }, { frame: sec(12.55), zoom: 1.3 },
        ]}>
          <RecordingCloseup noise={noise}><DedRecording mouthOpen={mouthOpen} lean={lean} /></RecordingCloseup>
        </Camera>}
      <Captions captions={captions} fontSize={124} top={1360} />
      <Sfx src="ep01-static.wav" from={sec(13.4)} durationInFrames={sec(2.6)} volume={0.6}
        fadeInFrames={sec(0.1)} fadeOutFrames={sec(0.1)} />
      <Sfx src="ep01-marker.wav" from={sec(13.4)} durationInFrames={sec(2.6)} volume={0.5} />
    </AbsoluteFill>
  );
};
