import React from "react";
import { Transitions } from "../components/Transitions";
import { Scene01, SCENE01_DURATION } from "./ep01/Scene01";
import { Scene02, SCENE02_DURATION } from "./ep01/Scene02";
import { Scene03, SCENE03_DURATION } from "./ep01/Scene03";
import { Scene04, SCENE04_DURATION } from "./ep01/Scene04";
import { Scene05, SCENE05_DURATION } from "./ep01/Scene05";
import { Scene06, SCENE06_DURATION } from "./ep01/Scene06";
import { Scene07, SCENE07_DURATION } from "./ep01/Scene07";
import { Scene08, SCENE08_DURATION } from "./ep01/Scene08";
import { Scene09, SCENE09_DURATION } from "./ep01/Scene09";

/** Все девять сцен: 0:00–0:57, тайминг по сценарию до появления озвучки. */
export const EP01_DURATION = SCENE01_DURATION + SCENE02_DURATION + SCENE03_DURATION
  + SCENE04_DURATION + SCENE05_DURATION + SCENE06_DURATION
  + SCENE07_DURATION + SCENE08_DURATION + SCENE09_DURATION;

export const Ep01Kasseta: React.FC = () => (
  <Transitions scenes={[
    { id: "scene01", name: "1. Хук", durationInFrames: SCENE01_DURATION, content: <Scene01 /> },
    { id: "scene02", name: "2. Кто такой Лёха", durationInFrames: SCENE02_DURATION, content: <Scene02 /> },
    { id: "scene03", name: "3. Коробка", durationInFrames: SCENE03_DURATION, content: <Scene03 /> },
    { id: "scene04", name: "4. Видик", durationInFrames: SCENE04_DURATION, content: <Scene04 /> },
    { id: "scene05", name: "5. Дед", durationInFrames: SCENE05_DURATION, content: <Scene05 /> },
    { id: "scene06", name: "6. Жмыхов", durationInFrames: SCENE06_DURATION, content: <Scene06 /> },
    { id: "scene07", name: "7. Дорога", durationInFrames: SCENE07_DURATION, content: <Scene07 /> },
    { id: "scene08", name: "8. Механика", durationInFrames: SCENE08_DURATION, content: <Scene08 /> },
    { id: "scene09", name: "9. Задел", durationInFrames: SCENE09_DURATION, content: <Scene09 /> },
  ]} />
);
