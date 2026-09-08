import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleFrontmatter {
  title: string;
  date: string;
  dek: string;
  authors: string[];
  project: string;
  projectCode: string;
  tags: string[];
  readingTime: number;
  category: string;
  leadImage?: string;
  leadMapUrl?: string;
  /** Слаг того самого матеріалу іншою мовою. Пара живе у фронтматері обох
   *  сторін: так перемикач мов веде на двійник, а не на стрічку. */
  twin?: string;
}

export interface ArticleListItem extends ArticleFrontmatter {
  slug: string;
}

export interface Article extends ArticleListItem {
  content: string;
}

const articlesDir = path.join(process.cwd(), 'content/articles');
const articlesEnDir = path.join(process.cwd(), 'content/articles/en');

function dirForLocale(locale: 'uk' | 'en') {
  return locale === 'en' ? articlesEnDir : articlesDir;
}

function calcReadingTime(content: string): number {
  const text = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Returns { slug, filePath } for every article in the directory.
// Supports both flat `{slug}.mdx` and directory-based `{slug}/index.mdx`.
function listArticleEntries(dir: string): Array<{ slug: string; filePath: string }> {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const result: Array<{ slug: string; filePath: string }> = [];
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      result.push({
        slug: entry.name.replace('.mdx', ''),
        filePath: path.join(dir, entry.name),
      });
    } else if (entry.isDirectory()) {
      const indexPath = path.join(dir, entry.name, 'index.mdx');
      if (fs.existsSync(indexPath)) {
        result.push({ slug: entry.name, filePath: indexPath });
      }
    }
  }
  return result;
}

export function getAllArticles(locale: 'uk' | 'en' = 'uk'): ArticleListItem[] {
  const dir = dirForLocale(locale);
  return listArticleEntries(dir)
    .map(({ slug, filePath }) => {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const readingTime = (data.readingTime as number | undefined) ?? calcReadingTime(content);
      return { slug, ...(data as ArticleFrontmatter), readingTime };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string, locale: 'uk' | 'en' = 'uk'): Article {
  const dir = dirForLocale(locale);
  // Try directory-based first, then flat
  const dirIndex = path.join(dir, slug, 'index.mdx');
  const flatFile = path.join(dir, `${slug}.mdx`);
  const filePath = fs.existsSync(dirIndex) ? dirIndex : flatFile;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const readingTime = (data.readingTime as number | undefined) ?? calcReadingTime(content);
  return { slug, ...(data as ArticleFrontmatter), readingTime, content };
}

// Returns parsed JSON from content/articles/{slug}/data.json, or null if absent.
export function getArticleData(slug: string): unknown | null {
  const dataPath = path.join(process.cwd(), 'content/articles', slug, 'data.json');
  if (!fs.existsSync(dataPath)) return null;
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

/**
 * Пари «українська стаття ↔ англійська». Беремо з фронтматера й лишаємо
 * тільки ті, де двійник справді існує й посилається назад: односторонній або
 * битий twin краще проігнорувати, ніж вести читача в 404.
 */
export function getTwinMap(): Record<'uk' | 'en', Record<string, string>> {
  const uk = getAllArticles('uk');
  const en = getAllArticles('en');
  const byEnSlug = new Map(en.map((a) => [a.slug, a]));
  const map: Record<'uk' | 'en', Record<string, string>> = { uk: {}, en: {} };
  for (const a of uk) {
    const twin = a.twin && byEnSlug.get(a.twin);
    if (!twin || twin.twin !== a.slug) continue;
    map.uk[a.slug] = twin.slug;
    map.en[twin.slug] = a.slug;
  }
  return map;
}

export function formatDate(dateStr: string, locale: 'uk' | 'en' = 'uk', format: 'long' | 'short' = 'long'): string {
  const d = new Date(dateStr);
  if (format === 'short') {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${d.getFullYear()}`;
  }
  return d.toLocaleDateString(locale === 'en' ? 'en-US' : 'uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
