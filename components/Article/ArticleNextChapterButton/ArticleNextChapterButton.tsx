"use client";

import { Next } from "@/types/article";

import STYLES from "./ArticleNextChapterButton.module.scss";

type Props = {
  chapter: Next | null;
};

export function ArticleNextChapterButton({ chapter }: Props) {
  if (chapter) {
    return (
      <div className={STYLES["button-chapter-container"]}>
        <a
          href={`/history/${chapter.url}`}
          className={STYLES["button-chapter"]}
          aria-label={`Go to Chapter ${chapter.chapter}: ${chapter.title.replace(/\\/g, " ")}`}
        >
          <div>
            <p className={STYLES.chapter}>{`Chapter ${chapter.chapter}`}</p>
            <span>{chapter.title.replace(/\\/g, " ")}</span>
          </div>
          <div className={STYLES.arrow}>&rarr;</div>
        </a>
      </div>
    );
  }
  return null;
}
