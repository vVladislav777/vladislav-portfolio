import { works } from "@/data/works";
import { SectionHead } from "@/components/sections/section-head";
import { WorkCard } from "@/components/works/work-card";
import { WorksCounter } from "@/components/works/works-counter";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WorksSection() {
  return (
    <section id="works" aria-label="Работы" className="section-y scroll-mt-0">
      <div className="container-x">
        <SectionHead
          n="01"
          label="Работы"
          title="Избранные проекты"
          lead="Несколько сайтов, на которых видно, как я думаю: от структуры и текста до анимаций и мелочей."
        />

        <WorksCounter total={works.length} titles={works.map((w) => w.title)}>
          <div className="mt-14 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-2 md:gap-y-24">
            {works.map((work, i) => (
              <div key={work.slug} data-work-index={i} className={cn(i % 2 === 1 && "md:mt-32")}>
                <WorkCard work={work} index={i} total={works.length} />
              </div>
            ))}
          </div>
        </WorksCounter>

        <div className="mt-20 flex justify-center">
          <ButtonLink href="/works" variant="light" cursor="Все">
            Смотреть все работы
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
