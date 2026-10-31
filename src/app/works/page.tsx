import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/page-transition";
import { WorksExplorer } from "@/components/works/works-explorer";
import { LetsTalk } from "@/components/sections/lets-talk";
import { Footer } from "@/components/layout/footer";
import { works } from "@/data/works";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Работы",
  description: "Все проекты Владислава: лендинги, многостраничные сайты и магазины с анимациями и адаптивом.",
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return (
    <PageTransition>
      <section className="relative isolate overflow-hidden pt-36 pb-16 md:pt-44">
        <div aria-hidden className="dots-field absolute inset-0 -z-10" />
        <div className="container-x">
          <p className="eyebrow fade-up" style={{ "--d": "0.1s" } as React.CSSProperties}>
            <span className="text-accent">(01)</span> Портфолио
          </p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h1 className="brutal fade-up text-[clamp(3.4rem,14vw,13rem)]" style={{ "--d": "0.2s" } as React.CSSProperties}>
              Работы
            </h1>
            <p
              className="brutal fade-up text-[clamp(3.4rem,14vw,13rem)] opacity-40"
              style={{ "--d": "0.3s" } as React.CSSProperties}
              aria-label={`${works.length} проектов`}
            >
              {pad(works.length)}
            </p>
          </div>
        </div>
      </section>
      <WorksExplorer />
      <LetsTalk />
      <Footer />
    </PageTransition>
  );
}
