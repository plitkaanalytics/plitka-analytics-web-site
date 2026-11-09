import Link from 'next/link';
import { getAllArticles, groupByProject } from '@/lib/articles';

export const metadata = { title: 'Projects — PLITKA Analytics' };

export default function ProjectsPageEN() {
  const articles = getAllArticles('en');

  const projects = groupByProject(articles).map(({ code, title, articles: list }) => ({
    code,
    title,
    count: list.length,
  }));

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">Active projects</h2>
          </div>
          <div className="projects-strip" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {projects.map(({ code, title, count }) => (
              <Link key={code} href={`/en/articles?project=${encodeURIComponent(code)}`} className="ptile ptile--accent ptile--link">
                <span className="ptile__code">{code}</span>
                <div className="ptile__title">{title}</div>
                <span className="ptile__count">{count} {count === 1 ? 'article' : 'articles'}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
