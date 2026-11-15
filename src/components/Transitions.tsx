import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { getTransitionWindows } from "../animation/transitions";
import type { SceneTiming, TransitionSpec } from "../animation/transitions";
import { COLORS } from "../config/video";

export type { TransitionSpec } from "../animation/transitions";
export type TransitionScene = SceneTiming & { name?: string; content: React.ReactNode };

const SceneLayer: React.FC<React.PropsWithChildren<{
  duration: number;
  incoming?: TransitionSpec;
  outgoing?: TransitionSpec;
}>> = ({ children, duration, incoming, outgoing }) => {
  const frame = useCurrentFrame();
  const options = { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) } as const;
  const incomingScale = incoming?.type === "zoom"
    ? interpolate(frame, [0, incoming.durationInFrames - Math.floor(incoming.durationInFrames / 2) - 1], [incoming.zoom ?? 1.65, 1], options)
    : 1;
  const outgoingScale = outgoing?.type === "zoom"
    ? interpolate(frame, [duration - Math.floor(outgoing.durationInFrames / 2), duration], [1, outgoing.zoom ?? 1.65], options)
    : 1;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: incomingScale * outgoingScale }}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const TransitionOverlay: React.FC<{ transition: TransitionSpec }> = ({ transition }) => {
  const frame = useCurrentFrame();
  const { durationInFrames: duration, type, direction = "right" } = transition;
  const midpoint = Math.floor(duration / 2);
  if (type === "flash") {
    return <AbsoluteFill style={{
      backgroundColor: transition.color ?? COLORS.captionMain,
      opacity: interpolate(frame, [0, midpoint, duration - 1], [0, 1, 0], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
      }),
      pointerEvents: "none",
    }} />;
  }
  const shift = interpolate(frame, [0, midpoint, duration - 1], [-100, 0, 100], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const horizontal = direction === "left" || direction === "right";
  const signedShift = direction === "left" || direction === "up" ? -shift : shift;
  return <AbsoluteFill style={{
    backgroundColor: transition.color ?? COLORS.captionAccent,
    translate: horizontal ? `${signedShift}% 0%` : `0% ${signedShift}%`,
    pointerEvents: "none",
  }} />;
};

/** Сцены идут через Series, вспышки и шторки — отдельными Sequence поверх склейки. */
export const Transitions: React.FC<{ scenes: readonly TransitionScene[] }> = ({ scenes }) => {
  const { fps } = useVideoConfig();
  const windows = getTransitionWindows(scenes);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Series>
        {scenes.map((scene, index) => (
          <Series.Sequence key={scene.id} name={scene.name ?? scene.id} durationInFrames={scene.durationInFrames} premountFor={fps}>
            <SceneLayer duration={scene.durationInFrames} incoming={scene.transition} outgoing={scenes[index + 1]?.transition}>
              {scene.content}
            </SceneLayer>
          </Series.Sequence>
        ))}
      </Series>
      {windows.map(({ from, transition }, index) => transition && transition.type !== "zoom" ? (
        <Sequence key={scenes[index].id} name={`Переход: ${transition.type}`} from={from} durationInFrames={transition.durationInFrames} premountFor={fps}>
          <TransitionOverlay transition={transition} />
        </Sequence>
      ) : null)}
    </AbsoluteFill>
  );
};
