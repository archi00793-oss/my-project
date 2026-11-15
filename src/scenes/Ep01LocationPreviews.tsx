import React from "react";
import { Composition, Folder } from "remotion";
import { VIDEO, sec } from "../config/video";
import { Apartment } from "./Apartment";
import { BlackCard } from "./BlackCard";
import { Doorway } from "./Doorway";

/** Технические планы локаций, без монтажа и событий серии. */
export const Ep01LocationPreviews: React.FC = () => (
  <Folder name="Ep01-Locations">
    <Composition id="Ep01-Apartment-Wide" component={Apartment} defaultProps={{ view: "wide" as const }}
      width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={sec(3)} />
    <Composition id="Ep01-Apartment-Sink" component={Apartment} defaultProps={{ view: "sink" as const }}
      width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={sec(3)} />
    <Composition id="Ep01-Apartment-Tv" component={Apartment} defaultProps={{ view: "tv" as const }}
      width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={sec(3)} />
    <Composition id="Ep01-Doorway-Open" component={Doorway} defaultProps={{ open: true }}
      width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={sec(3)} />
    <Composition id="Ep01-Doorway-Closed" component={Doorway} defaultProps={{ open: false }}
      width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={sec(3)} />
    <Composition id="Ep01-BlackCard" component={BlackCard}
      width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={sec(3)} />
    <Composition id="Ep01-BlackCard-Title" component={BlackCard} defaultProps={{ title: "ЛЁХИНО" }}
      width={VIDEO.width} height={VIDEO.height} fps={VIDEO.fps} durationInFrames={sec(3)} />
  </Folder>
);
