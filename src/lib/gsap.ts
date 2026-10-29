import { onLenis } from "@/lib/lenis";

let ready: Promise<typeof import("gsap")> | null = null;

/**
 * GSAP + ScrollTrigger грузятся отдельным чанком только там, где есть
 * скролл-сцены, и синхронизируются с Lenis.
 */
export function loadGsap() {
  if (!ready) {
    ready = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([mod, st]) => {
        mod.gsap.registerPlugin(st.ScrollTrigger);
        onLenis((lenis) => {
          lenis?.on("scroll", st.ScrollTrigger.update);
        });
        return mod;
      },
    );
  }
  return ready;
}
