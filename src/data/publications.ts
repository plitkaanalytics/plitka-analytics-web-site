/**
 * Партнерські видання й матеріали на сторонніх ресурсах — наші та про нас.
 * Джерело істини для секцій «Співпраця»: щоб додати публікацію, достатньо
 * дописати запис сюди, розмітку чіпати не треба. Порожні секції сторінка
 * просто не показує.
 */

/** Видання, з яким ми працюємо постійно. */
export interface Partner {
  /** Назва бренду так, як її пише саме видання. */
  name: string;
  /** Латинка для англійської версії; без неї лишається `name`. */
  nameEn?: string;
  /**
   * Логотип на плашці у фірмовому кольорі видання. Кольори запечені у файли:
   * svg вантажиться як `<img>`, тож `currentColor` у ньому до сторінки не
   * дотягується. Плашка підміняє назву в картці; без логотипа лишається текст.
   */
  logo?: {
    /** Вордмарк. */
    src: string;
    /** Тло плашки. */
    bg: string;
    /** Емблема ліворуч від напису, якщо видання її має. */
    mark?: string;
  };
  url: string;
  /** Материнське медіа або ключовий партнер, якщо назва сама не пояснює. */
  kicker?: { uk: string; en: string };
  desc: { uk: string; en: string };
}

/** Матеріал на сторонньому ресурсі. */
export interface ExternalPublication {
  /** `ours` — наш текст у чужому виданні; `about` — текст про нас. */
  kind: 'ours' | 'about';
  /** Назва видання для підпису рядка; збігається з `Partner.name`, якщо це партнер. */
  outlet: string;
  title: string;
  url: string;
  /** Якщо видання має англомовну версію того самого матеріалу. */
  titleEn?: string;
  urlEn?: string;
  /** Чим саме ми в матеріалі — авторство, коментар, згадка. Необов'язкове. */
  note?: { uk: string; en: string };
  /** ISO, `YYYY-MM-DD`. */
  date: string;
}

export const partners: Partner[] = [
  {
    name: 'Оборонка',
    nameEn: 'Oboronka',
    logo: { src: '/images/partners/oboronka.svg', bg: '#89f0e1' },
    url: 'https://oboronka.mezha.ua/',
    kicker: { uk: 'Mezha Media', en: 'Mezha Media' },
    desc: {
      uk: 'Видання про зброю, безпілотники та реформу оборонної промисловості.',
      en: 'A Ukrainian outlet covering weapons, drones and defence-industry reform.',
    },
  },
  {
    name: 'Радіо Хартія',
    nameEn: 'Radio Khartia',
    logo: {
      src: '/images/partners/radio-khartia.svg',
      bg: '#083f21',
      mark: '/images/partners/radio-khartia-mark.png',
    },
    url: 'https://radiokhartia.com/',
    kicker: { uk: '13-та бригада НГУ «Хартія»', en: '13th NGU Brigade “Khartia”' },
    desc: {
      uk: 'Незалежне онлайн-медіа, засноване 2024 року Сергієм Жаданом і командою.',
      en: 'An independent online medium founded in 2024 by Serhiy Zhadan and his team.',
    },
  },
];

export const publications: ExternalPublication[] = [
  {
    kind: 'ours',
    outlet: 'Оборонка',
    title:
      'Полювання за носіями «Калібрів». Як Україна загнала російські фрегати у пастку і поступово їх знищує',
    url: 'https://oboronka.mezha.ua/yak-ukrajina-zagnala-rosiyski-fregati-u-pastku-315129/',
    titleEn:
      'The hunt for Kalibr carriers. How Ukraine lured Russian frigates into a trap and is gradually destroying them',
    urlEn: 'https://oboronka.mezha.ua/en/yak-ukrajina-zagnala-rosiyski-fregati-u-pastku-315129/',
    date: '2026-09-11',
  },
  {
    kind: 'about',
    outlet: 'Радіо Хартія',
    title:
      '«Кораблі будуть лежати мертвим вантажем»: чи може Україна знищити Чорноморський флот РФ',
    url: 'https://radiokhartia.com/news-and-comments/korabli-budut-lezhaty-mertvym-vantazhem-chy-mozhe-ukraina-znyshchyty-chornomorskyi-flot-rf/',
    date: '2026-09-18',
    note: {
      uk: 'Коментар Сергія Костюшина в ефірі',
      en: 'On-air comment by Serhiy Kostiushyn',
    },
  },
];

/**
 * Назва видання для підпису рядка. Англійською тягнемо латинку з `partners`,
 * щоб написання жило в одному місці.
 */
export function outletName(outlet: string, locale: 'uk' | 'en'): string {
  if (locale !== 'en') return outlet;
  return partners.find((p) => p.name === outlet)?.nameEn ?? outlet;
}

/** Публікації одного типу, найновіші згори. */
export function getPublications(kind: ExternalPublication['kind']): ExternalPublication[] {
  return publications
    .filter((p) => p.kind === kind)
    .sort((a, b) => b.date.localeCompare(a.date));
}
