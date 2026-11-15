import React from "react";
import { AbsoluteFill } from "remotion";
import { Camera } from "../../components/Camera";
import { Captions, type Caption } from "../../components/Captions";
import { sec, VIDEO } from "../../config/video";
import { VhsTape } from "../../props";
import { BlackCard } from "../../scenes/BlackCard";

export const SCENE01_DURATION = sec(4);
export const FIRST_TAPE_LABEL = "ОТКРОЙ, КОГДА МЕНЯ НЕ СТАНЕТ";

const captions: Caption[] = [
  { text: "Эту кассету Лёха получил", from: 0, to: sec(1.5) },
  { text: "через неделю", from: sec(1.5), to: sec(2.6) },
  { text: "после похорон деда.", from: sec(2.6), to: SCENE01_DURATION, accent: ["похорон деда"] },
];

/** 0:00–0:04. Наезд только на кассету; субтитры остаются неподвижными. */
export const Scene01: React.FC = () => (
  <AbsoluteFill>
    <BlackCard />
    <Camera transformOrigin="50% 43%" keyframes={[
      { frame: 0, zoom: 1 },
      { frame: SCENE01_DURATION - 1, zoom: 1.12 },
    ]}>
      <VhsTape label={FIRST_TAPE_LABEL} width={VIDEO.width * 0.8}
        style={{ position: "absolute", left: VIDEO.width * 0.1, top: 600 }} />
    </Camera>
    <Captions captions={captions} fontSize={92} top={1320} />
  </AbsoluteFill>
);
