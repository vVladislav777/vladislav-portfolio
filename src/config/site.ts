// Все контакты и ссылки в одном месте. Замените заглушки на реальные данные.
export const site = {
  /** Бренд-имя на главном экране и в логотипе */
  brand: "Viberg",
  name: "Владислав",
  role: "веб-дизайнер и разработчик лендингов",
  url: "https://vvladislav777.github.io/vladislav-portfolio",
  telegram: {
    username: "username",
    get url() {
      return `https://t.me/${this.username}`;
    },
  },
  channel: {
    url: "https://t.me/channel",
    label: "t.me/channel",
  },
  description:
    "Viberg — Влад, веб-дизайнер и разработчик. Делаю лендинги и многостраничные сайты с анимациями под задачу бизнеса, а не из шаблона. Цена договорная.",
} as const;

export function telegramLink(text?: string) {
  const base = site.telegram.url;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
