import { ViewTransition } from "react";

/**
 * Обёртка каждой страницы: при навигации с типом "page" старая страница
 * отъезжает вглубь, новая раскрывается маской снизу вверх.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ page: "page-in", default: "none" }}
      exit={{ page: "page-out", default: "none" }}
      default="none"
    >
      <div>{children}</div>
    </ViewTransition>
  );
}
