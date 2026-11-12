// Контакты и публичные данные сайта в одном месте.
export const site = {
  /** Бренд-имя на главном экране и в логотипе */
  brand: "Viberg",
  name: "Владислав",
  role: "веб-дизайнер и разработчик сайтов",
  title: "Viberg — разработка сайтов для бизнеса",
  url: "https://vvladislav777.github.io/vladislav-portfolio",
  telegram: {
    username: "V_viberg0",
    get url() {
      return `https://t.me/${this.username}`;
    },
  },
  channel: {
    url: "https://t.me/vladweb_lending_0",
    label: "t.me/vladweb_lending_0",
  },
  description:
    "Разработка лендингов от 10 000 ₽, многостраничных сайтов и редизайн. Дизайн, адаптив и запуск под задачу бизнеса. Посмотрите работы Viberg и обсудите проект с Владом.",
} as const;

export function telegramLink(text?: string) {
  const base = site.telegram.url;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
