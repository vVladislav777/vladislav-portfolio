import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PageTransition } from "@/components/ui/page-transition";
import { Reveal, SplitText } from "@/components/ui/reveal";
import { TLink } from "@/components/ui/t-link";
import { ButtonLink } from "@/components/ui/button";
import { ParallaxImage } from "@/components/works/parallax-image";
import { Footer } from "@/components/layout/footer";
import { getWork, nextWork, workImage, works } from "@/data/works";
import { telegramLink } from "@/config/site";
import { pad } from "@/lib/utils";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: work.title,
    description: `${work.kind}. ${work.excerpt}`,
    alternates: { canonical: `/works/${work.slug}` },
    openGraph: { images: [workImage(work.slug, "cover")] },
  };
}

export default async function CasePage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();
  const index = works.findIndex((w) => w.slug === slug);
  const next = nextWork(slug);

  const meta = [
    { k: "Тип", v: work.type },
    { k: "Задача", v: work.kind },
    { k: "Год", v: String(work.year) },
    { k: "Технологии", v: work.stack.join(", ") },
  ];

  return (
    <PageTransition>
      <article>
        <header className="container-x pt-32 md:pt-40">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TLink href="/works" className="eyebrow link-underline hover:text-fg">
              ← Все работы
            </TLink>
            <p className="eyebrow tabular-nums">
              <span className="text-accent">{pad(index + 1)}</span> / {pad(works.length)}
            </p>
          </div>
          <SplitText
            as="h1"
            text={work.title}
            className="mt-10 font-display text-[clamp(2.4rem,9vw,9rem)] leading-[0.95] font-bold tracking-[-0.04em]"
          />
          <p className="fade-up mt-6 max-w-2xl text-lg text-muted md:text-xl" style={{ "--d": "0.4s" } as React.CSSProperties}>
            {work.excerpt}
          </p>
        </header>

        <div className="container-x mt-12 md:mt-16">
          <ViewTransition name={`cover-${work.slug}`} share="morph" default="none">
            <div className="relative aspect-[16/11] overflow-hidden rounded-card bg-surface">
              <Image
                src={workImage(work.slug, "cover")}
                alt={`${work.title}: главный экран сайта`}
                fill
                fetchPriority="high"
                loading="eager"
                sizes="(min-width: 1600px) 1520px, 100vw"
                className="object-cover"
              />
            </div>
          </ViewTransition>
        </div>

        <section aria-label="О проекте" className="container-x section-y grid gap-16 md:grid-cols-12">
          <div className="grid content-start gap-6 md:col-span-4">
            <dl className="grid gap-6">
              {meta.map((m) => (
                <div key={m.k} className="border-t border-line pt-4">
                  <dt className="eyebrow">{m.k}</dt>
                  <dd className="mt-2 text-lg">{m.v}</dd>
                </div>
              ))}
            </dl>
            <div className="pt-4">
              <ButtonLink href={work.url} variant="ghost" cursor="Скоро">
                Открыть сайт
              </ButtonLink>
              <p className="mt-3 text-xs text-muted">Ссылка появится после публикации проекта.</p>
            </div>
          </div>

          <div className="space-y-16 md:col-span-8">
            <Reveal>
              <h2 className="eyebrow"><span className="text-accent">(01)</span> Задача</h2>
              <p className="mt-6 font-display text-[clamp(1.4rem,3vw,2.4rem)] leading-snug font-medium">
                {work.task}
              </p>
            </Reveal>
            <Reveal>
              <h2 className="eyebrow"><span className="text-accent">(02)</span> Решение</h2>
              <ol className="mt-6 space-y-6">
                {work.solution.map((s, i) => (
                  <li key={s} className="flex gap-5 border-t border-line pt-6 text-lg text-fg/90">
                    <span className="font-display text-sm text-accent">{pad(i + 1)}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <h2 className="eyebrow"><span className="text-accent">(03)</span> Результат</h2>
              <p className="mt-6 text-xl">{work.result}</p>
            </Reveal>
          </div>
        </section>

        <section aria-label="Галерея" className="container-x grid gap-6 md:grid-cols-2">
          <ParallaxImage
            src={workImage(work.slug, 1)}
            alt={`${work.title}: каталог и сетка карточек`}
            className="md:col-span-2"
          />
          <ParallaxImage src={workImage(work.slug, 2)} alt={`${work.title}: экран с описанием`} />
          <ParallaxImage src={workImage(work.slug, "alt")} alt={`${work.title}: мобильная версия`} />
          <ParallaxImage
            src={workImage(work.slug, 3)}
            alt={`${work.title}: адаптивная сетка`}
            className="md:col-span-2"
          />
        </section>

        <section aria-label="Следующий кейс" className="section-y">
          <TLink
            href={`/works/${next.slug}`}
            data-cursor="Далее"
            className="group container-x block"
          >
            <p className="eyebrow">Следующий кейс</p>
            <div className="mt-6 flex items-end justify-between gap-6 border-b border-line pb-8 transition-colors duration-500 group-hover:border-accent">
              <span className="font-display text-[clamp(2.2rem,8vw,8rem)] leading-[0.95] font-bold tracking-[-0.04em] transition-colors duration-500 group-hover:text-accent">
                {next.title}
              </span>
              <svg
                width="56"
                height="56"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
                className="mb-2 hidden shrink-0 transition-transform duration-500 group-hover:rotate-45 sm:block"
              >
                <path d="M3 13 13 3M5 3h8v8" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <p className="mt-4 text-muted">{next.kind}</p>
          </TLink>
          <div className="container-x mt-16 flex flex-wrap gap-3">
            <ButtonLink href={telegramLink(`Здравствуйте! Посмотрел кейс «${work.title}». Хочу похожий сайт.`)} external>
              Хочу похожий сайт
            </ButtonLink>
          </div>
        </section>
      </article>
      <Footer />
    </PageTransition>
  );
}
