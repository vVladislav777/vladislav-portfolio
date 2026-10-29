"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-media-query";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { cn } from "@/lib/utils";

/** Картинка галереи с лёгким параллаксом (GSAP ScrollTrigger); при reduced-motion статична. */
export function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const near = useNearViewport(wrap);

  useEffect(() => {
    if (reduced || !near || !wrap.current) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !wrap.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-parallax]",
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }, wrap);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced, near]);

  return (
    <div ref={wrap} className={cn("relative aspect-[16/11] overflow-hidden rounded-card bg-surface", className)}>
      <div data-parallax className="absolute -inset-y-[10%] inset-x-0">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
    </div>
  );
}
