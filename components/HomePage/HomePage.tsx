"use client";

import { HistoryChapters } from "@/components/HomePage/HistoryChapters/HistoryChapters";

import STYLES from "./HomePage.module.scss";

type Props = {
  homepage: any;
};

export function HomePage({ homepage }: Props) {
  return (
    <div className={STYLES["homepage-container"]}>
      <div className={STYLES.intro}>
        <h1>
          The New Zealanders who
          <br />
          fought underground
          <br />
          during World War I
        </h1>
      </div>
      {/* <TunnellersImages images={homepage.tunnellers} /> */}
      <HistoryChapters articles={homepage.historyChapters} />
    </div>
  );
}
