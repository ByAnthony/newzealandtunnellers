"use client";

import { Parent, Parents } from "../../../../types/tunneller";

import STYLES from "../ProfileDiary.module.scss";

type Props = {
  parents: Parents;
};

export function DiaryParents({ parents }: Props) {
  if (parents.mother !== null && parents.father !== null) {
    return (
      <>
        <div className={STYLES["fullwidth-main-card"]}>Parents</div>
        <div className={STYLES["halfwidth-cards-container"]}>
          <div className={STYLES["halfwidth-secondary-card"]}>
            <p>Mother</p>
            <span>{parents.mother.name}</span>
          </div>
          <div className={STYLES["halfwidth-secondary-card"]}>
            <p>Father</p>
            <span>{parents.father.name}</span>
          </div>
        </div>
      </>
    );
  }

  const isMotherOrFather = parents.mother ? "Mother" : "Father";

  const displayParent = (parent: Parent) => (
    <div className={STYLES["halfwidth-cards-container"]}>
      <div className={STYLES["halfwidth-main-card"]}>
        <span>Parent</span>
      </div>
      <div className={STYLES["halfwidth-secondary-card"]}>
        <p>{isMotherOrFather}</p>
        <span>{parent.name}</span>
      </div>
    </div>
  );

  if (parents.mother !== null && parents.father === null) {
    return displayParent(parents.mother);
  }
  if (parents.mother === null && parents.father !== null) {
    return displayParent(parents.father);
  }

  return null;
}
