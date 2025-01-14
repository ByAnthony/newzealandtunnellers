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
  const tunnellersList = Object.entries(tunnellers);

  const uniqueDetachments = Array.from(
    new Set(
      tunnellersList.flatMap(([, lists]) =>
        lists.map((item) => item.detachment),
      ),
    ),
  ).sort((a, b) => {
    if (a === "Main Body") return -1;
    if (b === "Main Body") return 1;

    const aMatch = a.match(/(\d+)(st|nd|rd|th) Reinforcements/);
    const bMatch = b.match(/(\d+)(st|nd|rd|th) Reinforcements/);

    if (aMatch && bMatch) {
      return parseInt(aMatch[1], 10) - parseInt(bMatch[1], 10);
    }

    return a.localeCompare(b);
  });

  const tunnellerFilters: Record<string, string[]> = {
    detachment: uniqueDetachments,
  };

  const [filters, setFilters] =
    useState<Record<string, string[]>>(tunnellerFilters);
  // const letters = Object.keys(tunnellers);

  // useEffect(() => {
  //   const item = window.localStorage.getItem("filters");
  //   if (item) {
  //     setFilters(JSON.parse(item));
  //   } else {
  //     setFilters([]);
  //   }
  // }, []);

  const handleFilter = (filter: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters.detachment.includes(filter)) {
        newFilters.detachment = newFilters.detachment.filter(
          (f) => f !== filter,
        );
      } else {
        newFilters.detachment = [...newFilters.detachment, filter];
      }
      // window.localStorage.setItem("filters", JSON.stringify(newFilters));
      return newFilters;
    });
  };

  const isFiltered = (
    filters: Record<string, string[]>,
  ): [string, Tunneller[]][] =>
    filters.detachment.length === 0
      ? []
      : tunnellersList
          .map(
            ([group, tunnellers]) =>
              [
                group,
                tunnellers.filter((tunneller) =>
                  filters.detachment.includes(tunneller.detachment),
                ),
              ] as [string, Tunneller[]],
          )
          .filter(([, filteredTunnellers]) => filteredTunnellers.length > 0);

  const totalTunnellers = isFiltered(filters).reduce(
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
            <div>
              <h3>Detachment</h3>
              {uniqueDetachments.map((detachement) => (
                <div key={detachement}>
                  <input
                    type="checkbox"
                    id={detachement}
                    name={detachement}
                    value={detachement}
                    onChange={() => handleFilter(detachement)}
                    checked={
                      filters.detachment.includes(detachement) ? true : false
                    }
                  />
                  {detachement}
                  <br />
                </div>
              ))}
            </div>
          </div>
          <RollAlphabet tunnellers={isFiltered(filters)} />
        </div>
      </div>
    </>
  );
}
