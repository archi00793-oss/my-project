import React from "react";
import { COLORS } from "../config/video";
import { PropSvg, type PropProps } from "./PropSvg";
import { VhsTape } from "./VhsTape";

export type TapeBoxProps = PropProps & {
  /** Подписи кассет не раскрывают тайну первой серии. */
  labels?: readonly string[];
  /** Закрытая посылка до распаковки; прежний вид по умолчанию открыт. */
  open?: boolean;
};

export const TapeBox: React.FC<TapeBoxProps> = ({ labels = [
  "Когда приедешь", "Если придёт Жмыхов", "Когда станет совсем тяжело",
  "Когда влюбишься", "Открой, когда меня не станет",
], open = true, ...props }) => (
  <PropSvg canvas={[480, 400]} label="Коробка с кассетами деда" {...props}>
    {open && <path d="M77 153 L91 61 L389 61 L407 153Z" fill={COLORS.cardboardLight} />}
    <path d="M58 145 L422 145 L402 349 L79 349Z" fill={COLORS.cardboardDark} />
    {open && labels.map((label, i) => <VhsTape key={`${i}-${label}`} label={label} x={92 + i * 5} y={75 + i * 33} width={275} />)}
    <path d="M64 169 L238 204 L238 380 L73 341Z" fill={COLORS.cardboard} />
    <path d="M238 204 L418 169 L407 341 L238 380Z" fill={COLORS.cardboardLight} />
    {open ? <g>
      <path d="M64 169 L12 211 L183 260 L238 204Z" fill={COLORS.cardboardLight} />
      <path d="M238 204 L296 259 L469 210 L418 169Z" fill={COLORS.cardboard} />
    </g> : <g>
      <path d="M64 169 L238 104 L418 169 L238 204Z" fill={COLORS.cardboardLight} />
      <path d="M226 109 L241 104 L254 199 L238 204Z" fill={COLORS.cardboardDark} />
    </g>}
    <path d="M224 229 L240 231 L240 370 L224 366Z" fill={COLORS.cardboardDark} />
    <path d="M294 294 L371 278 L371 315 L294 331Z" fill={COLORS.paper} />
  </PropSvg>
);
