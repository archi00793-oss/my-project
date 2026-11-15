import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { blink, ease } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Sfx } from "../../components/Sfx";
import { COLORS, sec, VIDEO } from "../../config/video";
import { TapeBox, Vcr, VhsTape } from "../../props";
import { Apartment } from "../../scenes/Apartment";
import { FIRST_TAPE_LABEL } from "./Scene01";

export const SCENE04_DURATION = sec(4);

/** 0:18–0:22. Без реплик: антресоль → пыль → кассета и помехи. */
export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const climb = ease(frame, 0, sec(0.65));
  const retrieve = ease(frame, sec(0.7), sec(1.45));
  const blow = ease(frame, sec(1.65), sec(2.45));
  const insert = ease(frame, sec(2.75), sec(3.45));
  const searching = frame < sec(1.5);
  const dusting = !searching && frame < sec(2.6);

  return (
    <AbsoluteFill>
      <Camera keyframes={[{ frame: 0, zoom: 1 }]}>
        <Apartment view={searching ? "wide" : "tv"} tvNoise={frame >= sec(3.45) ? 1 : 0} />
        {searching ? <>
          {/* Лёха поднимается на кухонную столешницу под антресолью. */}
          <Lyokha width={480} holdingPhone={false} jacket expression="confused"
            armLeft={125 + climb * 55} armRight={135 + climb * 45}
            eyesOpen={blink(frame)} headTilt={-8}
            style={{ position: "absolute", left: 60, top: 580 - climb * 286 }} />
          <Vcr width={190} style={{ position: "absolute", left: 320 - retrieve * 80,
            top: 350 + retrieve * 15 }} />
          {[0, 1, 2].map((i) => {
            const fall = ease(frame, sec(0.25 + i * 0.22), sec(1.05 + i * 0.17));
            return <TapeBox key={i} width={180 - i * 14} open={false}
              style={{ position: "absolute", left: 420 + i * 45 + fall * (130 + i * 40),
                top: 280 + i * 25 + fall * fall * (1030 - i * 45),
                rotate: `${fall * (i % 2 ? -55 : 65)}deg` }} />;
          })}
        </> : dusting ? <>
          <Lyokha width={640} holdingPhone={false} jacket expression="neutral"
            bendLeft={120} bendRight={120} headTilt={12} mouthOpen={0.35}
            eyesOpen={0.6} style={{ position: "absolute", left: -20, top: 400 }} />
          <Vcr width={560} style={{ position: "absolute", left: 35, top: 840 }} />
          <svg width={VIDEO.width} height={VIDEO.height} style={{ position: "absolute", inset: 0 }}>
            {/* Пыль с корпуса разлетается от выдоха; её количество убывает. */}
            {Array.from({ length: 18 }, (_, i) => <ellipse key={i}
              cx={100 + i * 23 + blow * (160 + i * 6)}
              cy={865 - blow * (70 + (i % 4) * 25)} rx={5 + i % 4} ry={3 + i % 3}
              fill={COLORS.grayHairShadow} opacity={1 - blow} />)}
          </svg>
        </> : <>
          <Vcr width={480} style={{ position: "absolute", left: 210, top: 1180 }} />
          {/* Кассета сжимается по глубине и исчезает внутри приёмной щели. */}
          {insert < 1 && <div style={{ position: "absolute", left: 252, top: 1155 + insert * 100,
            width: 270, height: 270 * 270 / 480, transformOrigin: "50% 0%",
            scale: `1 ${interpolate(insert, [0, 0.75, 1], [0.8, 0.22, 0])}` }}>
            <VhsTape label={FIRST_TAPE_LABEL} width={270} />
          </div>}
          <Lyokha width={500} holdingPhone={false} jacket expression="neutral"
            armLeft={60 - insert * 8} bendRight={100} lookX={-0.6}
            eyesOpen={blink(frame)} headTilt={8}
            style={{ position: "absolute", left: 500, top: 720 }} />
        </>}
      </Camera>
      <Sfx src="ep01-boxes.wav" from={sec(0.25)} durationInFrames={sec(1.25)} volume={0.7} />
      <Sfx src="ep01-dust.wav" from={sec(1.65)} durationInFrames={sec(0.8)} volume={0.5} />
      <Sfx src="ep01-insert.wav" from={sec(2.85)} durationInFrames={sec(0.6)} volume={0.65} />
      <Sfx src="ep01-static.wav" from={sec(3.45)} durationInFrames={sec(0.55)} volume={0.3} />
    </AbsoluteFill>
  );
};
