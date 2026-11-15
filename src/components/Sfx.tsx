import React from "react";
import { Audio } from "@remotion/media";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { getSfxVolume } from "../animation/audio";
import type { SfxEnvelope } from "../animation/audio";

export type SfxProps = SfxEnvelope & {
  /** Имя файла относительно public/sfx/, например "whoosh.wav". */
  src: string;
  from: number;
  name?: string;
  trimBefore?: number;
};

/** Каждый Sfx — отдельная звуковая дорожка, поэтому эффекты могут перекрываться. */
export const Sfx: React.FC<SfxProps> = ({ src, from, name, trimBefore = 0, ...envelope }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relative = src.replace(/^sfx\//, "");
  if (
    !relative || relative.startsWith("/") || relative.includes("\\") ||
    relative.includes(":") || relative.split("/").includes("..") ||
    !Number.isInteger(from) || from < 0 || !Number.isInteger(trimBefore) || trimBefore < 0
  ) {
    throw new Error("Sfx: нужен файл внутри public/sfx/ и неотрицательные целые кадры.");
  }
  return <Audio
    name={name ?? `SFX: ${relative}`}
    src={staticFile(`sfx/${relative}`)}
    from={from}
    durationInFrames={envelope.durationInFrames}
    trimBefore={trimBefore}
    premountFor={fps}
    volume={getSfxVolume(frame - from, envelope)}
  />;
};
