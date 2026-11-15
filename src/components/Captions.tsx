// Крупные субтитры: жирный шрифт, чёрная обводка, акцентные слова жёлтым.
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../config/video";
import { getCaptionWords } from "../animation/captions";
import type { Caption } from "../animation/captions";

export type { Caption } from "../animation/captions";

type Props = {
  captions: readonly Caption[];
  /** По умолчанию прежняя реплика целиком; новый режим накапливает слова. */
  mode?: "sentence" | "word-by-word";
  /** Отступ сверху до блока субтитров, px */
  top?: number;
  fontSize?: number;
};

const norm = (w: string) => w.toLowerCase().replace(/[.,!?…:;«»"—-]/g, "");

export const Captions: React.FC<Props> = ({ captions, mode = "sentence", top = 1330, fontSize = 118 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = captions.find((c) => frame >= c.from && frame < c.to);
  if (!active) return null;

  const pop = spring({ frame: frame - active.from, fps, config: { damping: 14, stiffness: 220 } });
  const accent = new Set((active.accent ?? []).map(norm));
  const words = mode === "word-by-word"
    ? getCaptionWords(active)
    : active.text.split(" ").map((text) => ({ text, from: active.from, to: active.to }));

  return (
    <div
      style={{
        position: "absolute",
        left: 50,
        right: 50,
        top,
        display: "flex",
        justifyContent: "center",
        transform: `scale(${0.8 + 0.2 * pop})`,
        opacity: pop,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.caption,
          fontWeight: 700,
          fontSize,
          lineHeight: 1.05,
          textAlign: "center",
          textTransform: "uppercase",
          WebkitTextStroke: `${Math.round(fontSize / 9)}px ${COLORS.captionStroke}`,
          paintOrder: "stroke fill",
          textShadow: `0 8px 0 ${COLORS.captionStroke}`,
        }}
      >
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span
              style={{
                color: accent.has(norm(word.text)) || (mode === "word-by-word" && frame >= word.from && frame < word.to)
                  ? COLORS.captionAccent : COLORS.captionMain,
                ...(mode === "word-by-word" ? {
                  display: "inline-block",
                  visibility: frame >= word.from ? "visible" : "hidden",
                  opacity: spring({ frame: frame - word.from, fps, config: { damping: 18, stiffness: 260 } }),
                } : {}),
              }}
            >
              {word.text}
              {mode === "sentence" ? " " : null}
            </span>
            {/* Пробел вне inline-block позволяет переносить слова без скачков. */}
            {mode === "word-by-word" ? " " : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/** Говорит ли персонаж на этом кадре (есть ли активная реплика) */
export const isTalking = (captions: readonly Caption[], frame: number) =>
  captions.some((c) => frame >= c.from && frame < c.to);
