// Тестовая сцена: проверяем персонажа, комнату, субтитры и счётчик.
// Шаблон для настоящих серий: скопируйте файл, поменяйте реплики и позы.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { blink, breathe, ease, mouthFlap } from "../animation/motion";
import { Hero, HERO_ASPECT } from "../characters/Hero";
import type { Expression } from "../characters/Hero";
import { Captions, isTalking } from "../components/Captions";
import type { Caption } from "../components/Captions";
import { DayCounter } from "../components/DayCounter";
import { sec, VIDEO } from "../config/video";
import { Room } from "../scenes/Room";

export const EP00_DURATION = sec(10);

const CAPTIONS: Caption[] = [
  { text: "Это тестовая сцена", from: sec(0.3), to: sec(2), accent: ["тестовая"] },
  { text: "Привет! Я\u00A0— герой нашего сериала", from: sec(2), to: sec(5), accent: ["герой"] },
  { text: "До цели 30\u00A0дней", from: sec(5), to: sec(7.6), accent: ["30\u00A0дней"] },
  { text: "Поехали!", from: sec(7.6), to: sec(10), accent: ["поехали"] },
];

const HERO_WIDTH = 640;

export const Ep00Test: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Поза и эмоция по отрезкам времени
  let expression: Expression = "neutral";
  let armRight = 0;
  let armLeft = 0;
  let lookX = 0;
  let headTilt = 0;

  if (frame >= sec(2) && frame < sec(5)) {
    // машет рукой
    expression = "happy";
    const raise = ease(frame, sec(2), sec(2.4));
    armRight = raise * (135 + 18 * Math.sin(frame * 0.45));
    headTilt = -4 * raise;
  } else if (frame >= sec(5) && frame < sec(7.6)) {
    // смотрит на календарь
    expression = "surprised";
    lookX = ease(frame, sec(5), sec(5.4));
    headTilt = 5 * lookX;
  } else if (frame >= sec(7.6)) {
    // обе руки вверх
    expression = "happy";
    const up = ease(frame, sec(7.6), sec(8));
    armLeft = 150 * up;
    armRight = 150 * up;
  }

  const progress = interpolate(frame, [sec(7.6), sec(9)], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Лёгкий наезд камеры на протяжении всего ролика
  const zoom = interpolate(frame, [0, EP00_DURATION], [1, 1.05]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 40%" }}>
        <Room calendarDay={30} />
        <div
          style={{
            position: "absolute",
            left: (VIDEO.width - HERO_WIDTH) / 2,
            top: 1530 - HERO_WIDTH * HERO_ASPECT * (1060 / 1100),
          }}
        >
          <Hero
            width={HERO_WIDTH}
            eyesOpen={blink(frame)}
            mouthOpen={mouthFlap(frame, isTalking(CAPTIONS, frame))}
            expression={expression}
            armLeft={armLeft}
            armRight={armRight}
            lookX={lookX}
            headTilt={headTilt}
            bob={breathe(frame, fps * 2) * 6}
          />
        </div>
      </AbsoluteFill>

      <DayCounter day={1} progress={progress} />
      <Captions captions={CAPTIONS} />
    </AbsoluteFill>
  );
};
