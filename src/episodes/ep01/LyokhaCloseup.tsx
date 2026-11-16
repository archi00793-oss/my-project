import React from "react";
import { useCurrentFrame } from "remotion";
import { Lyokha, type LyokhaProps } from "../../characters/Lyokha/Lyokha";
import { Camera } from "../../components/Camera";
import { blink } from "../../animation/motion";
import { Apartment } from "../../scenes/Apartment";
export const LyokhaCloseup: React.FC<LyokhaProps> = (props) => {
  const frame = useCurrentFrame();
  return <Camera transformOrigin="0 0" keyframes={[{ frame: 0, zoom: 2.9, x: -330, y: -740 }]}>
    <Apartment />
    <Lyokha width={600} holdingPhone={false} eyesOpen={blink(frame)} {...props}
      style={{ position: "absolute", left: 0, top: 300 }} />
  </Camera>;
};
