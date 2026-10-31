import { TLink } from "@/components/ui/t-link";
import { site, telegramLink } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 pt-10 pb-28 text-sm text-muted md:flex-row md:pb-32 md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Цена договорная.
        </p>
        <ul className="flex flex-wrap gap-6">
          <li>
            <TLink href="/#works" className="link-underline hover:text-fg">
              Работы
            </TLink>
          </li>
          <li>
            <a href={telegramLink()} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">
              Telegram
            </a>
          </li>
          <li>
            <a href={site.channel.url} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">
              Канал
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
