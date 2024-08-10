"use client";

import { History } from "@/components/HomePage/History/History";
import { Tunnellers } from "@/components/HomePage/Tunnellers/Tunnellers";

import STYLES from "./HomePage.module.scss";

type Props = {
  homepage: any;
};

export function HomePage({ homepage }: Props) {
  return (
    <div className={STYLES["homepage-container"]}>
      <Tunnellers />
      <History articles={homepage.historyChapters} />
    </div>
  );
}
