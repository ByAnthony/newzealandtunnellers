"use client";

import { useState } from "react";

import { RollDetails } from "@/components/Roll/RollDetails/RollDetails";
import { Tunneller } from "@/types/tunnellers";

import STYLES from "./RollAlphabet.module.scss";

type Props = {
  tunnellers: [string, Tunneller[]][];
  isLoaded: boolean;
};

export function RollAlphabet({ tunnellers, isLoaded }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const flattenedTunnellers = tunnellers.flatMap(([key, listOfTunnellers]) =>
    listOfTunnellers.map((tunneller) => ({ key, tunneller })),
  );

  const totalPages = Math.ceil(flattenedTunnellers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTunnellers = flattenedTunnellers.slice(startIndex, endIndex);

  const groupedTunnellers = currentTunnellers.reduce(
    (acc, { key, tunneller }) => {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(tunneller);
      return acc;
    },
    {} as Record<string, Tunneller[]>,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className={STYLES.roll}>
      {Object.entries(groupedTunnellers).map(([key, listOfTunnellers]) => (
        <div id={`letter-${key}`} key={key}>
          {isLoaded && (
            <div className={STYLES["letter-container"]}>
              <h2
                className={STYLES.title}
                key={key}
                aria-label={`Letter ${key}`}
              >
                {key}
              </h2>
            </div>
          )}
          <div className={STYLES["tunnellers-container"]}>
            <RollDetails
              listOfTunnellers={listOfTunnellers}
              isLoaded={isLoaded}
            />
          </div>
        </div>
      ))}
      <div className={STYLES.pagination}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={STYLES["pagination-button"]}
        >
          Previous
        </button>
        <span className={STYLES["pagination-info"]}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={STYLES["pagination-button"]}
        >
          Next
        </button>
      </div>
    </div>
  );
}
