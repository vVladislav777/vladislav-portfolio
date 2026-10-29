"use client";

import { useRef } from "react";
import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Бегущая строка, скорость и направление которой зависят от скорости скролла.
 * Идея — «Scroll Based Velocity» (magicui) из каталога 21st.dev; код свой,
 * приведён к токенам сайта и уважает prefers-reduced-motion.
 */
export function VelocityMarquee({
  items,
  baseVelocity = 2,
  className,
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const row = (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center gap-[0.6em] pr-[0.6em]">
          <span>{item}</span>
          <span className="inline-block size-[0.28em] rotate-45 bg-accent" />
        </span>
      ))}
    </>
  );

  return (
    <div ref={ref} className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <span className="sr-only">{items.join(", ")}</span>
      <m.div aria-hidden className="flex flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex">
            {row}
          </span>
        ))}
      </m.div>
    </div>
  );
}
