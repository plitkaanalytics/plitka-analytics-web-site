import Link from 'next/link';
import { getAllArticles, formatDate } from '@/lib/articles';

export default function HomePage() {
  const articles = getAllArticles();
  const [hero, ...rest] = articles;

  return (
    <>
      {hero && (
        <section className="hero">
          {hero.leadImage && (
            <div className="hero__media">
              <img src={hero.leadImage} alt="" />
            </div>
          )}
          <div className="hero__content">
            <span className="eyebrow">{hero.category}</span>
            <h1><Link href={`/articles/${hero.slug}`}>{hero.title}</Link></h1>
            <Link href={`/articles/${hero.slug}`} className="hero__btn">
              Читати
            </Link>
          </div>
        </section>
      )}

      <section className="section-investigations">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Інші розслідування</span>
          </div>
          <div className="cards">
            {rest.slice(0, 3).map((a) => (
              <Link key={a.slug} className="card" href={`/articles/${a.slug}`}>
                <span className="card__date">{formatDate(a.date, 'uk', 'short')}</span>
                <span className="card__title">{a.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-about">
        <div className="wrap">
          <span className="eyebrow">Про нас</span>
          <div className="about-grid">
            <div className="about-text">
              <p className="is-lead">PLITKA Analytics — незалежна OSINT-команда, що документує військову інфраструктуру та логістику флоту РФ на основі відкритих даних.</p>
              <p>Ми працюємо із супутниковими знімками, корабельними реєстрами, даними AIS та публічними закупівлями. Кожен висновок у наших матеріалах має посилання на джерело, яке можна перевірити самостійно.</p>
            </div>
            <div className="eye-mark" />
          </div>
        </div>
      </section>
    </>
  );
}
