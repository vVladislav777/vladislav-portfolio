"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

/**
 * Короткое видео без звука поверх обложки карточки: играет, пока курсор
 * (или фокус клавиатуры) находится на карточке. Грузится только при наведении.
 */
export function CardVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest("article");
    if (!video || !card || reduced) return;
    const play = () => {
      video.preload = "auto";
      video.play().catch(() => {});
    };
    const stop = () => {
      video.pause();
      video.currentTime = 0;
    };
    card.addEventListener("pointerenter", play);
    card.addEventListener("pointerleave", stop);
    card.addEventListener("focusin", play);
    card.addEventListener("focusout", stop);
    return () => {
      card.removeEventListener("pointerenter", play);
      card.removeEventListener("pointerleave", stop);
      card.removeEventListener("focusin", play);
      card.removeEventListener("focusout", stop);
    };
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
    />
  );
}
