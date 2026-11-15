import React from "react";
import { Transitions } from "../components/Transitions";
import { Scene01, SCENE01_DURATION } from "./ep01/Scene01";
import { Scene02, SCENE02_DURATION } from "./ep01/Scene02";
import { Scene03, SCENE03_DURATION } from "./ep01/Scene03";

/** Пока собраны только сцены 1–3: 0:00–0:18, без заглушек следующих сцен. */
export const EP01_DURATION = SCENE01_DURATION + SCENE02_DURATION + SCENE03_DURATION;

export const Ep01Kasseta: React.FC = () => (
  <Transitions scenes={[
    { id: "scene01", name: "1. Хук", durationInFrames: SCENE01_DURATION, content: <Scene01 /> },
    { id: "scene02", name: "2. Кто такой Лёха", durationInFrames: SCENE02_DURATION, content: <Scene02 /> },
    { id: "scene03", name: "3. Коробка", durationInFrames: SCENE03_DURATION, content: <Scene03 /> },
  ]} />
);
