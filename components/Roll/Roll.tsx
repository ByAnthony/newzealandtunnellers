"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
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

  const uniqueDetachments: string[] = Array.from(
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

  const uniqueBirthYears = Array.from(
    new Set(
      tunnellersList
        .flatMap(([, lists]) => lists.map((item) => item.birthYear))
        .filter((birthYear) => birthYear !== null),
    ),
  ).sort((a, b) => Number(a) - Number(b));

  const filterList = {
    detachment: uniqueDetachments,
    birthYear: uniqueBirthYears,
  };
  const [filters, setFilters] = useState<Record<string, string[]>>(filterList);

  // useEffect(() => {
  //   const item = window.localStorage.getItem("filters");
  //   if (item) {
  //     setFilters(JSON.parse(item));
  //   } else {
  //     setFilters([]);
  //   }
  // }, []);

  const handleFilter = (filter: { detachment?: string[], birthYear?: number[] }) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
  
      if (filter.detachment) {
        newFilters.detachment = filter.detachment;
      }
  
      if (filter.birthYear) {
        const [startYear, endYear] = filter.birthYear.map(Number);
        newFilters.birthYear = uniqueBirthYears.filter(
          (year) => Number(year) >= startYear && Number(year) <= endYear
        ).map(String);
      }
  
      console.log(newFilters);
      return newFilters;
    });
  };

  const isFiltered = (
    filters: Record<string, string[]>,
  ): [string, Tunneller[]][] =>
    Object.values(filters).every((filter) => filter.length === 0)
      ? []
      : tunnellersList
          .map(([group, tunnellers]): [string, Tunneller[]] => [
            group,
            tunnellers
              .filter((tunneller) =>
                filters.detachment.includes(tunneller.detachment),
              )
              .filter(
                (tunneller) =>
                  tunneller.birthYear === null ||
                  filters.birthYear.includes(tunneller.birthYear),
              ),
          ])
          .filter(([, filteredTunnellers]) => filteredTunnellers.length > 0);

  const totalTunnellers = isFiltered(filters).reduce(
    (acc, [, tunnellers]) => acc + tunnellers.length,
    0,
  );

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      handleFilter({ birthYear: value});
    }
  };

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
            <div className={STYLES.detachment}>
              <h3>Detachment</h3>
              {uniqueDetachments.map((detachment) => (
                <div key={detachment}>
                  <input
                    type="checkbox"
                    id={detachment}
                    name={detachment}
                    value={detachment}
                    onChange={() =>
                      handleFilter(
                        { detachment: uniqueDetachments.filter((d) => d === detachment) },
                      )
                    }
                    checked={
                      filters.detachment.includes(detachment) ? true : false
                    }
                  />
                  {detachment}
                </div>
              ))}
            </div>
            <div className={STYLES.detachment}>
              <h3>Birth Years</h3>
              <Slider 
                range
                min={Number(uniqueBirthYears[0])}
                max={Number(uniqueBirthYears[uniqueBirthYears.length - 1])}
                value={[Number(filters.birthYear[0]), Number(filters.birthYear[filters.birthYear.length - 1])]}
                onChange={handleSliderChange}
              />
              {/* {uniqueBirthYears.map((year) => (
                <div key={year}>
                  <input
                    type="checkbox"
                    id={year}
                    name={year}
                    value={year}
                    onChange={() =>
                      handleFilter(uniqueBirthYears.filter((y) => y === year))
                    }
                    checked={filters.birthYear.includes(year) ? true : false}
                  />
                  {year}
                </div>
              ))} */}
            </div>
          </div>
          <RollAlphabet tunnellers={isFiltered(filters)} />
        </div>
      </div>
    </>
  );
}
