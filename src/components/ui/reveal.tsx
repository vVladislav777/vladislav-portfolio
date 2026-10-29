"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Плавное появление блока при попадании в экран. */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </m.div>
  );
}

/**
 * Заголовок, разобранный на слова: каждое слово выезжает из-под маски.
 * Для скринридеров текст читается целиком через aria-label.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  const MotionTag = m[Tag];
  return (
    <MotionTag
      aria-label={text}
      className={cn("text-balance", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <m.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease } },
            }}
          >
            {word}
          </m.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </MotionTag>
  );
}
