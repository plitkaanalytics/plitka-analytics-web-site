import Link from 'next/link';
import { getAllArticles, formatDate, groupByProject } from '@/lib/articles';

export const metadata = { title: 'Investigations — PLITKA Analytics' };

/**
 * Дзеркало української стрічки з src/app/(main)/articles/page.tsx: та сама
 * розмітка картки, лише інша мова даних і префікс /en у посиланнях.
 *
 * Розходитися їм не можна. Після редизайну англійська стрічка лишалася на
 * старих класах card__tag, card__dek і card__meta, яких у globals.css немає
 * зовсім, тож половина картки виводилася без стилів.
 */
export default async function ArticlesPageEN({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const { project: projectFilter } = await searchParams;

  const all = getAllArticles('en');
  const groups = groupByProject(all).filter(
    (g) => !projectFilter || g.code === projectFilter,
  );

  return (
    <>
      {groups.map(({ code, title, articles }) => (
        <section className="section" key={code} id={`project-${code}`}>
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">{title}</h2>
              <span className="section__more">{code}</span>
            </div>
            <div className="articles-grid">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/en/articles/${a.slug}`}
                  className={`card${a.leadImage ? ' card--photo' : ''}`}
                >
                  {a.leadImage && (
                    <img src={a.leadImage} alt="" className="card__media" />
                  )}
                  <span className="card__date">{formatDate(a.date, 'en')}</span>
                  <span className="card__title">{a.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {groups.length === 0 && (
        <section className="section">
          <div className="container">
            <p style={{ color: 'var(--slate)' }}>No materials found.</p>
          </div>
        </section>
      )}
    </>
  );
}
