// Список всех роликов проекта. Каждая серия регистрируется здесь как Composition.
import React from "react";
import { Composition, Folder } from "remotion";
import "./config/fonts";
import { VIDEO } from "./config/video";
import { Ep00Test, EP00_DURATION } from "./episodes/Ep00Test";
import { Ep01Assets, EP01_ASSETS_DURATION } from "./episodes/Ep01Assets";
import { Ep01LocationPreviews } from "./scenes/Ep01LocationPreviews";
import { Ep01Kasseta, EP01_DURATION } from "./episodes/Ep01Kasseta";
import { Scene01, SCENE01_DURATION } from "./episodes/ep01/Scene01";
import { Scene02, SCENE02_DURATION } from "./episodes/ep01/Scene02";
import { Scene03, SCENE03_DURATION } from "./episodes/ep01/Scene03";
import { Scene04, SCENE04_DURATION } from "./episodes/ep01/Scene04";
import { Scene05, SCENE05_DURATION } from "./episodes/ep01/Scene05";
import { Scene06, SCENE06_DURATION } from "./episodes/ep01/Scene06";

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
    <Composition id="Ep01-Kasseta" component={Ep01Kasseta} durationInFrames={EP01_DURATION}
      fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} />
    <Folder name="Ep01-Scenes">
      <Composition id="Ep01-Scene01" component={Scene01} durationInFrames={SCENE01_DURATION}
        fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="Ep01-Scene02" component={Scene02} durationInFrames={SCENE02_DURATION}
        fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="Ep01-Scene03" component={Scene03} durationInFrames={SCENE03_DURATION}
        fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="Ep01-Scene04" component={Scene04} durationInFrames={SCENE04_DURATION}
        fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="Ep01-Scene05" component={Scene05} durationInFrames={SCENE05_DURATION}
        fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} />
      <Composition id="Ep01-Scene06" component={Scene06} durationInFrames={SCENE06_DURATION}
        fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} />
    </Folder>
    {/* Новые серии добавляйте ниже: id в формате Ep01-Название */}
  </>
);
