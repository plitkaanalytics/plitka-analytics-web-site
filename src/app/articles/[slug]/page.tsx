import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug, formatDate } from '@/lib/articles';

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return { title: `${article.title} — PLITKA Analytics` };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let article;
  try {
    article = getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const allArticles = getAllArticles();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Sub strip */}
      <div className="substrip">
        <div className="substrip__inner">
          <div><strong>{article.projectCode}</strong> · {article.category}</div>
          <div>{article.readingTime} хв читання · {article.sources} джерел</div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Головна</Link>
        <span className="sep">·</span>
        <Link href="/articles">Розслідування</Link>
        <span className="sep">·</span>
        <span className="current">{article.projectCode}</span>
      </div>

      {/* Article header */}
      <div className="article-head">
        <div className="article-head__chips">
          <span className="chip chip--red">{article.category}</span>
          <span className="chip chip--steel">{article.projectCode}</span>
          {article.tags.map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>
        <h1>{article.title}</h1>
        <p className="article-head__dek">{article.dek}</p>
        <div className="article-head__meta">
          <div>
            <span className="meta__lbl">Автори</span>
            <span className="meta__val">{article.authors.join(', ')}</span>
          </div>
          <div>
            <span className="meta__lbl">Дата</span>
            <span className="meta__val">{formatDate(article.date)}</span>
          </div>
          <div>
            <span className="meta__lbl">Читання</span>
            <span className="meta__val">{article.readingTime} хв</span>
          </div>
          <div>
            <span className="meta__lbl">Джерела</span>
            <span className="meta__val">{article.sources}</span>
          </div>
        </div>
      </div>

      {/* Lead image */}
      <div className="lead-img">
        <div className="ph ph--dark ph__cross" style={{ aspectRatio: '21/10' }}>
          <span className="ph__corners" />
          <div className="ph__label">СУПУТНИКОВИЙ ЗНІМОК · {article.projectCode}</div>
        </div>
        <div className="lead-img__caption">
          <span>Ілюстративне зображення. Реальні знімки — в датасеті проєкту.</span>
          <span>Sentinel-2 L2A · {formatDate(article.date)}</span>
        </div>
      </div>

      {/* MDX content */}
      <article className="article-body">
        <MDXRemote source={article.content} />
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="related">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">Пов&apos;язані матеріали</h2>
              <Link href="/articles" className="section__more">Усі розслідування →</Link>
            </div>
            <div className="related__grid">
              {related.map((a) => (
                <article className="card" key={a.slug}>
                  <div className="ph ph__cross card__img">
                    <span className="ph__corners" />
                    <div className="ph__label">{a.projectCode}</div>
                  </div>
                  <span className="card__tag">{a.project}</span>
                  <h3 className="card__title">
                    <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p className="card__dek">{a.dek}</p>
                  <div className="card__meta">
                    <span>{formatDate(a.date)}</span>
                    <span>{a.authors[0].split(' ').at(-1)?.toUpperCase()}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
