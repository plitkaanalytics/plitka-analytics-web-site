#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Збір джерел для OSINT-досьє.

Качає сторінку сирою (curl), зберігає оригінальні байти, витягає повний текст
без жодного проходу через модель і веде реєстр. Цитата в статті завжди
зводиться до конкретного рядка в збереженому файлі.

    python scripts/harvest.py <topic> --urls links.txt
    python scripts/harvest.py <topic> --url https://example.com/a
    python scripts/harvest.py <topic> --urls links.txt --archive
    python scripts/harvest.py <topic> --status

Розкладка:
    docs/dossiers/<topic>/raw/NN-slug.html   оригінальні байти, недоторкані
    docs/dossiers/<topic>/text/NN-slug.txt   повний текст + шапка з метаданими
    docs/dossiers/<topic>/manifest.json      стан (щоб не качати вдруге)
    docs/dossiers/<topic>/index.md           реєстр джерел (генерується)
    docs/dossiers/<topic>/notes.md           нотатки й розбіжності (руками)
"""

import argparse
import hashlib
import io
import json
import os
import re
import subprocess
import time
from datetime import datetime, timezone
from urllib.parse import urlparse, urlsplit

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0 Safari/537.36")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# ---------------------------------------------------------------- утиліти

def now_iso():
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")


def slugify(url):
    p = urlsplit(url)
    host = p.netloc.replace("www.", "")
    parts = [s for s in p.path.split("/") if s]
    # У t.me номер поста без назви каналу нічого не каже — беремо обидва.
    if host in ("t.me", "telegram.me") and len(parts) >= 2:
        tail = "-".join(parts[-2:])
    else:
        tail = parts[-1] if parts else "index"
    tail = re.sub(r"\.(html?|php|aspx?)$", "", tail)
    raw = host + "-" + tail
    raw = re.sub(r"[^a-zA-Z0-9.\-_]+", "-", raw).strip("-").lower()
    return raw[:70] or "source"


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def tg_variant(url):
    """t.me/<канал>/<id> -> ембед, інакше сторінка порожня без JS."""
    m = re.match(r"^https?://t\.me/(?!s/)([^/]+)/(\d+)", url)
    if m:
        return "https://t.me/%s/%s?embed=1&single=1" % (m.group(1), m.group(2))
    m = re.match(r"^https?://t\.me/(?!s/)([^/?]+)/?$", url)
    if m:
        return "https://t.me/s/%s" % m.group(1)
    return None


# ---------------------------------------------------------------- качання

def curl(url, out_path):
    """Повертає (status, final_url, content_type). Байти лягають у out_path."""
    fmt = "%{http_code}\n%{url_effective}\n%{content_type}"
    cmd = ["curl", "-sSL", "--compressed", "--max-time", "60",
           "--retry", "2", "--retry-delay", "2",
           "-A", UA,
           "-H", "Accept-Language: uk,en;q=0.9,ru;q=0.8",
           "-o", out_path, "-w", fmt, url]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    except subprocess.TimeoutExpired:
        return 0, url, ""
    lines = (r.stdout or "").splitlines()
    status = int(lines[0]) if lines and lines[0].isdigit() else 0
    final = lines[1] if len(lines) > 1 else url
    ctype = lines[2] if len(lines) > 2 else ""
    return status, final, ctype


def wayback_snapshot(url):
    """
    Найсвіжіший вдалий знімок у Wayback.

    Через CDX, а не через wayback/available: останній віддає 429 уже після
    кількох десятків запитів поспіль, і відкат тихо перестає працювати.
    CDX ще й дає код відповіді, тож можна брати саме знімок із 200, а не
    збережену сторінку помилки.

    Повертає (url, помилка). Суфікс id_ віддає оригінальну сторінку без
    навігаційної врізки Wayback — інакше вона потрапляє у витяг тексту.
    """
    api = ("https://web.archive.org/cdx/search/cdx?url=%s&output=json"
           "&filter=statuscode:200&limit=-1" % url)
    for attempt in range(3):
        try:
            r = subprocess.run(["curl", "-sS", "--max-time", "40", api],
                               capture_output=True, text=True, timeout=80)
            out = (r.stdout or "").strip()
            # Ліміт приходить і як HTML-сторінкою з 429, і просто порожнім
            # тілом. Друге легко сплутати з «знімка немає», тому обидва
            # випадки — привід повторити, а не вирок джерелу.
            throttled = not out or (
                "429" in out[:200] and "<html" in out[:200].lower())
            if throttled:
                if attempt == 2:
                    return None, "CDX не відповідає (ліміт) — повторити пізніше"
                time.sleep(10 * (attempt + 1))
                continue
            rows = json.loads(out)
            if len(rows) < 2:
                return None, "знімка немає в Wayback"
            ts, orig = rows[1][1], rows[1][2]
            return "https://web.archive.org/web/%sid_/%s" % (ts, orig), ""
        except Exception as e:
            if attempt == 2:
                return None, "CDX недоступний: %s" % e
            time.sleep(5 * (attempt + 1))
    return None, "CDX віддає 429 — спробувати пізніше"


def wayback_save(url):
    """Здати сторінку у Wayback. Це публікація URL у зовнішній сервіс."""
    try:
        subprocess.run(["curl", "-sS", "--max-time", "90", "-o", os.devnull,
                        "https://web.archive.org/save/" + url],
                       capture_output=True, timeout=120)
        return "https://web.archive.org/web/" + url
    except Exception:
        return None


# ------------------------------------------------------------ витягування

def text_from_pdf(path):
    try:
        r = subprocess.run(["pdftotext", "-layout", "-enc", "UTF-8", path, "-"],
                           capture_output=True, timeout=180)
        t = r.stdout.decode("utf-8", "replace")
        if len(t.strip()) > 200:
            return t, "pdftotext"
    except Exception:
        pass
    try:
        import fitz
        doc = fitz.open(path)
        return "\n\n".join(p.get_text() for p in doc), "pymupdf"
    except Exception as e:
        return "", "pdf-failed: %s" % e


def text_from_html(raw_bytes):
    """
    Два проходи. trafilatura бере основний текст із розміткою, таблицями
    й коментарями; bs4 — усе, що є на сторінці. Якщо перший віддав помітно
    менше, лишаємо повний дамп: для OSINT недобір гірший за сміття.
    """
    from bs4 import BeautifulSoup
    import trafilatura

    html = raw_bytes.decode("utf-8", "replace")

    soup = BeautifulSoup(html, "lxml")
    for tag in soup(["script", "style", "noscript", "template"]):
        tag.decompose()
    full = soup.get_text("\n", strip=True)
    full = re.sub(r"\n{3,}", "\n\n", full)

    main = ""
    try:
        main = trafilatura.extract(
            html, favor_recall=True, include_comments=True,
            include_tables=True, include_formatting=True,
            include_links=True, deduplicate=False,
            output_format="txt", with_metadata=False) or ""
    except Exception:
        pass

    if len(main) < 0.3 * len(full) or len(main) < 400:
        return (full, "bs4-full") if full else (main, "trafilatura")
    return main, "trafilatura"


def html_meta(raw_bytes):
    """Заголовок і дата публікації зі сторінки — для реєстру."""
    title, date = "", ""
    try:
        import trafilatura
        md = trafilatura.extract_metadata(raw_bytes.decode("utf-8", "replace"))
        if md:
            title = (md.title or "").strip()
            date = (md.date or "").strip()
    except Exception:
        pass
    if not title:
        m = re.search(rb"<title[^>]*>(.*?)</title>", raw_bytes, re.S | re.I)
        if m:
            import html as htmlmod
            title = htmlmod.unescape(
                m.group(1).decode("utf-8", "replace")).strip()
    return re.sub(r"\s+", " ", title)[:200], date


# ------------------------------------------------------------------ логіка

def load_manifest(topic_dir):
    p = os.path.join(topic_dir, "manifest.json")
    if os.path.exists(p):
        with io.open(p, encoding="utf-8") as f:
            return json.load(f)
    return {"topic": os.path.basename(topic_dir), "sources": []}


def save_manifest(topic_dir, man):
    with io.open(os.path.join(topic_dir, "manifest.json"), "w",
                 encoding="utf-8") as f:
        json.dump(man, f, ensure_ascii=False, indent=2)


def harvest_one(url, n, topic_dir, do_archive):
    slug = "%02d-%s" % (n, slugify(url))
    raw_dir = os.path.join(topic_dir, "raw")
    txt_dir = os.path.join(topic_dir, "text")

    fetch_url = tg_variant(url) or url
    tmp_raw = os.path.join(raw_dir, slug + ".bin")
    status, final, ctype = curl(fetch_url, tmp_raw)

    note = ""
    if status >= 400 or status == 0 or not os.path.getsize(tmp_raw):
        orig_status = status
        snap, err = wayback_snapshot(url)
        if snap:
            # Невдалу спробу не можна писати поверх оригіналу: якщо знімок
            # теж не візьметься, лишимося без обох тіл відповіді.
            probe = tmp_raw + ".wb"
            status2, final2, ctype2 = curl(snap, probe)
            if status2 < 400 and os.path.exists(probe) and os.path.getsize(probe):
                os.replace(probe, tmp_raw)
                note = "оригінал недоступний (%s), узято з Wayback" % orig_status
                status, final, ctype = status2, final2, ctype2
            else:
                if os.path.exists(probe):
                    os.remove(probe)
                note = "оригінал %s; знімок Wayback теж не взявся (%s)" % (
                    orig_status, status2)
        else:
            note = "оригінал %s; %s" % (orig_status, err)

    size = os.path.getsize(tmp_raw) if os.path.exists(tmp_raw) else 0
    is_pdf = "pdf" in (ctype or "").lower() or url.lower().endswith(".pdf")
    ext = ".pdf" if is_pdf else ".html"
    raw_path = os.path.join(raw_dir, slug + ext)
    if os.path.exists(tmp_raw):
        if os.path.exists(raw_path):
            os.remove(raw_path)
        os.rename(tmp_raw, raw_path)

    if size == 0:
        return {"n": n, "url": url, "slug": slug, "status": status,
                "access": "НЕ ВІДКРИЛОСЯ", "title": "", "pubdate": "",
                "chars": 0, "method": "-", "sha256": "",
                "note": note or "порожня відповідь — потрібен текст від редакції"}

    if is_pdf:
        text, method = text_from_pdf(raw_path)
        title, pubdate = os.path.basename(url), ""
    else:
        with open(raw_path, "rb") as f:
            blob = f.read()
        text, method = text_from_html(blob)
        title, pubdate = html_meta(blob)

    archived = wayback_save(url) if do_archive else ""

    # Сторінка «не знайдено» часто віддає повноцінний HTML із меню на сотні
    # кілобайтів. Мовчки записати її як прочитане джерело — найгірше, що
    # тут може статися, тому перевіряємо і код, і заголовок.
    soft404 = bool(re.search(
        r"page not found|not found|\b404\b|страница не найдена|"
        r"сторінк\w+ не знайдено", title, re.I))
    if status >= 400 or soft404:
        access = "HTTP %s — НЕ ПРОЧИТАНО" % (status or "?")
    elif len(text.strip()) < 1200:
        access = "МАЛО ТЕКСТУ (%d зн.) — перевірити вручну" % len(text.strip())
    else:
        access = "прочитано"

    header = [
        "URL:         %s" % url,
        "Кінцевий:    %s" % final,
        "Заголовок:   %s" % title,
        "Дата публ.:  %s" % (pubdate or "не вказана на сторінці"),
        "Завантажено: %s" % now_iso(),
        "HTTP:        %s   Тип: %s   Байтів: %d" % (status, ctype, size),
        "Оригінал:    raw/%s" % (slug + ext),
        "sha256:      %s" % sha256(raw_path),
        "Витяг:       %s" % method,
    ]
    if archived:
        header.append("Архів:       %s" % archived)
    if note:
        header.append("Примітка:    %s" % note)
    header += ["", "=" * 78, ""]

    txt_path = os.path.join(txt_dir, slug + ".txt")
    with io.open(txt_path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(header))
        f.write(text)

    return {"n": n, "url": url, "slug": slug, "status": status,
            "access": access, "title": title, "pubdate": pubdate,
            "chars": len(text), "method": method,
            "sha256": sha256(raw_path), "archived": archived, "note": note}


def write_index(topic_dir, man):
    out = ["# Досьє: %s" % man["topic"], "",
           "Реєстр джерел. Повний текст — у `text/`, оригінальні байти — у `raw/`.",
           "Тип джерела проставляється вручну: офіційне РФ / довідник /",
           "профільне видання / форум-анонім. Дані РФ і довідників у статті",
           "подаються як **заявлені** (STYLE-OSINT §3).", "",
           "| № | Джерело | Дата | Статус | Знаків | Тип | Файл |",
           "|---|---|---|---|---|---|---|"]
    for r in man["sources"]:
        title = (r.get("title") or urlparse(r["url"]).netloc)[:70]
        out.append("| %d | [%s](%s) | %s | %s | %d | %s | `text/%s.txt` |" % (
            r["n"], title.replace("|", "/"), r["url"],
            r.get("pubdate") or "—", r["access"], r.get("chars", 0),
            r.get("kind") or "?", r["slug"]))
    problems = [r for r in man["sources"] if r.get("note")]
    if problems:
        out += ["", "## Проблемні джерела", ""]
        for r in problems:
            out.append("- **№%d** %s — %s" % (r["n"], r["url"], r["note"]))
    out += ["", "---", "",
            "Нотатки за джерелами й зведення розбіжностей — у `notes.md`.",
            "Цей файл перезаписується скриптом при кожному прогоні, тому",
            "нічого написаного вручну сюди класти не можна.", ""]
    with io.open(os.path.join(topic_dir, "index.md"), "w",
                 encoding="utf-8", newline="\n") as f:
        f.write("\n".join(out))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("topic")
    ap.add_argument("--url", action="append", default=[])
    ap.add_argument("--urls", help="файл зі списком URL, по одному в рядок")
    ap.add_argument("--archive", action="store_true",
                    help="здати кожен URL у Wayback (зовнішня публікація)")
    ap.add_argument("--force", action="store_true", help="перекачати наявні")
    ap.add_argument("--status", action="store_true", help="показати реєстр")
    a = ap.parse_args()

    topic_dir = os.path.join(ROOT, "docs", "dossiers", a.topic)
    for sub in ("raw", "text"):
        os.makedirs(os.path.join(topic_dir, sub), exist_ok=True)
    man = load_manifest(topic_dir)

    if a.status:
        for r in man["sources"]:
            print("%2d  %-28s %s" % (r["n"], r["access"], r["url"]))
        print("\nусього: %d" % len(man["sources"]))
        return

    urls = list(a.url)
    if a.urls:
        with io.open(a.urls, encoding="utf-8") as f:
            urls += [l.strip() for l in f
                     if l.strip() and not l.strip().startswith("#")]
    if not urls:
        ap.error("нема URL: дайте --url або --urls")

    seen = {r["url"]: r for r in man["sources"]}
    n = max([r["n"] for r in man["sources"]], default=0)

    for url in urls:
        if url in seen and not a.force:
            print("· пропуск (вже є): %s" % url)
            continue
        if url in seen:
            num = seen[url]["n"]
            man["sources"] = [r for r in man["sources"] if r["url"] != url]
        else:
            n += 1
            num = n
        rec = harvest_one(url, num, topic_dir, a.archive)
        old_kind = seen.get(url, {}).get("kind")
        if old_kind:
            rec["kind"] = old_kind
        man["sources"].append(rec)
        man["sources"].sort(key=lambda r: r["n"])
        save_manifest(topic_dir, man)
        write_index(topic_dir, man)
        print("%2d  %-28s %6d зн.  %s" % (
            rec["n"], rec["access"], rec.get("chars", 0), url))

    write_index(topic_dir, man)
    bad = [r for r in man["sources"] if r["access"] != "прочитано"]
    print("\nдосьє: docs/dossiers/%s/   джерел: %d   потребують уваги: %d"
          % (a.topic, len(man["sources"]), len(bad)))
    for r in bad:
        print("   ! №%d %s — %s" % (r["n"], r["url"], r["access"]))


if __name__ == "__main__":
    main()
