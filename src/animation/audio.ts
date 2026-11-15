export type SfxEnvelope = {
  volume?: number;
  durationInFrames?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
};

/** Локальный кадр звука, без учёта trimBefore в исходном файле. */
export const getSfxVolume = (frame: number, {
  volume = 1, durationInFrames, fadeInFrames = 0, fadeOutFrames = 0,
}: SfxEnvelope = {}): number => {
  if (
    !Number.isFinite(volume) || volume < 0 || volume > 1 ||
    !Number.isInteger(fadeInFrames) || fadeInFrames < 0 ||
    !Number.isInteger(fadeOutFrames) || fadeOutFrames < 0 ||
    (durationInFrames !== undefined && (!Number.isInteger(durationInFrames) || durationInFrames < 1)) ||
    (fadeOutFrames > 0 && durationInFrames === undefined)
  ) {
    throw new Error("Громкость SFX: 0..1; длительности — целые кадры; fadeOut требует durationInFrames.");
  }
  if (frame < 0 || (durationInFrames !== undefined && frame >= durationInFrames)) return 0;
  const fadeIn = fadeInFrames === 0 ? 1 : Math.min(1, frame / fadeInFrames);
  const fadeOut = fadeOutFrames === 0 || durationInFrames === undefined
    ? 1 : Math.min(1, (durationInFrames - 1 - frame) / fadeOutFrames);
  return volume * fadeIn * fadeOut;
};
