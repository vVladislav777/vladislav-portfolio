"use client";

import { usePathname, useRouter } from "next/navigation";
import { MetallicButton } from "@/components/ui/metallic-button";
import { Magnetic } from "@/components/ui/magnetic";
import { scrollToTarget } from "@/lib/lenis";
import { cn } from "@/lib/utils";

/** Ширина металлической кнопки под длину русской подписи. */
export const metallicWidth = (label: string) => Math.max(142, Math.round(label.length * 7.6 + 52));

type Props = {
  href: string;
  children: string;
  className?: string;
  external?: boolean;
  magnetic?: boolean;
  cursor?: string;
};

/**
 * Кнопка-ссылка на базе MetallicButton (21st.dev): внешние ссылки открываются
 * в новой вкладке, якоря на главной прокручиваются Lenis, страницы — с переходом.
 */
export function ButtonLink({ href, children, className, external, magnetic = true, cursor }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const go = () => {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (href.startsWith("/#") && pathname === "/") {
      window.history.replaceState(null, "", href.slice(1));
      scrollToTarget(href.slice(1));
    } else if (href.startsWith("/")) {
      router.push(href, { transitionTypes: href.includes("#") ? undefined : ["page"] });
    }
  };

  const el = (
    <div
      data-cursor={cursor}
      className={cn(
        "rounded-full has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-4 has-[button:focus-visible]:outline-fg",
        className,
      )}
    >
      <MetallicButton label={children} width={metallicWidth(children)} onClick={go} />
    </div>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
