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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 2; // Number of pages to show around the current page

    if (totalPages <= maxVisiblePages + 4) {
      // Show all pages if total pages are small
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      // Always show the first page
      buttons.push(1);

      // Add ellipsis if currentPage is far from the first page
      if (currentPage > maxVisiblePages + 1) {
        buttons.push("...");
      }

      // Add pages around the current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        buttons.push(i);
      }

      // Add ellipsis if currentPage is far from the last page
      if (currentPage < totalPages - maxVisiblePages) {
        buttons.push("...");
      }

      // Always show the last page
      buttons.push(totalPages);
    }

    return buttons;
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
        {getPaginationButtons().map((button, index) =>
          typeof button === "number" ? (
            <button
              key={index}
              onClick={() => handlePageClick(button)}
              className={`${STYLES["pagination-button"]} ${
                button === currentPage ? STYLES.active : ""
              }`}
            >
              {button}
            </button>
          ) : (
            <span key={index} className={STYLES["pagination-ellipsis"]}>
              {button}
            </span>
          ),
        )}
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
