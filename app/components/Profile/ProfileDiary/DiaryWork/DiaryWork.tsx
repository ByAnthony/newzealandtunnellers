"use client";

import { Employment } from "../../../../types/tunneller";

import STYLES from "../ProfileDiary.module.scss";

type Props = {
  employment: Employment;
};

export function DiaryWork({ employment }: Props) {
  if (employment.occupation !== null && employment.employer !== null) {
    return (
      <>
        <div className={STYLES["fullwidth-main-card"]}>Work</div>
        <div className={STYLES["halfwidth-cards-container"]}>
          <div className={STYLES["halfwidth-secondary-card"]}>
            <div className={STYLES["halfwidth-secondary-card-title"]}>
              <p>Occupation</p>
            </div>
            <div>
              <span>{employment.occupation}</span>
            </div>
          </div>
          <div className={STYLES["halfwidth-secondary-card"]}>
            <div className={STYLES["halfwidth-secondary-card-title"]}>
              <p>Employer</p>
            </div>
            <div>
              <span>{employment.employer}</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  const displayOccupation = (occupation: string | null) => (
    <div className={STYLES["halfwidth-cards-container"]}>
      <div className={STYLES["halfwidth-main-card"]}>
        <span>Work</span>
      </div>
      <div className={STYLES["halfwidth-secondary-card"]}>
        <div className={STYLES["halfwidth-secondary-card-title"]}>
          <p>Occupation</p>
        </div>
        <div>
          <span>{occupation}</span>
        </div>
      </div>
    </div>
  );

  if (employment.occupation !== null && employment.employer === null) {
    return displayOccupation(employment.occupation);
  }
  return null;
}
