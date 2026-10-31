"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

// Three.js-шейдер «старого телевизора» весит много, поэтому грузится отдельным
// чанком только после первого взаимодействия (мышь, касание, скролл, клавиша).
const PolishedShader = dynamic(() => import("@/components/ui/old-television-shader"), { ssr: false });

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
      {/* Статичная подложка: тёмный ч/б градиент до запуска шейдера и при reduced-motion */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,#3a3a3a,#141414_65%,#000)]" />
      {armed && !reduced && (
        <div className="absolute inset-0 animate-[fade-in_1.8s_ease_both]">
          <PolishedShader />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
