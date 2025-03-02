"use client";

import { RollDetails } from "@/components/Roll/RollDetails/RollDetails";
import { Tunneller } from "@/types/tunnellers";

import STYLES from "./RollAlphabet.module.scss";

type Props = {
  tunnellers: [string, Tunneller[]][];
  isLoaded: boolean;
};

export function RollAlphabet({ tunnellers, isLoaded }: Props) {
  return (
    <div className={STYLES.roll}>
      {tunnellers.map(([key, listOfTunnellers]) => (
        <div id={`letter-${key}`} key={key}>
          <div className={STYLES["letter-container"]}>
            <h2 className={STYLES.title} key={key} aria-label={`Letter ${key}`}>
              {key}
            </h2>
          </div>
          <div className={STYLES["tunnellers-container"]}>
            <RollDetails
              listOfTunnellers={listOfTunnellers}
              isLoaded={isLoaded}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
