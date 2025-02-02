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

type Filters = {
  detachment?: string[];
  birthYear?: string[];
  deathYear?: string[];
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
      tunnellersList.flatMap(([, lists]) =>
        lists.map((item) =>
          item.birthYear === null ? "1850" : item.birthYear,
        ),
      ),
    ),
  ).sort((a, b) => {
    if (a === "null") return -1;
    if (b === "null") return 1;
    return Number(a) - Number(b);
  });

  const uniqueDeathYears = Array.from(
    new Set(
      tunnellersList.flatMap(([, lists]) =>
        lists.map((item) =>
          item.deathYear === null ? "1990" : item.deathYear,
        ),
      ),
    ),
  ).sort((a, b) => {
    if (a === "null") return 1;
    if (b === "null") return -1;
    return Number(a) - Number(b);
  });

  const filterList = {
    detachment: uniqueDetachments,
    birthYear: uniqueBirthYears,
    deathYear: uniqueDeathYears,
  };
  const [filters, setFilters] = useState<Filters>(filterList);

  // useEffect(() => {
  //   const item = window.localStorage.getItem("filters");
  //   if (item) {
  //     setFilters(JSON.parse(item));
  //   } else {
  //     setFilters([]);
  //   }
  // }, []);

  const handleFilter = (filters: {
    detachment?: string[];
    birthYear?: number[];
    deathYear?: number[];
  }) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (filters.detachment) {
        filters.detachment.forEach((detachment) => {
          if (
            prevFilters.detachment &&
            prevFilters.detachment.includes(detachment)
          ) {
            newFilters.detachment =
              newFilters.detachment &&
              newFilters.detachment.filter((f) => f !== detachment);
          } else {
            newFilters.detachment && newFilters.detachment.push(detachment);
          }
        });
      }

      if (filters.birthYear) {
        const [startYear, endYear] = filters.birthYear;
        newFilters.birthYear = uniqueBirthYears.filter(
          (year) => year >= String(startYear) && year <= String(endYear),
        );
      }

      if (filters.deathYear) {
        const [startYear, endYear] = filters.deathYear;
        newFilters.deathYear = uniqueDeathYears.filter(
          (year) => year >= String(startYear) && year <= String(endYear),
        );
      }

      return newFilters;
    });
  };

  const isFiltered = (filters: Filters): [string, Tunneller[]][] =>
    Object.values(filters).every((filter) => filter.length === 0)
      ? []
      : tunnellersList
          .map(([group, tunnellers]): [string, Tunneller[]] => [
            group,
            tunnellers
              .filter(
                (tunneller) =>
                  filters.detachment &&
                  filters.detachment.includes(tunneller.detachment),
              )
              .filter(
                (tunneller) =>
                  (filters.birthYear &&
                    filters.birthYear.includes("1850") &&
                    tunneller.birthYear === null) ||
                  (filters.birthYear &&
                    tunneller.birthYear &&
                    filters.birthYear.includes(tunneller.birthYear)),
              )
              .filter(
                (tunneller) =>
                  (filters.deathYear &&
                    filters.deathYear.includes("1990") &&
                    tunneller.deathYear === null) ||
                  (filters.deathYear &&
                    tunneller.deathYear &&
                    filters.deathYear.includes(tunneller.deathYear)),
              ),
          ])
          .filter(([, filteredTunnellers]) => filteredTunnellers.length > 0);

  const totalTunnellers = isFiltered(filters).reduce(
    (acc, [, tunnellers]) => acc + tunnellers.length,
    0,
  );

  const handleBirthSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      handleFilter({ birthYear: value });
    }
  };

  const handleDeathSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      handleFilter({ deathYear: value });
    }
  };

  const formatBirthYear = (year: string | undefined) =>
    year === "1850" ? "?" : year;

  const formattedBirthStartYear = formatBirthYear(filters.birthYear?.[0]);
  const formattedBirthEndYear = formatBirthYear(
    filters.birthYear?.[filters.birthYear.length - 1],
  );

  const formatDeathYear = (year: string | undefined) =>
    year === "1990" ? "†?" : year;

  const formattedDeathStartYear = formatDeathYear(filters.deathYear?.[0]);
  const formattedDeathEndYear = formatDeathYear(
    filters.deathYear?.[filters.deathYear.length - 1],
  );

  return (
    <>
      <div className={STYLES.container}>
        <div className={STYLES.header}>
          <Title title={"The New Zealand\\Tunnellers"} />
        </div>
        <div className={STYLES["roll-container"]}>
          <div className={STYLES.controls}>
            <p>
              {totalTunnellers > 1
                ? `${totalTunnellers} results`
                : `${totalTunnellers} result`}
            </p>
            <div className={STYLES.filters}>
              <h3>Detachment</h3>
              {uniqueDetachments.map((detachment) => (
                <div key={detachment}>
                  <input
                    type="checkbox"
                    id={detachment}
                    name={detachment}
                    value={detachment}
                    onChange={() =>
                      handleFilter({
                        detachment: uniqueDetachments.filter(
                          (d) => d === detachment,
                        ),
                      })
                    }
                    checked={
                      filters.detachment &&
                      filters.detachment.includes(detachment)
                        ? true
                        : false
                    }
                  />
                  {detachment}
                </div>
              ))}
            </div>
            <div className={STYLES.filters}>
              <h3>Birth Years</h3>
              <p>
                {formattedBirthStartYear}
                {formattedBirthEndYear &&
                formattedBirthEndYear !== formattedBirthStartYear
                  ? `-${formattedBirthEndYear}`
                  : ""}
              </p>
              <Slider
                range
                min={Number(uniqueBirthYears[0])}
                max={Number(uniqueBirthYears[uniqueBirthYears.length - 1])}
                value={[
                  Number(filters.birthYear && filters.birthYear[0]),
                  Number(
                    filters.birthYear &&
                      filters.birthYear[filters.birthYear.length - 1],
                  ),
                ]}
                onChange={handleBirthSliderChange}
                allowCross={false}
              />
            </div>
            <div className={STYLES.filters}>
              <h3>Death Years</h3>
              <p>
                {formattedDeathStartYear}
                {formattedDeathEndYear &&
                formattedDeathEndYear !== formattedDeathStartYear
                  ? `-${formattedDeathEndYear}`
                  : ""}
              </p>
              <Slider
                range
                min={Number(uniqueDeathYears[0])}
                max={Number(uniqueDeathYears[uniqueDeathYears.length - 1])}
                value={[
                  Number(filters.deathYear && filters.deathYear[0]),
                  Number(
                    filters.deathYear &&
                      filters.deathYear[filters.deathYear.length - 1],
                  ),
                ]}
                onChange={handleDeathSliderChange}
                allowCross={false}
              />
            </div>
          </div>
          <RollAlphabet tunnellers={isFiltered(filters)} />
        </div>
      </div>
    </>
  );
}
