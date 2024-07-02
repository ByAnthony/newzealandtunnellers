"use client";

import { useState } from "react";
import { RollAlphabet } from "./RollAlphabet/RollAlphabet";
import { Title } from "../Title/Title";
import { Tunneller, TunnellerWithFullNameData } from "@/types/tunnellers";

import STYLES from "./Roll.module.scss";

type Props = {
  tunnellers: TunnellerWithFullNameData[];
};

export function Roll({ tunnellers }: Props) {
  const roll: Record<string, Tunneller[]> = tunnellers.reduce(
    (
      acc: Record<string, Tunneller[]>,
      tunneller: TunnellerWithFullNameData,
    ) => {
      const firstLetter: string = tunneller.surname.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push({
        ...tunneller,
        name: {
          surname: tunneller.surname,
          forename: tunneller.forename,
        },
      });
      return acc;
    },
    {} as { [key: string]: Tunneller[] },
  );

  const [filterByLetter, setFilterByLetter] = useState("");
  const letters = Object.keys(roll);
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
          <RollAlphabet tunnellers={roll} filterByLetter={filterByLetter} />
        </div>
      </div>
    </>
  );
}
