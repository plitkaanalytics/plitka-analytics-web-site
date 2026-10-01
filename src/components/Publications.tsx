import { formatDate } from '@/lib/articles';
import type { Locale } from '@/lib/i18n';
import { getPublications, outletName, partners } from '@/data/publications';

const strings = {
  uk: {
    ours: 'Наші матеріали в інших виданнях',
    about: 'Про нас у медіа',
  },
  en: {
    ours: 'Our work in other outlets',
    about: 'Us in the media',
  },
} satisfies Record<Locale, unknown>;

/**
 * Картки партнерів без обгортки-секції: сторінка ставить їх під власним
 * заголовком, одразу після вступу.
 */
export function PartnerGrid({ locale }: { locale: Locale }) {
  if (partners.length === 0) return null;

  return (
    <div className="grid-2">
      {partners.map((p) => {
        const name = locale === 'en' && p.nameEn ? p.nameEn : p.name;
        return (
          <a
            key={p.url}
            className="partner-card"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Вордмарк уже містить назву, тож текстом її не дублюємо —
                вона лишається в alt. Без логотипа показуємо саму назву. */}
            {p.logo ? (
              <span className="partner-card__plate" style={{ background: p.logo.bg }}>
                {p.logo.mark && <img className="partner-card__mark" src={p.logo.mark} alt="" />}
                <img className="partner-card__logo" src={p.logo.src} alt={name} />
              </span>
            ) : (
              <span className="partner-card__plate partner-card__plate--bare">
                <span className="partner-card__name">{name}</span>
              </span>
            )}
            <span className="partner-card__body">
              {p.kicker && <span className="partner-card__kicker">{p.kicker[locale]}</span>}
              <span className="partner-card__desc">{p.desc[locale]}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}

function PublicationList({ locale, kind }: { locale: Locale; kind: 'ours' | 'about' }) {
  const items = getPublications(kind);
  if (items.length === 0) return null;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '880px' }}>
        <div className="section__head">
          <h2 className="section__title">{strings[locale][kind]}</h2>
        </div>
        <ul className="publist">
          {items.map((p) => (
            <li key={p.url} className="publist__item">
              {/* Англійською беремо версію видання, якщо вона є; інакше лишається
                  оригінальний заголовок — краще чужою мовою, ніж наш переклад
                  того, чого у виданні немає. */}
              <a
                className="publist__link"
                href={locale === 'en' && p.urlEn ? p.urlEn : p.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="publist__meta">
                  <span className="publist__outlet">{outletName(p.outlet, locale)}</span>
                  {/* Як у стрічці статей: українською — цифрами, англійською — словом. */}
                  <span className="publist__date">
                    {formatDate(p.date, locale, locale === 'en' ? 'long' : 'short')}
                  </span>
                </span>
                <span className="publist__body">
                  <span className="publist__title">
                    {locale === 'en' && p.titleEn ? p.titleEn : p.title}
                  </span>
                  {p.note && <span className="publist__note">{p.note[locale]}</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Два переліки публікацій — наші тексти й матеріали про нас. */
export default function Publications({ locale }: { locale: Locale }) {
  return (
    <>
      <PublicationList locale={locale} kind="ours" />
      <PublicationList locale={locale} kind="about" />
    </>
  );
}
