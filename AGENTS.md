<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Як ми пишемо статті

Перед написанням або редагуванням будь-якої статті прочитай `docs/STYLE-OSINT.md`.
Там голос видання, робота з розбіжностями джерел, термінологія, правила щодо
ілюстрацій і чекліст перед публікацією.

Порядок роботи над матеріалом — три скіли, кожен на свій шар:

1. `dzherela` — зібрати й прочитати джерела. Досьє лягає в `docs/dossiers/<тема>/`,
   качає `scripts/harvest.py`. Стаття не починається, поки реєстр не розібраний.
2. `osint-journalist` — написати. Верифікація й рівні певності за школою
   Bellingcat, але **методологія лишається в досьє, а не в тексті**: голос
   видання визначає `docs/STYLE-OSINT.md` і він має перевагу.
3. `vychytka` — мовний прохід, останнім.

# Статті тільки для staging

`stagingOnly: true` у фронтматері ховає статтю з проду: її немає ні в стрічках і
проєктах, ні за прямою адресою (404). Видно її лише на preview-деплоях Vercel
(гілка `staging`) і в локальному `next dev`. Позначку ставити в обох мовних
версіях — кожна вирішує за себе.

- Окрема сторінка статті кличе `requireVisibleArticle(SLUG)` першим рядком і в
  `Page`, і в `generateMetadata`. Статичний `export const metadata` тут не
  годиться: Next віддає його навіть у відповіді 404.
- Фразу з посиланням на іншу статтю обгортати в `<IfArticleVisible slug="…">`
  (у TSX і в MDX). Коли тієї статті немає, фраза зникає цілком, а не лишається
  «ми розібрали окремо» без посилання.
