"use client";

import { formatText } from "@/utils/helpers/article";

import STYLES from "./ArticleNotes.module.scss";

type Props = {
  notes: string;
};

export function ArticleNotes({ notes }: Props) {
  return (
    <div className={STYLES.notes}>
      <h2>Notes</h2>
      {formatText(notes)}
    </div>
  );
}
