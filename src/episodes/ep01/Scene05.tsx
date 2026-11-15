import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, ease, mouthFlap } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Captions, isTalking, type Caption } from "../../components/Captions";
import { Sfx } from "../../components/Sfx";
import { COLORS, sec } from "../../config/video";
import { Doshirak, Vcr } from "../../props";
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

/** 0:22–0:38. Адрес заглушён помехами и не придуман для изображения. */
export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const writing = frame >= sec(13.4);
  const lean = ease(frame, sec(11.8), sec(12.5));
  const noise = writing ? 0.9 + Math.sin(frame * 0.8) * 0.1 : 0.13;
  const mouthOpen = mouthFlap(frame, isTalking(captions, frame) || writing) * 0.7;
  const bend = 84 + (writing ? Math.sin(frame * 0.95) * 8 : 0);
  // Кончик маркера следует за кистью готового персонажа, без копирования руки.
  const radians = bend * Math.PI / 180;
  const handX = 370 + (410 - Math.sin(radians) * 167) * 550 / 600;
  const handY = 650 + (530 + Math.cos(radians) * 167) * 550 / 600;

  return (
    <AbsoluteFill>
      <Camera keyframes={[{ frame: 0, zoom: 1 }]}>
        {writing ? <>
          <Apartment view="tv" tvNoise={noise}
            tvContent={<DedRecording mouthOpen={mouthOpen} lean={lean} />} />
          <Vcr width={480} style={{ position: "absolute", left: 210, top: 1180 }} />
          <Lyokha width={550} holdingPhone={false} jacket expression="confused"
            bendLeft={90} bendRight={bend} eyesOpen={blink(frame)} headTilt={15} lookX={-0.5}
            style={{ position: "absolute", left: 370, top: 650 }} />
          <div style={{ position: "absolute", left: 510, top: 1010, width: 380 }}>
            <Doshirak width={380} />
            <svg viewBox="0 0 360 280" width={380} height={380 * 280 / 360}
              style={{ position: "absolute", inset: 0 }}>
              {/* Пустая упаковка; штрихи вместо отсутствующего в сценарии адреса. */}
              <ellipse cx={180} cy={98} rx={132} ry={42} fill={COLORS.cardboardLight} />
              <ellipse cx={180} cy={100} rx={110} ry={28} fill={COLORS.paper} />
              {/* Запись ниже фирменного названия: «ДОШИК» остаётся видимым. */}
              <rect x={78} y={210} width={204} height={34} rx={6} fill={COLORS.paper} />
              {Array.from({ length: 15 }, (_, i) => <rect key={i} x={88 + (i % 8) * 23}
                y={219 + Math.floor(i / 8) * 12} width={12 + i % 4} height={3} rx={1.5}
                fill={COLORS.hair} opacity={frame >= sec(13.5 + i * 0.14) ? 1 : 0}
                transform={`rotate(${i % 2 ? -12 : 10} ${88 + (i % 8) * 23} ${219 + Math.floor(i / 8) * 12})`} />)}
            </svg>
          </div>
          <svg width={30} height={95} viewBox="0 0 30 95" role="img" aria-label="Маркер"
            style={{ position: "absolute", left: handX - 12, top: handY - 20, rotate: "-20deg" }}>
            <rect x={6} y={0} width={18} height={73} rx={6} fill={COLORS.shoes} />
            <rect x={6} y={10} width={18} height={24} rx={3} fill={COLORS.paper} />
            <path d="M9 73 H21 L17 94 H13Z" fill={COLORS.hair} />
          </svg>
          {/* Готовая кисть поверх упаковки и маркера: геометрия персонажа не меняется. */}
          <Lyokha width={550} holdingPhone={false} jacket expression="confused"
            bendLeft={90} bendRight={bend} headTilt={15} lookX={-0.5} eyesOpen={blink(frame)}
            style={{ position: "absolute", left: 370, top: 650,
              clipPath: `circle(27px at ${handX - 370}px ${handY - 650}px)` }} />
        </> : <RecordingCloseup noise={noise}>
          <DedRecording mouthOpen={mouthOpen} lean={lean} />
        </RecordingCloseup>}
      </Camera>
      <Captions captions={captions} fontSize={80} top={1420} />
      <Sfx src="ep01-static.wav" from={sec(13.4)} durationInFrames={sec(2.6)} volume={0.6}
        fadeInFrames={sec(0.1)} fadeOutFrames={sec(0.1)} />
      <Sfx src="ep01-marker.wav" from={sec(13.4)} durationInFrames={sec(2.6)} volume={0.5} />
    </AbsoluteFill>
  );
};
