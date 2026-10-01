import { getArticleBySlug } from "@/lib/articles";

/**
 * Шапка статті: заголовок, метарядок і дек. Бере їх із фронтматера
 * `content/articles/<slug>.mdx`, щоб правити текст треба було в одному місці.
 *
 * Історично кожна сторінка статті вписувала заголовок і дек у JSX руками, і
 * ті самі рядки жили ще й у фронтматері, звідки їх бере стрічка. Дві копії
 * розходилися мовчки: на картці статті одне, на самій сторінці інше.
 */
export default function ArticleHead({
  slug,
  eyebrow,
  locale = "uk",
}: {
  slug: string;
  eyebrow: string;
  locale?: "uk" | "en";
}) {
  const { title, dek, readingTime } = getArticleBySlug(slug, locale);
  const metaline =
    locale === "en"
      ? `${readingTime} min read`
      : `час читання ${readingTime} хв`;

  return (
    <div className="article-head">
      <span className="eyebrow article-head__eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p className="article-head__metaline">{metaline}</p>
      <p className="article-head__dek">{dek}</p>
    </div>
  );
}
