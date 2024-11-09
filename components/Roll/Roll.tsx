"use client";

import { useState } from "react";

import { RollAlphabet } from "@/components/Roll/RollAlphabet/RollAlphabet";
import { Title } from "@/components/Title/Title";
import { Tunneller } from "@/types/tunnellers";

import STYLES from "./Roll.module.scss";

type Props = {
  tunnellers: Record<string, Tunneller[]>;
};

export function Roll({ tunnellers }: Props) {
  const stateLetter = JSON.parse(
    typeof window !== "undefined"
      ? window.localStorage.getItem("letter") || '""'
      : '""',
  );
  const [filterByLetter, setFilterByLetter] = useState(stateLetter || "");
  const letters = Object.keys(tunnellers);

  const addFilter = (letter: string) => {
    setFilterByLetter(letter);
    window.localStorage.setItem("letter", JSON.stringify(letter));
    window.scrollTo(0, 0);
  };

  const removeFilter = () => {
    setFilterByLetter("");
    window.localStorage.setItem("letter", JSON.stringify(""));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className={STYLES.container}>
        <div className={STYLES.header}>
          <Title title={"The New Zealand\\Tunnellers"} />
        </div>
        <div className={STYLES["roll-container"]}>
          <div className={STYLES.alphabet}>
            {letters.map((letter) => (
              <button
                type="button"
                key={letter}
                className={STYLES.letter}
                onClick={() => addFilter(letter)}
                aria-label={`Filter names by the letter ${letter}`}
              >
                {letter}
              </button>
            ))}
            <button
              type="button"
              key="All"
              className={STYLES.letter}
              onClick={() => removeFilter()}
              aria-label="Remove the filter by letter"
            >
              All
            </button>
          </div>
          <RollAlphabet
            tunnellers={tunnellers}
            filterByLetter={filterByLetter}
          />
        </div>
      </div>
    </>
  );
}
