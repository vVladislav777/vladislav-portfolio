import QRCode from "qrcode";
import { telegramLink, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { ChaosName } from "@/components/sections/chaos-name";
import { HeroBackground } from "@/components/sections/hero-background";

/**
 * Первый экран как постер «CHAOS»: белый лист, жидкое размытое название
 * по центру, словарная подпись курсивом и QR-код в углу (ведёт в Telegram).
 */
export async function Hero() {
  const qr = await QRCode.toString(site.telegram.url, {
    type: "svg",
    margin: 0,
    color: { dark: "#0a0a0a", light: "#ffffff00" },
  });

  return (
    <section
      aria-labelledby="hero-title"
      className="theme-light relative isolate flex h-svh min-h-[620px] flex-col overflow-hidden"
    >
      <HeroBackground />

      <a
        href={telegramLink()}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Telegram"
        aria-label="QR-код и ссылка на Telegram"
        className="fade-up absolute top-16 right-[var(--gutter)] flex w-20 flex-col items-center gap-1.5 md:top-20 md:w-28"
        style={{ "--d": "1.2s" } as React.CSSProperties}
      >
        <span className="outline-word text-lg leading-none md:text-2xl">telegram</span>
        <span className="block w-full [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: qr }} />
      </a>

      <div className="container-x flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-6xl">
          <ChaosName text={site.brand} />
        </div>
        <p
          className="fade-up mt-2 text-center font-[family-name:var(--font-tinos)] text-lg leading-snug text-[#111] italic md:text-xl"
          style={{ "--d": "1s" } as React.CSSProperties}
        >
          /{site.brand.toLowerCase()}/
          <br />
          сайты, которые цепляют и приносят заявки.
        </p>
      </div>

      <div
        className="fade-up container-x flex flex-wrap items-center justify-center gap-3 pb-24 md:pb-28"
        style={{ "--d": "1.3s" } as React.CSSProperties}
      >
        <ButtonLink href="/#works" cursor="Работы">
          Мои работы
        </ButtonLink>
        <ButtonLink href={telegramLink()} external cursor="Telegram">
          Написать в Telegram
        </ButtonLink>
      </div>
    </section>
  );
}
