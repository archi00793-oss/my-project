// Список всех роликов проекта. Каждая серия регистрируется здесь как Composition.
import React from "react";
import { Composition } from "remotion";
import "./config/fonts";
import { VIDEO } from "./config/video";
import { Ep00Test, EP00_DURATION } from "./episodes/Ep00Test";

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
    {/* Новые серии добавляйте ниже: id в формате Ep01-Название */}
  </>
);
