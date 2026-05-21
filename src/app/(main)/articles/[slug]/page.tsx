import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug, formatDate } from '@/lib/articles';
import VideoCarousel from '@/components/VideoCarousel';

function Methodology({ children }: { children: ReactNode }) {
  return <div className="methodology">{children}</div>;
}

function StatGrid({ v1, l1, d1, v2, l2, d2, v3, l3, d3, v4, l4, d4 }: {
  v1: string; l1: string; d1: string;
  v2: string; l2: string; d2: string;
  v3: string; l3: string; d3: string;
  v4: string; l4: string; d4: string;
}) {
  return (
    <div className="stat-2col">
      {[
        { v: v1, l: l1, d: d1 },
        { v: v2, l: l2, d: d2 },
        { v: v3, l: l3, d: d3 },
        { v: v4, l: l4, d: d4 },
      ].map(({ v, l, d }) => (
        <div className="stat-2col__cell" key={l}>
          <div className="stat-2col__num">{v}</div>
          <div className="stat-2col__lbl">{l}</div>
          <p className="stat-2col__dek">{d}</p>
        </div>
      ))}
    </div>
  );
}

function Pullquote({ children, cite }: { children: ReactNode; cite: string }) {
  return (
    <blockquote className="pullquote">
      {children}
      <cite className="pullquote__cite">{cite}</cite>
    </blockquote>
  );
}

function Figure({ url, label, cap, src, dark }: {
  url?: string | null;
  label: string;
  cap: string;
  src?: string;
  dark?: boolean;
}) {
  return (
    <div className="figure">
      {url ? (
        <img src={url} alt={cap} loading="lazy" style={{ width: '100%', display: 'block' }} />
      ) : (
        <div className={`ph ph__cross${dark ? ' ph--dark' : ''}`} style={{ aspectRatio: '16/9' }}>
          <span className="ph__corners" />
          <div className="ph__label">{label}</div>
        </div>
      )}
      <div className="figure__cap">
        <span>{cap}</span>
        {src && <span>{src}</span>}
      </div>
    </div>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="callout">
      {title && <div className="callout__title">{title}</div>}
      {children}
    </div>
  );
}

function Barchart({ title, sub, data }: { title: string; sub: string; data: string }) {
  const bars = data.split(',').map((entry) => {
    const [lbl, pct, color] = entry.split('|');
    return { lbl: lbl.trim(), pct: Number(pct.trim()), color: (color ?? '').trim() };
  });
  return (
    <div className="barchart">
      <div className="barchart__title">{title}</div>
      <div className="barchart__sub">{sub}</div>
      {bars.map(({ lbl, pct, color }) => (
        <div className="bar" key={lbl}>
          <span className="bar__lbl">{lbl}</span>
          <div className="bar__bg">
            <div className={`bar__fill${color ? ` bar__fill--${color}` : ''}`} style={{ width: `${pct}%` }} />
          </div>
          <span className="bar__val">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

const mdxComponents = { Methodology, StatGrid, Pullquote, Figure, Barchart, Callout, VideoCarousel };

export async function generateStaticParams() {
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

  const all = getAllArticles();
  const related = all.filter((a) => a.slug !== slug).slice(0, 3);

  const ReadingTime = () => <span>{article!.readingTime} хв читання</span>;
  const components = { ...mdxComponents, ReadingTime };

  return (
    <main>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Головна</Link>
        <span className="sep">›</span>
        <Link href="/articles">Розслідування</Link>
        <span className="sep">›</span>
        <span className="current">{article.projectCode}</span>
      </div>

      {/* Article header */}
      <div className="article-head">
        <div className="article-head__chips">
          <span className="chip chip--red">{article.category}</span>
          <span className="chip chip--rust">{article.projectCode}</span>
          {article.tags.map((t) => (
            <span className="chip" key={t}>{t}</span>
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
            <span className="meta__lbl">Проєкт</span>
            <span className="meta__val">{article.project}</span>
          </div>
          <div>
            <span className="meta__lbl">Час читання</span>
            <span className="meta__val meta__val--mono">{article.readingTime} хв</span>
          </div>
        </div>
      </div>

      {/* Lead image / map */}
      <div className="lead-img">
        {article.leadMapUrl ? (
          <iframe
            src={article.leadMapUrl}
            style={{ width: '100%', height: '520px', display: 'block', border: 'none' }}
            title={article.title}
          />
        ) : article.leadImage ? (
          <img src={article.leadImage} alt={article.title} style={{ width: '100%', display: 'block' }} />
        ) : (
          <div className="ph ph__cross ph--dark">
            <span className="ph__corners" />
            <div className="ph__label">СУПУТНИКОВИЙ ЗНІМОК · {article.projectCode}</div>
          </div>
        )}
      </div>

      {/* Article body */}
      <article className="article-body">
        <MDXRemote source={article.content} components={components} />
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">Інші матеріали</h2>
              <Link href="/articles" className="section__more">Архів →</Link>
            </div>
            <div className="grid-3">
              {related.map((a) => (
                <article className="card" key={a.slug}>
                  {a.leadImage ? (
                    <img src={a.leadImage} alt={a.title} className="card__img card__img--photo" />
                  ) : (
                    <div className="ph ph__cross card__img">
                      <span className="ph__corners" />
                      <div className="ph__label">{a.projectCode}</div>
                    </div>
                  )}
                  <div>
                    <span className="card__tag">{a.project}</span>
                  </div>
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
    </main>
  );
}
