"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-media-query";
import { site } from "@/config/site";

/**
 * Слово в стиле постера «FORGET»: каждая буква — сверхвысокий узкий гротеск
 * (Anton, растянутый по вертикали в SVG), стоит в своей колонке со своим
 * смещением и залита градиентом из белого в чёрный, уходящим в фон.
 * Между буквами — мелкие повёрнутые подписи. При скролле буквы плывут
 * с разной скоростью (GSAP ScrollTrigger), при reduced-motion стоят на месте.
 */

// top / height — доли высоты области, dir — куда «светит» градиент
const LAYOUT = [
  { top: 0.0, height: 0.66, dir: "down", speed: -18 },
  { top: 0.34, height: 0.66, dir: "up", speed: 14 },
  { top: 0.1, height: 0.54, dir: "down", speed: -8 },
  { top: 0.42, height: 0.58, dir: "up", speed: 20 },
  { top: 0.0, height: 0.72, dir: "down", speed: -14 },
  { top: 0.28, height: 0.6, dir: "up", speed: 10 },
] as const;

// Мелкие подписи, как служебный текст на постере
const CAPTIONS = [
  { text: `${site.name}, 16\nвеб-дизайнер`, left: "15.5%", top: "70%" },
  { text: "Лендинги\nи сайты", left: "49.5%", top: "18%" },
  { text: "Под задачу,\nне из шаблона", left: "82.5%", top: "8%" },
  { text: `Telegram\n@${site.telegram.username}`, left: "66%", top: "88%" },
];

export function PosterName({ text }: { text: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const letters = Array.from(text.toUpperCase());
  const col = 100 / letters.length;

  useEffect(() => {
    if (reduced || !root.current) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !root.current) return;
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-letter]").forEach((el) => {
          gsap.to(el, {
            yPercent: Number(el.dataset.speed),
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          });
        });
      }, root);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <div ref={root} className="absolute inset-0">
      <h1 id="hero-title" className="sr-only">
        {text}
      </h1>
      {letters.map((ch, i) => {
        const l = LAYOUT[i % LAYOUT.length];
        const id = `poster-g-${i}`;
        const light = l.dir === "down";
        return (
          <div
            key={i}
            data-letter
            data-speed={l.speed}
            aria-hidden
            className="poster-letter absolute"
            style={{
              left: `${i * col - 0.6}%`,
              width: `${col + 1.2}%`,
              top: `${l.top * 100}%`,
              height: `${l.height * 100}%`,
              ["--i" as string]: i,
            }}
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full overflow-visible">
              <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={light ? "#f5f5f3" : "#000"} />
                  <stop offset="0.55" stopColor={light ? "#9a9a98" : "#3c3c3b"} />
                  <stop offset="1" stopColor={light ? "#000" : "#f5f5f3"} />
                </linearGradient>
              </defs>
              <text
                x="0"
                y="100"
                textLength="100"
                lengthAdjust="spacingAndGlyphs"
                fill={`url(#${id})`}
                style={{ fontFamily: "var(--font-poster)", fontSize: 136 }}
              >
                {ch}
              </text>
            </svg>
          </div>
        );
      })}
      {CAPTIONS.map((c) => (
        <p
          key={c.text}
          aria-hidden
          className="fade-up absolute hidden origin-top-left -rotate-90 text-[0.6rem] leading-tight font-semibold whitespace-pre text-[#f5f5f3]/80 sm:block"
          style={{ left: c.left, top: c.top, ["--d" as string]: "1.4s" }}
        >
          {c.text}
        </p>
      ))}
    </div>
  );
}
