import Link from "next/link";
import type { ComponentProps } from "react";

/** Link, который запускает переход-шторку между страницами. */
export function TLink(props: ComponentProps<typeof Link>) {
  const href = typeof props.href === "string" ? props.href : "";
  const isPage = href.startsWith("/") && !href.startsWith("/#");
  return <Link transitionTypes={isPage ? ["page"] : undefined} {...props} />;
}
