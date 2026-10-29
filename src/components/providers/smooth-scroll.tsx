"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { setLenis, getLenis } from "@/lib/lenis";
import { useReducedMotion } from "@/hooks/use-media-query";

export function SmoothScroll() {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -16 }, autoRaf: true });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  // Новая страница начинается сверху (кроме переходов на якорь).
  useEffect(() => {
    if (window.location.hash) return;
    getLenis()?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
