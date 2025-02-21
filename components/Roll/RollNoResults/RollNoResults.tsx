"use client";

import STYLES from "./RollNoResults.module.scss";

type Props = {
  handleResetFilters: () => void;
};

export function RollNoResults({ handleResetFilters }: Props) {
  return (
    <div className={STYLES["no-results"]}>
      <p>Sorry, no profile matches your filters</p>
      <button onClick={handleResetFilters}>Clear Filter</button>
    </div>
  );
}
