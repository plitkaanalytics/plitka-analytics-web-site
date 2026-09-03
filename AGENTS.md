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
