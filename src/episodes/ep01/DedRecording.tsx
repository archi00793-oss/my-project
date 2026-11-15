import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, breathe } from "../../animation/motion";
import { Ded } from "../../characters/Ded";
import { Camera } from "../../components/Camera";
import { COLORS } from "../../config/video";
import { Vcr } from "../../props";
import { Apartment } from "../../scenes/Apartment";

/** Только лес за спиной деда: никаких подсказок о земле или стройке. */
export const DedRecording: React.FC<{
  mouthOpen: number; serious?: boolean; lean?: number;
}> = ({ mouthOpen, serious = false, lean = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.forest }}>
      <svg viewBox="0 0 342 246" width="100%" height="100%" style={{ position: "absolute" }}>
        {[24, 87, 173, 259, 323].map((x, i) => <g key={x}>
          <rect x={x - 8} y={0} width={16} height={246} rx={7} fill={COLORS.forestDark} />
          <ellipse cx={x} cy={35 + (i % 2) * 34} rx={49} ry={87} fill={COLORS.cabinetShade} />
          <ellipse cx={x - 17} cy={124} rx={35} ry={61} fill={COLORS.forestDark} />
        </g>)}
      </svg>
      <Ded width={290 + lean * 45} expression={serious ? "serious" : "sly"}
        mouthOpen={mouthOpen} eyesOpen={blink(frame)} lookX={0}
        headTilt={serious ? 0 : -3 + lean * 3} bob={breathe(frame) * 1.2}
        style={{ position: "absolute", left: 26 - lean * 22.5,
          top: -4 - lean * 8 + Math.sin(frame * 1.7) * 0.7 }} />
    </AbsoluteFill>
  );
};

/** Общий для сцен 5–6 крупный план того же телевизора и видика. */
export const RecordingCloseup: React.FC<{ children: React.ReactNode; noise: number }> = ({ children, noise }) => (
  <Camera transformOrigin="0 0" keyframes={[{ frame: 0, zoom: 1.64, x: -222, y: -678 }]}>
    <Apartment view="tv" tvContent={children} tvNoise={noise} />
    <Vcr width={480} style={{ position: "absolute", left: 210, top: 1180 }} />
  </Camera>
);
