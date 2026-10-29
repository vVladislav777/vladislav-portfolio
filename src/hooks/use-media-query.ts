"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)", true);

/** Точный указатель с наведением (мышь/тачпад) и без reduced-motion. */
export const useFinePointer = () =>
  useMediaQuery(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
