/**
 * Имя в стиле брутализма (по мотивам заголовка usbynight.be): тяжёлый гротеск,
 * растянутый по горизонтали от края до края, — внутрибуквенные просветы
 * превращаются в узкие щели. Текст рисуется в SVG и растягивается через
 * textLength; одинаковая обводка скругляет углы и делает буквы ещё плотнее.
 * На узких экранах имя ломается на две строки, чтобы буквы не стали нитками.
 */
const INK = "#efece4";

function Line({ text, ratio }: { text: string; ratio: number }) {
  // ratio — ширина к высоте строки; высота кэпа ≈ 0.72em у Geist
  const w = 1000;
  const h = Math.round(w / ratio);
  const size = h / 0.72;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="block h-auto w-full overflow-visible"
      aria-hidden
      focusable="false"
    >
      <text
        x="0"
        y={h}
        textLength={w}
        lengthAdjust="spacingAndGlyphs"
        fill={INK}
        stroke={INK}
        strokeWidth={size * 0.035}
        strokeLinejoin="round"
        style={{ fontFamily: "var(--font-geist)", fontWeight: 900, fontSize: size, letterSpacing: "-0.02em" }}
      >
        {text}
      </text>
    </svg>
  );
}

export function BrutalName({ text }: { text: string }) {
  const upper = text.toUpperCase();
  const mid = Math.ceil(upper.length / 2);
  return (
    <h1 id="hero-title" className="name-rise w-full">
      <span className="sr-only">{text}</span>
      <span className="hidden md:block">
        <Line text={upper} ratio={7.2} />
      </span>
      <span className="flex flex-col gap-[2.2vw] md:hidden">
        <Line text={upper.slice(0, mid)} ratio={3.6} />
        <Line text={upper.slice(mid)} ratio={3.6} />
      </span>
    </h1>
  );
}
