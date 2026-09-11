import type { ReactNode } from 'react';
import { isArticleVisible } from '@/lib/articles';

/**
 * Обгортка для фрази, що веде на іншу статтю. Якщо тієї статті в цьому
 * середовищі немає (stagingOnly на проді), фраза зникає цілком — щоб текст
 * не обіцяв «ми розібрали окремо» без посилання.
 */
export default function IfArticleVisible({
  slug,
  locale = 'uk',
  children,
}: {
  slug: string;
  locale?: 'uk' | 'en';
  children: ReactNode;
}) {
  return isArticleVisible(slug, locale) ? <>{children}</> : null;
}
