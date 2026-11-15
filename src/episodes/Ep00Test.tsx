// Демонстрация универсальных компонентов. Внешность Hero здесь не меняется.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { blink, breathe, ease, mouthFlap } from "../animation/motion";
import { Hero, HERO_ASPECT } from "../characters/Hero";
import type { Expression } from "../characters/Hero";
import { Camera } from "../components/Camera";
import { Captions, isTalking } from "../components/Captions";
import type { Caption } from "../components/Captions";
import { DayCounter } from "../components/DayCounter";
import { Transitions } from "../components/Transitions";
import { useSrtCaptions } from "../components/useSrtCaptions";
import { Sfx } from "../components/Sfx";
import { COLORS, FONTS, sec, VIDEO } from "../config/video";
import { Room } from "../scenes/Room";

const SHOT_DURATION = sec(2.5);
export const EP00_DURATION = SHOT_DURATION * 4;
const HERO_WIDTH = 640;
const LABELS = ["КАМЕРА · НАЕЗД И ТРЯСКА", "ВСПЫШКА · СМЕНА СЦЕНЫ", "БЫСТРЫЙ НАЕЗД", "ШТОРКА · НОВАЯ СЦЕНА"];

const LEGACY_CAPTIONS: Caption[] = [
  { text: "Это тестовая сцена", from: sec(0.3), to: sec(2.4), accent: ["тестовая"] },
];

const TestShot: React.FC<{ variant: number; talking: boolean }> = ({ variant, talking }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const raise = ease(frame, sec(0.15), sec(0.7));
  const expression: Expression = variant === 2 ? "surprised" : variant === 0 ? "neutral" : "happy";
  return (
    <Camera
      transformOrigin="50% 40%"
      keyframes={[
        { frame: 0, zoom: 1.04 },
        { frame: sec(1.3), zoom: 1.14, x: variant % 2 === 0 ? -24 : 24, y: 18 },
        { frame: SHOT_DURATION - 1, zoom: 1.04, x: 0, y: 0 },
      ]}
      shakes={variant === 0 ? [{ from: sec(1.6), durationInFrames: sec(0.5), strength: 16, seed: "ep00" }] : []}
    >
      <Room calendarDay={30 - variant} night={variant % 2 === 0} />
      <div style={{
        position: "absolute",
        left: (VIDEO.width - HERO_WIDTH) / 2,
        top: 1530 - HERO_WIDTH * HERO_ASPECT * (1060 / 1100),
      }}>
        <Hero
          width={HERO_WIDTH}
          eyesOpen={blink(frame)}
          mouthOpen={mouthFlap(frame, talking)}
          expression={expression}
          armLeft={variant === 3 ? 150 * raise : 0}
          armRight={variant === 1 ? raise * (135 + 18 * Math.sin(frame * 0.45)) : variant === 3 ? 150 * raise : 0}
          lookX={variant === 2 ? raise : 0}
          headTilt={variant === 2 ? 5 * raise : variant === 1 ? -4 * raise : 0}
          bob={breathe(frame, fps * 2) * 6}
        />
      </div>
    </Camera>
  );
};

export const Ep00Test: React.FC = () => {
  const frame = useCurrentFrame();
  const imported = useSrtCaptions("ep00-engine.srt");
  const talking = isTalking(LEGACY_CAPTIONS, frame) || isTalking(imported ?? [], frame);
  const shot = Math.min(3, Math.floor(frame / SHOT_DURATION));
  if (imported === null) return null;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.night }}>
      <Transitions scenes={[
        { id: "camera", durationInFrames: SHOT_DURATION, content: <TestShot variant={0} talking={talking} /> },
        { id: "flash", durationInFrames: SHOT_DURATION, transition: { type: "flash", durationInFrames: sec(0.4) }, content: <TestShot variant={1} talking={talking} /> },
        { id: "zoom", durationInFrames: SHOT_DURATION, transition: { type: "zoom", durationInFrames: sec(0.4) }, content: <TestShot variant={2} talking={talking} /> },
        { id: "wipe", durationInFrames: SHOT_DURATION, transition: { type: "wipe", durationInFrames: sec(0.6) }, content: <TestShot variant={3} talking={talking} /> },
      ]} />
      <DayCounter day={1} progress={interpolate(frame, [0, EP00_DURATION - 1], [0, 3])} />
      <div style={{
        position: "absolute", top: 320, left: 50, right: 50, padding: "14px 20px",
        borderRadius: 18, backgroundColor: COLORS.badgeBg, color: COLORS.captionMain,
        fontFamily: FONTS.caption, fontWeight: 700, fontSize: 44, textAlign: "center",
      }}>{LABELS[shot]}</div>
      <Captions captions={LEGACY_CAPTIONS} fontSize={100} />
      <Captions captions={imported} mode="word-by-word" fontSize={100} />
      <Sfx src="shake.wav" from={sec(1.6)} durationInFrames={sec(0.5)} volume={0.5} fadeInFrames={2} fadeOutFrames={3} />
      <Sfx src="flash.wav" from={sec(2.5)} durationInFrames={sec(0.25)} volume={0.55} />
      <Sfx src="zoom.wav" from={sec(4.8)} durationInFrames={sec(0.4)} volume={0.5} />
      <Sfx src="wipe.wav" from={sec(7.2)} durationInFrames={sec(0.6)} volume={0.5} />
    </AbsoluteFill>
  );
};
