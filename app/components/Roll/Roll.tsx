"use client";

import { useState } from "react";
import { RollAlphabet } from "./RollAlphabet/RollAlphabet";
import { Title } from "../Title/Title";
import { Tunneller } from "../../types/tunnellers";

import STYLES from "./Roll.module.scss";

type Props = {
  tunnellers: Record<string, Tunneller[]>;
};

export function Roll({ tunnellers }: Props) {
  const [filterByLetter, setFilterByLetter] = useState("");

  if (tunnellers) {
    const letters = Object.keys(tunnellers);
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
                  onClick={() => setFilterByLetter(letter)}
                  aria-label={`Filter names by the letter ${letter}`}
                >
                  {letter}
                </button>
              ))}
              <button
                type="button"
                key="All"
                className={STYLES.letter}
                onClick={() => setFilterByLetter("")}
                aria-label="Remove the filter by name"
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
  return null;
}
