import React from "react";
import { COLORS } from "../../config/video";
import { Phone } from "../../props";

/** Кисть и жёлтый рукав Лёхи для субъективного плана. Геометрия живёт у персонажа. */
export const LyokhaPovHand: React.FC<{
  mode: "phone" | "pen"; screen?: React.ReactNode; x?: number; y?: number; width?: number;
}> = ({ mode, screen, x = 0, y = 0, width = 700 }) => (
  <svg viewBox="0 0 700 1000" width={width} height={width * 1000 / 700}
    style={{ position: "absolute", left: x, top: y, overflow: "visible" }} aria-label="Рука Лёхи в жёлтом рукаве">
    {mode === "phone" ? <>
      <path d="M389 988 L302 714 Q253 664 258 562 L291 400 Q301 371 322 387 L487 529 Q550 606 513 740 L594 988Z" fill={COLORS.skinShadow} />
      <path d="M361 740 L516 707 L630 1000 H388Z" fill={COLORS.courier} />
      <path d="M349 735 L515 700 L530 756 L371 794Z" fill={COLORS.courierShadow} />
      <Phone x={91} y={-10} width={425}>{screen}</Phone>
      <path d="M483 481 Q517 458 530 491 L512 653 Q505 693 476 673 Q458 659 466 625Z" fill={COLORS.skin} />
      {[0, 1, 2].map((i) => <rect key={i} x={89 - i * 3} y={425 + i * 49} width={48} height={40} rx={19} fill={COLORS.skin} />)}
    </> : <>
      <path d="M530 842 L277 500 Q250 447 291 410 L400 453 L664 754Z" fill={COLORS.courier} />
      <path d="M283 501 L259 467 L347 397 L382 438Z" fill={COLORS.courierShadow} />
      <path d="M264 469 Q220 470 202 436 L153 372 Q130 333 161 310 Q182 298 201 322 L230 353 L207 299 Q194 269 222 259 Q244 254 260 286 L301 343 Q329 372 327 413Z" fill={COLORS.skin} />
      <g transform="rotate(-24 192 340)">
        <rect x={181} y={202} width={22} height={208} rx={9} fill={COLORS.telnyashka} />
        <rect x={181} y={212} width={22} height={56} rx={5} fill={COLORS.counter} />
        <path d="M181 408 H203 L192 438Z" fill={COLORS.shoes} />
      </g>
      <ellipse cx={213} cy={355} rx={38} ry={24} transform="rotate(35 213 355)" fill={COLORS.skinShadow} />
    </>}
  </svg>
);
