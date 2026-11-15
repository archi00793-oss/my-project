import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { getCameraState } from "../animation/camera";
import type { CameraKeyframe, CameraShake } from "../animation/camera";

export type { CameraKeyframe, CameraShake } from "../animation/camera";

export type CameraProps = React.PropsWithChildren<{
  keyframes?: readonly CameraKeyframe[];
  shakes?: readonly CameraShake[];
  transformOrigin?: React.CSSProperties["transformOrigin"];
}>;

/** Камера двигает только children; интерфейс и субтитры размещайте снаружи. */
export const Camera: React.FC<CameraProps> = ({
  children, keyframes, shakes, transformOrigin = "50% 50%",
}) => {
  const frame = useCurrentFrame();
  const camera = getCameraState(frame, keyframes, shakes);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{
        scale: camera.zoom,
        translate: `${camera.x}px ${camera.y}px`,
        rotate: `${camera.rotation}deg`,
        transformOrigin,
      }}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
