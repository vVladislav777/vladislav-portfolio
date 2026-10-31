"use client";

import { useId } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

/**
 * Название в стиле постера «CHAOS»: чёрные буквы, разведённые крупными
 * волнами, с «чернильными» размытыми краями и горизонтальным смазом.
 * Всё делает SVG-фильтр: шум → смещение → размытие → порог «чернил» →
 * мягкий край + смаз. Волны медленно «дышат»; при reduced-motion — статика.
 */
export function ChaosName({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const filter = `chaos-${id}`;

  return (
    <h1 id="hero-title" className="chaos-in w-full">
      <span className="sr-only">{text}</span>
      <svg viewBox="0 0 1000 260" className="block h-auto w-full overflow-visible" aria-hidden focusable="false">
        <defs>
          <filter id={filter} x="-15%" y="-60%" width="130%" height="220%" colorInterpolationFilters="sRGB">
            {/* Крупные тягучие волны: очень низкая частота по X */}
            <feTurbulence type="fractalNoise" baseFrequency="0.0026 0.0085" numOctaves="2" seed="19" result="noise">
              {!reduced && (
                <animate
                  attributeName="baseFrequency"
                  dur="16s"
                  values="0.0026 0.0085;0.0034 0.011;0.0022 0.0072;0.0026 0.0085"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="130" xChannelSelector="R" yChannelSelector="G" result="warp">
              {!reduced && <animate attributeName="scale" dur="10s" values="130;160;110;130" repeatCount="indefinite" />}
            </feDisplacementMap>
            {/* «Чернила»: размываем и снова поджимаем альфу — края становятся жидкими */}
            <feGaussianBlur in="warp" stdDeviation="3" result="soft" />
            <feComponentTransfer in="soft" result="ink">
              <feFuncA type="table" tableValues="0 0 0.4 0.95 1 1" />
            </feComponentTransfer>
            <feGaussianBlur in="ink" stdDeviation="1.2" result="sharp" />
            {/* Пятнистый расфокус: второй шум решает, где буквы резкие, а где «плывут» */}
            <feGaussianBlur in="ink" stdDeviation="11 6" result="blurry" />
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="1" seed="3" result="maskNoise" />
            <feColorMatrix
              in="maskNoise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4 0 0 0 -1.6"
              result="mask"
            />
            <feComposite in="blurry" in2="mask" operator="in" result="blurPart" />
            <feComposite in="sharp" in2="mask" operator="out" result="sharpPart" />
            {/* Горизонтальный смаз-ореол под всем словом */}
            <feGaussianBlur in="ink" stdDeviation="16 2" result="streak" />
            <feComponentTransfer in="streak" result="streakFaint">
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="streakFaint" />
              <feMergeNode in="blurPart" />
              <feMergeNode in="sharpPart" />
            </feMerge>
          </filter>
        </defs>
        <text
          x="40"
          y="195"
          textLength="920"
          lengthAdjust="spacingAndGlyphs"
          fill="#0a0a0a"
          filter={`url(#${filter})`}
          style={{ fontFamily: "var(--font-geist)", fontWeight: 700, fontSize: 175, letterSpacing: "-0.02em" }}
        >
          {text.toUpperCase()}
        </text>
      </svg>
    </h1>
  );
}
