// Движение рта по громкости озвучки.
// Положите файл в public/audio/ и передайте путь: useMouthFromAudio("audio/ep01.mp3")
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";

/** Возвращает открытость рта 0..1 для текущего кадра. Пока аудио грузится — 0. */
export const useMouthFromAudio = (audioPath: string, sensitivity = 6): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(staticFile(audioPath));
  if (!audioData) return 0;

  const bins = visualizeAudio({ fps, frame, audioData, numberOfSamples: 32 });
  // Голос в основном в нижних частотах — берём первые полосы
  const voice = bins.slice(1, 10).reduce((a, b) => a + b, 0) / 9;
  return Math.min(1, voice * sensitivity);
};
