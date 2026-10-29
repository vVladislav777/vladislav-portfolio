"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type Hover = { label: string | null; active: boolean };

/**
 * Точка + кольцо. Кольцо догоняет с пружиной, на ссылках растёт,
 * на элементах с data-cursor="Подпись" превращается в плашку с текстом.
 * На сенсорных устройствах и при reduced-motion не рендерится.
 */
export function Cursor() {
  const enabled = useFinePointer();
  if (!enabled) return null;
  return <CursorInner />;
}

function CursorInner() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const [hover, setHover] = useState<Hover>({ label: null, active: false });
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const el = e.target as Element | null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setHover({ label: labelled.dataset.cursor || null, active: true });
        return;
      }
      const interactive = el?.closest("a, button, [role='button'], label, summary");
      setHover({ label: null, active: Boolean(interactive) });
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    root.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  const labelled = Boolean(hover.label);
  const size = labelled ? 104 : hover.active ? 64 : 36;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <m.div
        className={cn(
          "absolute top-0 left-0 flex items-center justify-center rounded-full",
          !labelled && "border border-white mix-blend-difference",
        )}
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.85 : 1,
          backgroundColor: labelled
            ? "rgba(255, 90, 31, 1)"
            : hover.active
              ? "rgba(255, 255, 255, 1)"
              : "rgba(255, 255, 255, 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <AnimatePresence>
          {labelled && (
            <m.span
              key={hover.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[0.7rem] font-semibold tracking-[0.14em] text-accent-fg uppercase"
            >
              {hover.label}
            </m.span>
          )}
        </AnimatePresence>
      </m.div>
      <m.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !labelled ? 1 : 0 }}
      />
    </div>
  );
}
