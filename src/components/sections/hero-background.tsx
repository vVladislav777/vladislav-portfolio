"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

// Three.js-шейдер «старого телевизора» грузится отдельным чанком: сразу после
// загрузки страницы (в простое браузера) или раньше — при первом взаимодействии.
const PolishedShader = dynamic(() => import("@/components/ui/old-television-shader"), { ssr: false });

const EVENTS = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;

export function HeroBackground() {
  const reduced = useReducedMotion();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (armed) return;
    const arm = () => setArmed(true);
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(arm, { timeout: 1500 })
      : window.setTimeout(arm, 800);
    EVENTS.forEach((e) => window.addEventListener(e, arm, { once: true, passive: true }));
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      EVENTS.forEach((e) => window.removeEventListener(e, arm));
    };
  }, [armed]);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Светлая подложка: видна до запуска шейдера и при reduced-motion */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,#ffffff,#e9e9e7_70%,#d6d6d3)]" />
      {armed && !reduced && (
        <div className="absolute inset-0 animate-[fade-in_1.8s_ease_both]">
          <PolishedShader />
        </div>
      )}
      {/* Белая вуаль: шейдер остаётся живым ч/б фоном, а чёрное название читается */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_45%,rgb(255_255_255/0.86),rgb(255_255_255/0.55)_70%,rgb(255_255_255/0.35))]" />
    </div>
  );
}
