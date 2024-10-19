"use client";

import { Death } from "@/types/tunneller";

import STYLES from "../ProfileDiary.module.scss";

type Props = {
  death: Death | null;
};

export function DiaryDied({ death }: Props) {
  const title = (ageAtDeath: number | null) =>
    ageAtDeath ? <p>{`Died at the age of ${ageAtDeath}`}</p> : <p>Died</p>;

  if (death && death.date) {
    return (
      <>
        <h3>Death</h3>
        <div className={STYLES["fullwidth-main-card"]}>
          {title(death.ageAtDeath)}
          <span>{`${death.date.dayMonth} ${death.date.year}`}</span>
        </div>
      </>
    );
  }
  return null;
}
