import React from "react";
import { Series, useVideoConfig } from "remotion";
import { Scene01, SCENE01_DURATION } from "./ep01/Scene01";
import { Scene02, SCENE02_DURATION } from "./ep01/Scene02";
import { Scene03, SCENE03_DURATION } from "./ep01/Scene03";
import { Scene04, SCENE04_DURATION } from "./ep01/Scene04";
import { Scene05, SCENE05_DURATION } from "./ep01/Scene05";
import { Scene06, SCENE06_DURATION } from "./ep01/Scene06";
import { Scene07, SCENE07_DURATION } from "./ep01/Scene07";
import { Scene08, SCENE08_DURATION } from "./ep01/Scene08";
import { Scene09, SCENE09_DURATION } from "./ep01/Scene09";

/** Все девять сцен: 0:00–1:00, тайминг по сценарию до появления озвучки. */
export const EP01_DURATION = SCENE01_DURATION + SCENE02_DURATION + SCENE03_DURATION
  + SCENE04_DURATION + SCENE05_DURATION + SCENE06_DURATION
  + SCENE07_DURATION + SCENE08_DURATION + SCENE09_DURATION;

export const Ep01Kasseta: React.FC = () => {
  const { fps } = useVideoConfig();

  // По сценарию — прямые склейки без перекрытия; финал в чёрное задан в Scene09.
  return (
    <Series>
      <Series.Sequence name="1. Хук" durationInFrames={SCENE01_DURATION} premountFor={fps}>
        <Scene01 />
      </Series.Sequence>
      <Series.Sequence name="2. Кто такой Лёха" durationInFrames={SCENE02_DURATION} premountFor={fps}>
        <Scene02 />
      </Series.Sequence>
      <Series.Sequence name="3. Коробка" durationInFrames={SCENE03_DURATION} premountFor={fps}>
        <Scene03 />
      </Series.Sequence>
      <Series.Sequence name="4. Видик" durationInFrames={SCENE04_DURATION} premountFor={fps}>
        <Scene04 />
      </Series.Sequence>
      <Series.Sequence name="5. Дед" durationInFrames={SCENE05_DURATION} premountFor={fps}>
        <Scene05 />
      </Series.Sequence>
      <Series.Sequence name="6. Жмыхов" durationInFrames={SCENE06_DURATION} premountFor={fps}>
        <Scene06 />
      </Series.Sequence>
      <Series.Sequence name="7. Дорога" durationInFrames={SCENE07_DURATION} premountFor={fps}>
        <Scene07 />
      </Series.Sequence>
      <Series.Sequence name="8. Механика" durationInFrames={SCENE08_DURATION} premountFor={fps}>
        <Scene08 />
      </Series.Sequence>
      <Series.Sequence name="9. Задел" durationInFrames={SCENE09_DURATION} premountFor={fps}>
        <Scene09 />
      </Series.Sequence>
    </Series>
  );
};
