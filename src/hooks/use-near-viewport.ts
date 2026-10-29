"use client";

import { useEffect, useState, type RefObject } from "react";

/** true, когда элемент оказался в пределах экрана + запас; дальше не сбрасывается. */
export function useNearViewport(ref: RefObject<Element | null>, margin = "50% 0px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}
