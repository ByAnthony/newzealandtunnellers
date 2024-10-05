"use client";

import STYLES from "../ProfileDiary.module.scss";

type Props = {
  residence: string | null;
};

export function DiaryHometown({ residence }: Props) {
  return residence ? (
    <div className={STYLES["halfwidth-cards-container"]}>
      <div className={STYLES["halfwidth-main-card"]}>
        <span>Residence</span>
      </div>
      <div className={STYLES["halfwidth-secondary-card"]}>
        <div className={STYLES["halfwidth-secondary-card-title"]}>
          <p>Hometown</p>
        </div>
        <div>
          <span>{residence}</span>
        </div>
      </div>
    </div>
  ) : null;
}
