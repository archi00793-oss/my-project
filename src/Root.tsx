// Список всех роликов проекта. Каждая серия регистрируется здесь как Composition.
import React from "react";
import { Composition } from "remotion";
import "./config/fonts";
import { VIDEO } from "./config/video";
import { Ep00Test, EP00_DURATION } from "./episodes/Ep00Test";
import { Ep01Assets, EP01_ASSETS_DURATION } from "./episodes/Ep01Assets";
import { Ep01LocationPreviews } from "./scenes/Ep01LocationPreviews";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Ep00-Test"
      component={Ep00Test}
      durationInFrames={EP00_DURATION}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
    />
    <Composition
      id="Ep01-Assets"
      component={Ep01Assets}
      durationInFrames={EP01_ASSETS_DURATION}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
    />
    <Ep01LocationPreviews />
    {/* Новые серии добавляйте ниже: id в формате Ep01-Название */}
  </>
);
