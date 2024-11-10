"use client";

import { useEffect } from "react";

import { History } from "@/components/HomePage/History/History";
import { Tunnellers } from "@/components/HomePage/Tunnellers/Tunnellers";
import { HistoryChapter } from "@/types/homepage";

import STYLES from "./HomePage.module.scss";

type Props = {
  homepage: {
    historyChapters: HistoryChapter[];
  };
};

export function HomePage({ homepage }: Props) {
  useEffect(() => {
    window.localStorage.clear();
  }, []);

  return (
    <div className={STYLES["homepage-container"]}>
      <Tunnellers />
      <History articles={homepage.historyChapters} />
    </div>
  );
}
