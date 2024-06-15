"use client";

import { formatText } from "../../../utils/components/text";
import STYLES from "./ArticleNotes.module.scss";

type Props = {
  notes: string;
};

export function ArticleNotes({ notes }: Props) {
  return (
    <div className={STYLES.notes}>
      <h3>Notes</h3>
      {formatText(notes)}
    </div>
  );
}
