import type Lenis from "lenis";

type Listener = (lenis: Lenis | null) => void;

let instance: Lenis | null = null;
const listeners = new Set<Listener>();

export function setLenis(next: Lenis | null) {
  instance = next;
  listeners.forEach((fn) => fn(next));
}

export function getLenis() {
  return instance;
}

export function onLenis(fn: Listener) {
  listeners.add(fn);
  fn(instance);
  return () => {
    listeners.delete(fn);
  };
}

/** Плавно прокрутить к якорю или к началу; без Lenis — нативно. */
export function scrollToTarget(target: string | number) {
  if (instance) {
    instance.scrollTo(target, { duration: 1.4 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
  } else {
    document.querySelector(target)?.scrollIntoView();
  }
}
