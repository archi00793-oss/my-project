import { parseSrt } from "@remotion/captions";
import { staticFile } from "remotion";

/** Совместимый с прежним Captions формат: начало включительно, конец — нет. */
export type Caption = {
  text: string;
  from: number;
  to: number;
  accent?: string[];
};

export type CaptionWord = { text: string; from: number; to: number };

/** SRT содержит времена реплик. Без разметки слов делим их время равномерно. */
export const getCaptionWords = (caption: Caption): CaptionWord[] => {
  // Неразрывный пробел сохраняет «30 дней» и «Я —» одним блоком.
  const words = caption.text.split(/[ \t\r\n]+/u).filter(Boolean);
  return words.map((text, index) => ({
    text,
    from: caption.from + Math.floor((caption.to - caption.from) * index / words.length),
    to: caption.from + Math.floor((caption.to - caption.from) * (index + 1) / words.length),
  }));
};

/** Чистый разбор текста SRT; fps передаётся явно из VIDEO/useVideoConfig(). */
export const parseSrtCaptions = (input: string, fps: number): Caption[] => {
  if (!Number.isFinite(fps) || fps <= 0) throw new Error("fps должен быть больше нуля.");
  const { captions } = parseSrt({
    input: input.replace(/^\uFEFF/u, "").replace(/\r\n?/g, "\n"),
    strict: true,
  });
  return captions.map((caption) => {
    const from = Math.round(caption.startMs * fps / 1000);
    return {
      text: caption.text.trim().replace(/\s*\n\s*/g, " "),
      from,
      // Даже реплика короче кадра должна попасть хотя бы в один кадр.
      to: Math.max(from + 1, Math.round(caption.endMs * fps / 1000)),
    };
  });
};

/** Читает public/audio/<filename>.srt через сервер Remotion. */
export const loadCaptionsFromSrt = async (
  filename: string,
  fps: number,
  signal?: AbortSignal,
): Promise<Caption[]> => {
  const relative = filename.replace(/^audio\//, "");
  if (
    !/\.srt$/i.test(relative) || relative.startsWith("/") ||
    relative.includes("\\") || relative.includes(":") || relative.split("/").includes("..")
  ) {
    throw new Error("Укажите относительный путь к .srt внутри public/audio/.");
  }
  const response = await fetch(staticFile(`audio/${relative}`), { signal });
  if (!response.ok) throw new Error(`Не удалось загрузить ${filename}: HTTP ${response.status}.`);
  return parseSrtCaptions(await response.text(), fps);
};
