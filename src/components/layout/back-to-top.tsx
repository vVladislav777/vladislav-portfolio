"use client";

import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { scrollToTarget } from "@/lib/lenis";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 900));

  return (
    <AnimatePresence>
      {show && (
        <m.button
          type="button"
          aria-label="Наверх"
          onClick={() => {
            scrollToTarget(0);
            document.getElementById("main")?.focus({ preventScroll: true });
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="glass fixed right-4 bottom-24 z-[80] grid size-12 place-items-center rounded-full text-fg transition-transform hover:scale-110 md:right-8 md:bottom-8"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </m.button>
      )}
    </AnimatePresence>
  );
}
