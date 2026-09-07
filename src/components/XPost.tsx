"use client";

import { useEffect } from "react";

const SCRIPT_SRC = "https://platform.twitter.com/widgets.js";

declare global {
  interface Window {
    twttr?: { widgets?: { load?: (el?: HTMLElement | null) => void } };
  }
}

interface XPostProps {
  /** Ідентифікатор допису — цифри після /status/ */
  id: string;
  /** Обліковий запис без @ */
  user: string;
  /** Підпис під вставкою: що читач бачить і чому це важливо */
  caption: React.ReactNode;
  /** Текст, який лишиться, якщо віджет не завантажиться або допис видалять */
  fallback: string;
  wide?: boolean;
}

/**
 * Офіційна вставка допису з X. Матеріал віддає сама платформа, авторство й
 * посилання на оригінал вбудовані — тож права лишаються в автора допису,
 * а ми нічого не передруковуємо.
 *
 * Допис можуть видалити. Тому кожна вставка має fallback із описом того, що
 * там було, а покликання на архів лишається у списку джерел.
 */
export function XPost({ id, user, caption, fallback, wide }: XPostProps) {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (existing) {
      window.twttr?.widgets?.load?.();
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, []);

  const url = `https://twitter.com/${user}/status/${id}`;

  return (
    <figure className={wide ? "fig fig--embed fig--bleed" : "fig fig--embed"}>
      <blockquote
        className="twitter-tweet"
        data-lang="uk"
        data-dnt="true"
        data-conversation="none"
      >
        <p>{fallback}</p>
        <a href={url}>@{user} — оригінал допису</a>
      </blockquote>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
