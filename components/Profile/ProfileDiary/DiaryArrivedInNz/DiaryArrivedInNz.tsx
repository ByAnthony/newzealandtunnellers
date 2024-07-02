"use client";

import STYLES from "../ProfileDiary.module.scss";

type Props = {
  inNzLength: string | null;
};

export function DiaryArrivedInNz({ inNzLength }: Props) {
  return inNzLength ? (
    <div className={STYLES["fullwidth-main-card"]}>
      <p>Settled in New Zealand</p>
      <span>{inNzLength}</span>
    </div>
  ) : null;
}
