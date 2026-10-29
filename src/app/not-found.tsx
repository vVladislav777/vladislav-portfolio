import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-svh flex-col items-center justify-center text-center">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="mt-6 font-display text-[clamp(4rem,20vw,14rem)] leading-none font-bold tracking-[-0.04em]">
        404
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">Такой страницы нет. Зато есть другие работы.</p>
      <div className="mt-10">
        <ButtonLink href="/">На главную</ButtonLink>
      </div>
    </section>
  );
}
