import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { blink, ease } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Sfx } from "../../components/Sfx";
import { COLORS, sec, VIDEO } from "../../config/video";
import { Vcr, VhsTape } from "../../props";
import { Apartment } from "../../scenes/Apartment";
import { FIRST_TAPE_LABEL } from "./Scene01";

export const SCENE04_DURATION = sec(7);

/** 0:18–0:25. Без реплик: антресоль → пыль → кассета и помехи. */
export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const stool = ease(frame, 0, sec(0.65));
  const climb = ease(frame, sec(0.7), sec(1.5));
  const doors = ease(frame, sec(1.5), sec(2.1));
  const retrieve = ease(frame, sec(2.1), sec(2.9));
  const descend = ease(frame, sec(3), sec(3.8));
  const blow = ease(frame, sec(4), sec(4.85));
  const insert = ease(frame, sec(5.2), sec(6.4));
  const searching = frame < sec(3.9);
  const dusting = !searching && frame < sec(5.1);
  const leftStep = ease(frame, sec(0.7), sec(1.1)) * (1 - ease(frame, sec(3), sec(3.4)));
  const rightStep = ease(frame, sec(1.1), sec(1.5)) * (1 - ease(frame, sec(3.4), sec(3.8)));
  const heroY = 550 - climb * 420 + descend * 420;
  const vx = 275 - retrieve * 65;
  const vy = 530 + retrieve * 190 + descend * 420;
  return (
    <AbsoluteFill>
      <Camera keyframes={[{ frame: 0, zoom: 1 }]}>
        <Apartment view={searching ? "wide" : "tv"} tvNoise={frame >= sec(6.4) ? 1 : 0} />
        {searching ? <>
          <svg width={VIDEO.width} height={VIDEO.height} style={{ position: "absolute", inset: 0 }}>
            {/* Подвижный шкаф опущен к верхнему краю кухонного фартука. */}
            <rect x={42} y={235} width={510} height={250} fill={COLORS.apartmentWall} />
            <rect x={160} y={455} width={440} height={210} rx={12} fill={COLORS.doorInset} />
            <g transform={`translate(${360 - stool * 180} 1090)`}>
              <rect x={12} y={15} width={30} height={350} rx={8} fill={COLORS.doorWood} />
              <rect x={188} y={15} width={30} height={350} rx={8} fill={COLORS.doorWood} />
              <rect y={-60} width={230} height={65} rx={15} fill={COLORS.cardboardLight} />
            </g>
          </svg>
          {frame < sec(2.1) && <Vcr width={330} style={{ position: "absolute", left: vx, top: vy }} />}
          <svg width={VIDEO.width} height={VIDEO.height} style={{ position: "absolute", inset: 0 }}>
            <g transform={`translate(160 455) scale(${1 - doors * 0.88} 1)`}>
              <rect width={220} height={210} rx={12} fill={COLORS.cabinet} />
              <rect x={185} y={80} width={10} height={45} rx={5} fill={COLORS.counter} />
            </g>
            <g transform={`translate(600 455) scale(${-1 + doors * 0.88} 1)`}>
              <rect width={220} height={210} rx={12} fill={COLORS.cabinet} />
              <rect x={185} y={80} width={10} height={45} rx={5} fill={COLORS.counter} />
            </g>
          </svg>
          <Lyokha width={500} holdingPhone={false} expression="confused" headTilt={-8}
            stepLeft={(climb - descend - leftStep) * 504} stepRight={(climb - descend - rightStep) * 504}
            handLeft={frame < sec(0.7) ? [(360 - stool * 180 + 25 - 130) * 1.2, (1040 - heroY) * 1.2] : frame < sec(1.5) ? [170, 600] : frame < sec(2.1) ? [(345 - doors * 150 - 130) * 1.2, (560 - heroY) * 1.2] : [(vx + 40 - 130) * 1.2, (vy + 90 - heroY) * 1.2]}
            handRight={frame < sec(1.5) ? [440, 650] : frame < sec(2.1) ? [(415 + doors * 150 - 130) * 1.2, (560 - heroY) * 1.2] : [(vx + 290 - 130) * 1.2, (vy + 90 - heroY) * 1.2]}
            eyesOpen={blink(frame)} style={{ position: "absolute", left: 130, top: heroY }}>
            {frame >= sec(2.1) && <Vcr x={(vx - 130) * 1.2} y={(vy - heroY) * 1.2} width={396} />}
          </Lyokha>
        </> : dusting ? <>
          <Lyokha width={640} holdingPhone={false} jacket expression="neutral"
            handLeft={[100, 490]} handRight={[500, 490]} headTilt={12} mouthOpen={0.35}
            eyesOpen={0.6} style={{ position: "absolute", left: -20, top: 400 }}>
            <Vcr x={52} y={413} width={525} />
          </Lyokha>
          <svg width={VIDEO.width} height={VIDEO.height} style={{ position: "absolute", inset: 0 }}>
            {/* Пыль с корпуса разлетается от выдоха; её количество убывает. */}
            {Array.from({ length: 18 }, (_, i) => <ellipse key={i}
              cx={100 + i * 23 + blow * (160 + i * 6)}
              cy={865 - blow * (70 + (i % 4) * 25)} rx={20 + blow * 30 + i % 4} ry={12 + blow * 20}
              fill={COLORS.grayHairShadow} opacity={(1 - blow) * 0.4} />)}
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
      <Sfx src="ep01-boxes.wav" from={sec(0.1)} durationInFrames={sec(0.5)} volume={0.25} />
      <Sfx src="ep01-dust.wav" from={sec(4)} durationInFrames={sec(0.8)} volume={0.5} />
      <Sfx src="ep01-insert.wav" from={sec(5.5)} durationInFrames={sec(0.6)} volume={0.65} />
      <Sfx src="ep01-static.wav" from={sec(6.4)} durationInFrames={sec(0.55)} volume={0.3} />
    </AbsoluteFill>
  );
};
