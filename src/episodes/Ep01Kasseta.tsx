import React from "react";
import { Transitions } from "../components/Transitions";
import { Scene01, SCENE01_DURATION } from "./ep01/Scene01";
import { Scene02, SCENE02_DURATION } from "./ep01/Scene02";
import { Scene03, SCENE03_DURATION } from "./ep01/Scene03";
import { Scene04, SCENE04_DURATION } from "./ep01/Scene04";
import { Scene05, SCENE05_DURATION } from "./ep01/Scene05";
import { Scene06, SCENE06_DURATION } from "./ep01/Scene06";

/** Собраны сцены 1–6: 0:00–0:43, без заглушек следующих сцен. */
export const EP01_DURATION = SCENE01_DURATION + SCENE02_DURATION + SCENE03_DURATION
  + SCENE04_DURATION + SCENE05_DURATION + SCENE06_DURATION;

export const Ep01Kasseta: React.FC = () => (
  <Transitions scenes={[
    { id: "scene01", name: "1. Хук", durationInFrames: SCENE01_DURATION, content: <Scene01 /> },
    { id: "scene02", name: "2. Кто такой Лёха", durationInFrames: SCENE02_DURATION, content: <Scene02 /> },
    { id: "scene03", name: "3. Коробка", durationInFrames: SCENE03_DURATION, content: <Scene03 /> },
    { id: "scene04", name: "4. Видик", durationInFrames: SCENE04_DURATION, content: <Scene04 /> },
    { id: "scene05", name: "5. Дед", durationInFrames: SCENE05_DURATION, content: <Scene05 /> },
    { id: "scene06", name: "6. Жмыхов", durationInFrames: SCENE06_DURATION, content: <Scene06 /> },
  ]} />
);
