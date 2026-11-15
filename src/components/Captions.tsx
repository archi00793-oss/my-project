// Крупные субтитры: жирный шрифт, чёрная обводка, акцентные слова жёлтым.
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../config/video";

export type Caption = {
  /** Текст реплики */
  text: string;
  /** Кадр начала */
  from: number;
  /** Кадр конца (не включительно) */
  to: number;
  /** Слова, которые выделяются акцентным цветом */
  accent?: string[];
};

type Props = {
  captions: Caption[];
  /** Отступ сверху до блока субтитров, px */
  top?: number;
  fontSize?: number;
};

const norm = (w: string) => w.toLowerCase().replace(/[.,!?…:;«»"—-]/g, "");

export const Captions: React.FC<Props> = ({ captions, top = 1330, fontSize = 118 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = captions.find((c) => frame >= c.from && frame < c.to);
  if (!active) return null;

  const pop = spring({ frame: frame - active.from, fps, config: { damping: 14, stiffness: 220 } });
  const accent = new Set((active.accent ?? []).map(norm));

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
        {active.text.split(" ").map((word, i) => (
          <span
            key={i}
            style={{ color: accent.has(norm(word)) ? COLORS.captionAccent : COLORS.captionMain }}
          >
            {word}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

/** Говорит ли персонаж на этом кадре (есть ли активная реплика) */
export const isTalking = (captions: Caption[], frame: number) =>
  captions.some((c) => frame >= c.from && frame < c.to);
