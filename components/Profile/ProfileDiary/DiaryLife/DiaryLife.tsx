"use client";

import STYLES from "../ProfileDiary.module.scss";

type Props = {
  maritalStatus: string | null;
  wife: string | null;
};

export function DiaryLife({ maritalStatus, wife }: Props) {
  if (maritalStatus && wife) {
    return (
      <>
        <div className={STYLES["fullwidth-main-card"]}>Life</div>
        <div className={STYLES["halfwidth-cards-container"]}>
          <div className={STYLES["halfwidth-secondary-card"]}>
            <div className={STYLES["halfwidth-secondary-card-title"]}>
              <p>Marital Status</p>
            </div>
            <div>
              <span>{maritalStatus}</span>
            </div>
          </div>
          <div className={STYLES["halfwidth-secondary-card"]}>
            <div className={STYLES["halfwidth-secondary-card-title"]}>
              <p>Wife</p>
            </div>
            <div>
              <span>{wife}</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (maritalStatus && !wife) {
    return (
      <div className={STYLES["halfwidth-cards-container"]}>
        <div className={STYLES["halfwidth-main-card"]}>
          <span>Life</span>
        </div>
        <div className={STYLES["halfwidth-secondary-card"]}>
          <div className={STYLES["halfwidth-secondary-card-title"]}>
            <p>Marital Status</p>
          </div>
          <div>
            <span>{maritalStatus}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
