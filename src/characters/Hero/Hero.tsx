// Главный герой (временный образ, пока не утвердили концепцию).
// Персонаж собран из частей: каждая часть управляется через props,
// поэтому серии только задают позу/эмоцию, а не перерисовывают героя.
import React from "react";
import { COLORS } from "../../config/video";

export type Expression = "neutral" | "happy" | "sad" | "surprised" | "angry";

export type HeroProps = {
  /** Открытость рта 0..1 (из mouthFlap или useMouthFromAudio) */
  mouthOpen?: number;
  /** Открытость глаз 0..1 (из blink) */
  eyesOpen?: number;
  /** Эмоция: брови и форма закрытого рта */
  expression?: Expression;
  /** Подъём левой руки (слева на экране) наружу, в градусах. 0 — опущена */
  armLeft?: number;
  /** Подъём правой руки наружу, в градусах */
  armRight?: number;
  /** Куда смотрят зрачки: -1 влево … 1 вправо */
  lookX?: number;
  /** Наклон головы в градусах */
  headTilt?: number;
  /** Вертикальное смещение тела (дыхание), px */
  bob?: number;
  /** Ширина персонажа на экране, px. Высота считается автоматически */
  width?: number;
  style?: React.CSSProperties;
};

// Размер «холста» персонажа
const W = 600;
const H = 1100;
export const HERO_ASPECT = H / W;

const BROWS: Record<Expression, { dy: number; inner: number }> = {
  neutral: { dy: 0, inner: 0 },
  happy: { dy: -8, inner: -4 },
  sad: { dy: -4, inner: -16 },
  surprised: { dy: -22, inner: 0 },
  angry: { dy: 6, inner: 14 },
};

const Arm: React.FC<{ sx: number; sy: number; angle: number }> = ({ sx, sy, angle }) => (
  <g transform={`rotate(${angle} ${sx} ${sy})`}>
    <rect x={sx - 36} y={sy - 24} width={72} height={270} rx={36} fill={COLORS.hoodie} />
    <rect x={sx - 36} y={sy + 200} width={72} height={30} fill={COLORS.hoodieShadow} />
    <circle cx={sx} cy={sy + 262} r={38} fill={COLORS.skin} />
  </g>
);

export const Hero: React.FC<HeroProps> = ({
  mouthOpen = 0,
  eyesOpen = 1,
  expression = "neutral",
  armLeft = 0,
  armRight = 0,
  lookX = 0,
  headTilt = 0,
  bob = 0,
  width = 600,
  style,
}) => {
  const brow = BROWS[expression];
  const eyeRy = Math.max(2, 30 * eyesOpen);
  const pupilShift = lookX * 10;

  const closedMouth = () => {
    switch (expression) {
      case "happy":
        return <path d="M262 342 Q300 378 338 342" stroke={COLORS.mouth} strokeWidth={9} fill="none" strokeLinecap="round" />;
      case "sad":
        return <path d="M268 362 Q300 336 332 362" stroke={COLORS.mouth} strokeWidth={9} fill="none" strokeLinecap="round" />;
      case "surprised":
        return <ellipse cx={300} cy={352} rx={14} ry={18} fill={COLORS.mouth} />;
      case "angry":
        return <path d="M268 356 L332 352" stroke={COLORS.mouth} strokeWidth={9} strokeLinecap="round" />;
      default:
        return <path d="M272 350 Q300 360 328 350" stroke={COLORS.mouth} strokeWidth={9} fill="none" strokeLinecap="round" />;
    }
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={width * HERO_ASPECT}
      style={{ overflow: "visible", ...style }}
    >
      {/* Ноги и обувь */}
      <rect x={200} y={760} width={90} height={290} rx={20} fill={COLORS.pants} />
      <rect x={310} y={760} width={90} height={290} rx={20} fill={COLORS.pants} />
      <ellipse cx={240} cy={1062} rx={72} ry={30} fill={COLORS.shoes} />
      <ellipse cx={360} cy={1062} rx={72} ry={30} fill={COLORS.shoes} />

      {/* Всё, что выше пояса, «дышит» */}
      <g transform={`translate(0 ${bob})`}>
        {/* Шея */}
        <rect x={262} y={360} width={76} height={80} fill={COLORS.skinShadow} />

        {/* Худи */}
        <path
          d="M150 470 Q150 420 210 420 L390 420 Q450 420 450 470 L468 790 Q468 812 446 812 L154 812 Q132 812 132 790 Z"
          fill={COLORS.hoodie}
        />
        <path d="M215 425 Q300 500 385 425" stroke={COLORS.hoodieShadow} strokeWidth={22} fill="none" strokeLinecap="round" />
        <line x1={272} y1={462} x2={268} y2={560} stroke={COLORS.paper} strokeWidth={8} strokeLinecap="round" />
        <line x1={328} y1={462} x2={332} y2={560} stroke={COLORS.paper} strokeWidth={8} strokeLinecap="round" />
        <rect x={205} y={640} width={190} height={110} rx={26} fill={COLORS.hoodieShadow} />

        {/* Руки (поверх туловища) */}
        <Arm sx={165} sy={470} angle={armLeft} />
        <Arm sx={435} sy={470} angle={-armRight} />

        {/* Голова */}
        <g transform={`rotate(${headTilt} 300 380)`}>
          <circle cx={168} cy={262} r={30} fill={COLORS.skinShadow} />
          <circle cx={432} cy={262} r={30} fill={COLORS.skinShadow} />
          <ellipse cx={300} cy={250} rx={135} ry={150} fill={COLORS.skin} />

          {/* Щетина */}
          <path d="M190 300 Q300 430 410 300 Q410 360 300 400 Q190 360 190 300 Z" fill={COLORS.skinShadow} opacity={0.55} />

          {/* Волосы: взъерошенная чёлка */}
          <path
            d="M162 230 Q150 110 250 95 Q300 60 360 92 Q450 105 440 230 Q420 170 385 160 L392 200 Q350 150 320 165 L318 135 Q285 170 245 160 L250 195 Q205 160 185 200 Z"
            fill={COLORS.hair}
          />

          {/* Брови */}
          <g transform={`translate(0 ${brow.dy})`}>
            <rect x={218} y={196} width={64} height={14} rx={7} fill={COLORS.hair} transform={`rotate(${brow.inner} 282 203)`} />
            <rect x={318} y={196} width={64} height={14} rx={7} fill={COLORS.hair} transform={`rotate(${-brow.inner} 318 203)`} />
          </g>

          {/* Глаза */}
          <ellipse cx={250} cy={252} rx={30} ry={eyeRy} fill={COLORS.eyeWhite} />
          <ellipse cx={350} cy={252} rx={30} ry={eyeRy} fill={COLORS.eyeWhite} />
          {eyesOpen > 0.3 && (
            <>
              <circle cx={250 + pupilShift} cy={256} r={13} fill={COLORS.pupil} />
              <circle cx={350 + pupilShift} cy={256} r={13} fill={COLORS.pupil} />
            </>
          )}

          {/* Нос */}
          <ellipse cx={300} cy={304} rx={20} ry={15} fill={COLORS.skinShadow} />

          {/* Рот */}
          {mouthOpen > 0.06 ? (
            <ellipse cx={300} cy={352} rx={30} ry={5 + 30 * mouthOpen} fill={COLORS.mouth} />
          ) : (
            closedMouth()
          )}
        </g>
      </g>
    </svg>
  );
};
