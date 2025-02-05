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
  detachment: string[];
  corps: string[];
  ranks: Record<string, string[]>;
  birthYear: string[];
  unknownBirthYear: string;
  deathYear: string[];
  unknownDeathYear: string;
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

  const uniquecorps: string[] = Array.from(
    new Set(
      tunnellersList.flatMap(([, lists]) =>
        lists.map((item) =>
          item.attachedCorps === null ? "Tunnelling Corps" : item.attachedCorps,
        ),
      ),
    ),
  ).sort((a, b) => {
    if (a === "Tunnelling Corps") return -1;
    if (b === "Tunnelling Corps") return 1;
    return a.localeCompare(b);
  });

  const rankCategories: Record<string, string[]> = {
    Officers: ["Major", "Captain", "Lieutenant", "Second Lieutenant"],
    "Non-Commissioned Officers": [
      "Sergeant Major",
      "Company Sergeant Major",
      "Quartermaster Sergeant",
      "Company Quartermaster Sergeant",
      "Sergeant",
      "Corporal",
      "Second Corporal",
    ],
    "Other Ranks": ["Lance Corporal", "Motor Mechanic", "Sapper", "Driver"],
  };

  const uniqueRanks = Array.from(
    new Set(
      tunnellersList.flatMap(([, lists]) => lists.map((item) => item.rank)),
    ),
  );

  const sortedRanks = Object.fromEntries(
    Object.entries(
      uniqueRanks.reduce((acc: Record<string, string[]>, rank) => {
        const category: string | undefined = Object.keys(rankCategories).find(
          (category) => rankCategories[category].includes(rank),
        );

        if (category) {
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(rank);
        }

        return acc;
      }, {}),
    )
      .sort(
        ([keyA], [keyB]) =>
          Object.keys(rankCategories).indexOf(keyA) -
          Object.keys(rankCategories).indexOf(keyB),
      )
      .map(([key, value]) => [
        key,
        value.sort(
          (a, b) =>
            rankCategories[key].indexOf(a) - rankCategories[key].indexOf(b),
        ),
      ]),
  );

  const uniqueBirthYears: string[] = Array.from(
    new Set(
      tunnellersList.flatMap(([, lists]) =>
        lists.map((item) => item.birthYear).filter((year) => year !== null),
      ),
    ),
  ).sort((a, b) => {
    if (a === "null") return -1;
    if (b === "null") return 1;
    return Number(a) - Number(b);
  });

  const uniqueDeathYears: string[] = Array.from(
    new Set(
      tunnellersList.flatMap(([, lists]) =>
        lists.map((item) => item.deathYear).filter((year) => year !== null),
      ),
    ),
  ).sort((a, b) => {
    if (a === "null") return -1;
    if (b === "null") return 1;
    return Number(a) - Number(b);
  });

  const filterList: Filters = {
    detachment: [],
    corps: [],
    ranks: {},
    birthYear: uniqueBirthYears,
    unknownBirthYear: "unknown",
    deathYear: uniqueDeathYears,
    unknownDeathYear: "unknown",
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
    detachment?: string;
    corps?: string;
    ranks?: Record<string, string[]>;
    birthYear?: number[];
    unknownBirthYear?: string;
    deathYear?: number[];
    unknownDeathYear?: string;
  }) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (filters.detachment) {
        if (!newFilters.detachment) {
          newFilters.detachment = [];
        }
        if (newFilters.detachment.includes(filters.detachment)) {
          newFilters.detachment = newFilters.detachment.filter(
            (detachment) => detachment !== filters.detachment,
          );
        } else {
          newFilters.detachment.push(filters.detachment);
        }
      }

      if (filters.corps) {
        if (!newFilters.corps) {
          newFilters.corps = [];
        }
        if (newFilters.corps.includes(filters.corps)) {
          newFilters.corps = newFilters.corps.filter(
            (corps) => corps !== filters.corps,
          );
        } else {
          newFilters.corps.push(filters.corps);
        }
      }

      if (filters.ranks) {
        newFilters.ranks = { ...newFilters.ranks };

        Object.entries(filters.ranks).forEach(([category, ranks]) => {
          if (!newFilters.ranks[category]) {
            newFilters.ranks[category] = [];
          }

          ranks.forEach((rank) => {
            const categoryRanks = newFilters.ranks[category];

            if (categoryRanks.includes(rank)) {
              newFilters.ranks[category] = categoryRanks.filter(
                (r) => r !== rank,
              );
            } else {
              categoryRanks.push(rank);
            }
          });
        });
      }

      if (filters.birthYear) {
        const [startYear, endYear] = filters.birthYear;
        newFilters.birthYear = uniqueBirthYears.filter(
          (year) => year >= String(startYear) && year <= String(endYear),
        );
      }

      if (filters.unknownBirthYear !== undefined) {
        newFilters.unknownBirthYear = filters.unknownBirthYear;
      }

      if (filters.deathYear) {
        const [startYear, endYear] = filters.deathYear;
        newFilters.deathYear = uniqueDeathYears.filter(
          (year) => year >= String(startYear) && year <= String(endYear),
        );
      }

      if (filters.unknownDeathYear !== undefined) {
        newFilters.unknownDeathYear = filters.unknownDeathYear;
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
              .filter((tunneller) => {
                const detachmentMatch =
                  !filters.detachment ||
                  filters.detachment.length === 0 ||
                  filters.detachment.includes(tunneller.detachment);
                return detachmentMatch;
              })
              .filter((tunneller) => {
                const corpsMatch =
                  !filters.corps ||
                  filters.corps.length === 0 ||
                  (filters.corps &&
                    filters.corps.includes("Tunnelling Corps") &&
                    tunneller.attachedCorps === null) ||
                  filters.corps.includes(tunneller.attachedCorps);
                return corpsMatch;
              })
              .filter((tunneller) => {
                if (
                  !filters.ranks ||
                  Object.values(filters.ranks).every(
                    (ranks) => ranks.length === 0,
                  )
                ) {
                  return true;
                }
                return Object.entries(filters.ranks).some(([, ranks]) =>
                  ranks.includes(tunneller.rank),
                );
              })
              .filter((tunneller) => {
                const birthYearMatch =
                  (filters.unknownBirthYear === "unknown" &&
                    tunneller.birthYear === null) ||
                  (filters.birthYear &&
                    filters.birthYear.length > 0 &&
                    tunneller.birthYear &&
                    filters.birthYear.includes(tunneller.birthYear));
                return birthYearMatch;
              })
              .filter((tunneller) => {
                const DeathYearMatch =
                  (filters.unknownDeathYear === "unknown" &&
                    tunneller.deathYear === null) ||
                  (filters.deathYear &&
                    filters.deathYear.length > 0 &&
                    tunneller.deathYear &&
                    filters.deathYear.includes(tunneller.deathYear));
                return DeathYearMatch;
              }),
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

  const startBirthYear = filters.birthYear?.[0];
  const endBirthYear = filters.birthYear?.[filters.birthYear.length - 1];
  const startDeathYear = filters.deathYear?.[0];
  const endDeathYear = filters.deathYear?.[filters.deathYear.length - 1];

  return (
    <>
      <div className={STYLES.container}>
        <div className={STYLES.header}>
          <Title title={"The New Zealand\\Tunnellers"} />
        </div>
        <div className={STYLES["roll-container"]}>
          <div className={STYLES.controls}>
            <p className={STYLES.results}>
              {totalTunnellers > 1
                ? `${totalTunnellers} results`
                : `${totalTunnellers} result`}
            </p>
            <div className={STYLES.filters}>
              <h3>Detachments</h3>
              {uniqueDetachments.map((detachment) => (
                <div key={detachment}>
                  <input
                    type="checkbox"
                    id={detachment}
                    name={detachment}
                    value={detachment}
                    onChange={() =>
                      handleFilter({
                        detachment: detachment,
                      })
                    }
                    checked={
                      filters.detachment &&
                      filters.detachment.includes(detachment)
                        ? true
                        : false
                    }
                  />
                  <label htmlFor={detachment}>{detachment}</label>
                </div>
              ))}
            </div>
            <div className={STYLES.filters}>
              <h3>Corps</h3>
              {uniquecorps.map((corps) => (
                <div key={corps}>
                  <input
                    type="checkbox"
                    id={corps}
                    name={corps}
                    value={corps}
                    onChange={() =>
                      handleFilter({
                        corps: corps,
                      })
                    }
                    checked={
                      filters.corps && filters.corps.includes(corps)
                        ? true
                        : false
                    }
                  />
                  <label htmlFor={corps}>{corps}</label>
                </div>
              ))}
            </div>
            <div className={STYLES.filters}>
              <h3>Birth Years</h3>
              <p>
                {startBirthYear}
                {endBirthYear && endBirthYear !== startBirthYear
                  ? `-${endBirthYear}`
                  : ""}
              </p>
              <Slider
                range
                min={Number(uniqueBirthYears[0])}
                max={Number(uniqueBirthYears[uniqueBirthYears.length - 1])}
                value={[Number(startBirthYear), Number(endBirthYear)]}
                onChange={handleBirthSliderChange}
                allowCross={false}
              />
              <div style={{ marginTop: "15px" }}>
                <input
                  type="checkbox"
                  id={"unknownBirthYear"}
                  name={"unknownBirthYear"}
                  value={"unknownBirthYear"}
                  onChange={() =>
                    handleFilter({
                      unknownBirthYear:
                        filters.unknownBirthYear === "unknown" ? "" : "unknown",
                    })
                  }
                  checked={
                    filters.unknownBirthYear === "unknown" ? true : false
                  }
                />
                <label htmlFor={"unknownBirthYear"}>
                  Include unknown birth year
                </label>
              </div>
            </div>
            <div className={STYLES.filters}>
              <h3>Death Years</h3>
              <p>
                {startDeathYear}
                {endDeathYear && endDeathYear !== startDeathYear
                  ? `-${endDeathYear}`
                  : ""}
              </p>
              <Slider
                range
                min={Number(uniqueDeathYears[0])}
                max={Number(uniqueDeathYears[uniqueDeathYears.length - 1])}
                value={[Number(startDeathYear), Number(endDeathYear)]}
                onChange={handleDeathSliderChange}
                allowCross={false}
              />
              <div style={{ marginTop: "15px" }}>
                <input
                  type="checkbox"
                  id={"unknownDeathYear"}
                  name={"unknownDeathYear"}
                  value={"unknownDeathYear"}
                  onChange={() =>
                    handleFilter({
                      unknownDeathYear:
                        filters.unknownDeathYear === "unknown" ? "" : "unknown",
                    })
                  }
                  checked={
                    filters.unknownDeathYear === "unknown" ? true : false
                  }
                />
                <label htmlFor={"unknownDeathYear"}>
                  Include unknown death year
                </label>
              </div>
              <div className={STYLES.filters}>
                <h3>Ranks</h3>
                {Object.entries(sortedRanks).map(([category, ranks]) => (
                  <div key={category} style={{ marginBottom: "15px" }}>
                    <input
                      type="checkbox"
                      id={category}
                      name={category}
                      value={category}
                      onChange={() =>
                        handleFilter({ ranks: { [category]: ranks } })
                      }
                      checked={
                        ranks.every((rank) =>
                          filters.ranks?.[category]?.includes(rank),
                        )
                          ? true
                          : false
                      }
                    />
                    <label htmlFor={category} style={{ fontWeight: "600" }}>
                      {category}
                    </label>
                    {ranks.map((rank) => (
                      <div key={rank} style={{ marginLeft: "15px" }}>
                        <input
                          type="checkbox"
                          id={rank}
                          name={rank}
                          value={rank}
                          onChange={() =>
                            handleFilter({
                              ranks: {
                                [category]: [rank],
                              },
                            })
                          }
                          checked={
                            filters.ranks?.[category]?.includes(rank)
                              ? true
                              : false
                          }
                        />
                        <label htmlFor={rank}>{rank}</label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {isFiltered(filters).length > 0 ? (
            <RollAlphabet tunnellers={isFiltered(filters)} />
          ) : (
            "Sorry, there are not any profile that match your filters"
          )}
        </div>
      </div>
    </>
  );
}
