"use client";

import { useEffect, useState } from "react";

import { RollAlphabet } from "@/components/Roll/RollAlphabet/RollAlphabet";
import { Title } from "@/components/Title/Title";
import { Tunneller } from "@/types/tunnellers";

import STYLES from "./Roll.module.scss";

type Props = {
  tunnellers: Record<string, Tunneller[]>;
};

export function Roll({ tunnellers }: Props) {
  const [filterByLetter, setFilterByLetter] = useState("");
  const letters = Object.keys(tunnellers);

  useEffect(() => {
    const item = window.localStorage.getItem("letter");
    if (item) {
      setFilterByLetter(JSON.parse(item));
    } else {
      setFilterByLetter("");
    }
  }, []);

  const handleFilter = (letter: string) => {
    setFilterByLetter(letter);
    window.localStorage.setItem("letter", JSON.stringify(letter));
    window.scrollTo(0, 0);
  };

  const tunnellersList = Object.entries(tunnellers);
  const isFilteredByLetter = (letter: string) =>
    letter === ""
      ? tunnellersList
      : tunnellersList.filter((key) => key.includes(letter));
  const totalTunnellers = isFilteredByLetter(filterByLetter).reduce(
    (acc, [, tunnellers]) => acc + tunnellers.length,
    0,
  );

  return (
    <>
      <div className={STYLES.container}>
        <div className={STYLES.header}>
          <Title title={"The New Zealand\\Tunnellers"} />
        </div>
        <div className={STYLES["roll-container"]}>
          <div className={STYLES.controls}>
            <div className={STYLES.total}>
              {totalTunnellers > 1
                ? `${totalTunnellers} results`
                : `${totalTunnellers} result`}
            </div>
            <div className={STYLES.alphabet}>
              {letters.map((letter) => (
                <button
                  type="button"
                  key={letter}
                  className={STYLES.letter}
                  onClick={() => handleFilter(letter)}
                  aria-label={`Filter names by the letter ${letter}`}
                >
                  {letter}
                </button>
              ))}
              <button
                type="button"
                key="All"
                className={STYLES.letter}
                onClick={() => handleFilter("")}
                aria-label="Remove the filter by letter"
              >
                All
              </button>
            </div>
          </div>
          <RollAlphabet tunnellers={isFilteredByLetter(filterByLetter)} />
        </div>
      </div>
    </>
  );
}
