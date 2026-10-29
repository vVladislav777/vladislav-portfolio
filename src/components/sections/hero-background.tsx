"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

// WebGL-шейдер грузится отдельным чанком только после первого взаимодействия
// (движение мыши, касание, скролл, клавиша): первая загрузка остаётся лёгкой.
const ShaderBackground = dynamic(
  () => import("@/components/ui/halftone-dots-led-screen").then((m) => m.ShaderBackground),
  { ssr: false },
);

const EVENTS = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;

export function HeroBackground() {
  const reduced = useReducedMotion();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (armed) return;
    const arm = () => setArmed(true);
    EVENTS.forEach((e) => window.addEventListener(e, arm, { once: true, passive: true }));
    return () => EVENTS.forEach((e) => window.removeEventListener(e, arm));
  }, [armed]);

  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {/* Статичная подложка: видна до запуска шейдера и при reduced-motion */}
      <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.10)_1.2px,transparent_1.6px)] [background-size:18px_18px]" />
      {armed && !reduced && (
        <div className="absolute inset-0 animate-[fade-in_1.6s_ease_both] opacity-45">
          <ShaderBackground className="absolute inset-0" />
        </div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_50%,rgb(17_17_17/0.88),rgb(17_17_17/0.35)_70%,rgb(17_17_17/0.9))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
