"use client";

import { HistoryChapters } from "./HistoryChapters/HistoryChapters";
import { TunnellersImages } from "./TunnellersImages/TunnellersImages";

import STYLES from "./HomePage.module.scss";

type Props = {
  homepage: any;
};

export function HomePage({ homepage }: Props) {
  return (
    <div className={STYLES["homepage-container"]}>
      <TunnellersImages images={homepage.tunnellers} />
      <div className={STYLES.intro}>
        <h1>
          The Kiwis who
          <br />
          fought underground
          <br />
          during World War I
        </h1>
      </div>
      <HistoryChapters articles={homepage.historyChapters} />
    </div>
  );
}
