"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Обёртка, которая притягивает содержимое к курсору и пружинит обратно.
 * Идея — компонент «Magnetic» (ibelick) из каталога 21st.dev, код свой.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      {children}
    </m.span>
  );
}
