# -*- coding: utf-8 -*-
"""Аудит покликань у статті: биті, осиротілі, порядок нумерації, обсяг.

    python scripts/audit-refs.py <slug> [--fix]

Без --fix лише повідомляє. З --fix перенумеровує покликання за першою появою
в тексті й переставляє <li> у списку джерел у тому самому порядку — це те, що
доводиться робити щоразу, коли новий розділ вписують у середину готового
тексту.

Після --fix обов'язково прогнати prettier: скрипт пише рядки як є.

Покликання бувають і в компонентах, які сторінка імпортує з `@/components/`
(врізка з картою, наприклад). Їх скрипт теж знаходить — інакше перенумерація
тихо ламає покликання, якого не видно в page.tsx.
"""

import argparse
import io
import math
import os
import re
import sys

SPLIT = "===================== ДЖЕРЕЛА"


def page_path(slug):
    for tpl in (
        "src/app/(main)/articles/%s/page.tsx",
        "src/app/en/articles/%s/page.tsx",
    ):
        p = tpl % slug
        if os.path.exists(p):
            return p
    sys.exit("не знайдено сторінку для «%s»" % slug)


def read(path):
    return io.open(path, encoding="utf-8").read()


def component_refs(page_src):
    """Покликання в компонентах, які сторінка імпортує з `@/components/`.

    Повертає {номер: [файли]}. Порядок появи тут не рахується: компонент
    вставляють у розмітку, і де саме — знає тільки сторінка.
    """
    out = {}
    for name in re.findall(r'from "@/components/([A-Za-z0-9_]+)"', page_src):
        path = "src/components/%s.tsx" % name
        if not os.path.exists(path):
            continue
        for n in re.findall(r'href="#ref-(\d+)"', read(path)):
            out.setdefault(int(n), []).append(path)
    return out


def first_appearance(body):
    order, seen = [], set()
    for m in re.finditer(r'href="#ref-(\d+)"', body):
        n = int(m.group(1))
        if n not in seen:
            seen.add(n)
            order.append(n)
    return order


def words_in(body):
    txt = re.sub(r"<[^>]+>", " ", body)
    txt = re.sub(r"\{[^{}]*\}", " ", txt)
    return re.findall(r"[\wЀ-ӿ’ʼ-]+", txt)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slug")
    ap.add_argument("--fix", action="store_true", help="перенумерувати за першою появою")
    args = ap.parse_args()

    path = page_path(args.slug)
    s = read(path)
    if SPLIT not in s:
        sys.exit("у сторінці немає секції джерел")
    i = s.index("{/* " + SPLIT)
    body, tail = s[:i], s[i:]

    order = first_appearance(body)
    defined = [int(m) for m in re.findall(r'<li id="ref-(\d+)">', tail)]
    comp = component_refs(s)

    broken = [n for n in order + sorted(comp) if n not in defined]
    orphan = [n for n in defined if n not in order and n not in comp]
    dupes = sorted(set(n for n in defined if defined.count(n) > 1))
    gaps = [n for n in range(1, max(defined) + 1) if n not in defined] if defined else []

    print("покликань у тексті: %d, джерел у списку: %d" % (len(order), len(defined)))
    print("биті (є в тексті, немає в списку):", broken or "—")
    print("осиротілі (є в списку, немає в тексті):", orphan or "—")
    print("дублі id:", dupes or "—")
    print("дірки в нумерації:", gaps or "—")
    print("порядок за першою появою:", "так" if order == sorted(order) else "ЗБИТИЙ")
    if comp:
        for n in sorted(comp):
            print("  у компоненті: [%d] — %s" % (n, ", ".join(sorted(set(comp[n])))))

    w = words_in(body)
    print("слів: %d → readingTime: %d" % (len(w), math.ceil(len(w) / 200.0)))
    print("плейсхолдерів медіа:", len(re.findall(r"data-placeholder", s)))

    # латиниця всередині кириличного слова — типова одруківка при наборі
    mixed = sorted(
        set(
            t
            for t in re.findall(r"[A-Za-zЀ-ӿ]{2,}", re.sub(r"<[^>]+>", " ", body))
            if re.search(r"[Ѐ-ӿ]", t) and re.search(r"[A-Za-z]", t)
        )
    )
    print("мішані слова (латиниця в кирилиці):", mixed or "—")

    if not args.fix:
        return 0 if not (broken or orphan or dupes or gaps) else 1

    if broken or orphan or dupes or gaps:
        sys.exit("--fix працює лише на чистому списку: спершу полагодити биті й осиротілі")
    if order == sorted(order):
        print("\nнумерація вже за першою появою, нічого не міняю")
        return 0

    mapping = {old: k + 1 for k, old in enumerate(order)}

    items = {}
    for m in re.finditer(r'<li id="ref-(\d+)">.*?\n(\s*)</li>\n', tail, re.S):
        items[int(m.group(1))] = m.group(0)
    if sorted(items) != sorted(defined):
        sys.exit("не вдалося розібрати список джерел — прогнати prettier і повторити")

    # покликання в тексті: prettier переносить <a> на кілька рядків, тому DOTALL
    def rep(m):
        a, b = int(m.group(1)), int(m.group(2))
        if a != b:
            sys.exit("покликання #ref-%d підписане як [%d]" % (a, b))
        n = mapping[a]
        return '<a className="ref" href="#ref-%d">[%d]</a>' % (n, n)

    total = len(re.findall(r'href="#ref-\d+"', body))
    body, cnt = re.subn(
        r'<a className="ref" href="#ref-(\d+)">\s*\[(\d+)\]\s*</a>', rep, body, flags=re.S
    )
    if cnt != total:
        sys.exit("перезаписано %d покликань із %d — змінився вигляд розмітки" % (cnt, total))

    new_items = []
    for old in order:
        it = re.sub(r'^<li id="ref-\d+">', '<li id="ref-%d">' % mapping[old], items[old])
        new_items.append(it)

    ol_open = tail.index(">", tail.index("<ol")) + 1
    ol_close = tail.index("</ol>")
    tail = tail[:ol_open] + "\n            " + "            ".join(new_items) + tail[ol_close:]

    io.open(path, "w", encoding="utf-8", newline="\n").write(body + tail)
    print("\nперенумеровано %d покликань; тепер прогнати prettier" % cnt)
    return 0


if __name__ == "__main__":
    sys.exit(main())
