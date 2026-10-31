import type { Metadata, Viewport } from "next";
import { Geist, Sedgwick_Ave_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/ui/cursor";
import { Header } from "@/components/layout/header";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Рукописный маркер-тег для имени — как подпись в референсе
const marker = Sedgwick_Ave_Display({
  variable: "--font-marker-tag",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — Влад, ${site.role}`,
    template: `%s — ${site.brand}`,
  },
  description: site.description,
  keywords: ["веб-дизайнер", "разработка лендингов", "сайт под ключ", "Next.js", "анимации"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.brand,
    title: `${site.brand} — Влад, ${site.role}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${geist.variable} ${marker.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[120] rounded-full bg-accent px-5 py-3 text-accent-fg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Перейти к содержимому
        </a>
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <BackToTop />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
