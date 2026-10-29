"use client";

import { useEffect, useRef } from "react";
import { useFinePointer } from "@/hooks/use-media-query";

const MIN_W = 250;
const MAX_W = 900;
const BASE_W = 800;

/**
 * Огромное имя по буквам. Каждая буква выезжает из-под маски (CSS),
 * а рядом с курсором меняет начертание, приподнимается и наклоняется.
 * Ширина каждой буквы зарезервирована невидимой копией максимальной жирности,
 * поэтому смена веса не двигает соседей (без скачков макета).
 */
export function HeroName({ text }: { text: string }) {
  const fine = useFinePointer();
  const letters = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!fine) return;
    let raf = 0;
    let px = -9999;
    let py = -9999;
    const current = letters.current.map(() => ({ w: BASE_W, y: 0, s: 0 }));

    const tick = () => {
      raf = 0;
      let moving = false;
      letters.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = px - cx;
        const dist = Math.hypot(dx, py - cy);
        const radius = r.height * 1.6;
        const k = Math.max(0, 1 - dist / radius);
        const ease = k * k * (3 - 2 * k);

        const target = {
          w: BASE_W - (BASE_W - MIN_W) * ease,
          y: -ease * 0.08,
          s: Math.max(-1, Math.min(1, dx / radius)) * -10 * ease,
        };
        const c = current[i];
        c.w += (target.w - c.w) * 0.18;
        c.y += (target.y - c.y) * 0.18;
        c.s += (target.s - c.s) * 0.18;
        if (Math.abs(target.w - c.w) > 0.5 || Math.abs(target.s - c.s) > 0.05) moving = true;

        el.style.fontWeight = String(Math.round(c.w));
        el.style.transform = `translate3d(0, ${c.y}em, 0) skewX(${c.s}deg)`;
        el.style.color = ease > 0.55 ? "var(--accent)" : "";
      });
      if (moving) raf = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      schedule();
    };
    const onLeave = () => {
      px = py = -9999;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", schedule);
    };
  }, [fine]);

  return (
    <h1
      id="hero-title"
      aria-label={text.charAt(0) + text.slice(1).toLowerCase()}
      className="mt-6 flex justify-center font-display leading-[0.9] tracking-[-0.03em] whitespace-nowrap select-none"
      style={{ fontSize: "clamp(2.6rem, 11.4vw, 15.5rem)", fontWeight: BASE_W }}
    >
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pt-[0.12em] pb-[0.04em]">
          <span className="hero-letter" style={{ "--i": i } as React.CSSProperties}>
            <span className="relative inline-block">
              <span className="invisible" style={{ fontWeight: MAX_W }}>
                {ch}
              </span>
              <span
                ref={(el) => {
                  letters.current[i] = el;
                }}
                className="absolute inset-0 text-center transition-colors duration-300 will-change-transform"
              >
                {ch}
              </span>
            </span>
          </span>
        </span>
      ))}
    </h1>
  );
}
