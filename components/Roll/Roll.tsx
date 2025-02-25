"use client";

import { useState } from "react";

import { RollAlphabet } from "@/components/Roll/RollAlphabet/RollAlphabet";
import { RollFilter } from "@/components/Roll/RollFilter/RollFilter";
import { RollNoResults } from "@/components/Roll/RollNoResults/RollNoResults";
import { Title } from "@/components/Title/Title";
import { Tunneller } from "@/types/tunnellers";
import { useWindowDimensions } from "@/utils/helpers/useWindowDimensions";

import STYLES from "./Roll.module.scss";
import { Dialog } from "../Dialog/Dialog";

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
  const { width } = useWindowDimensions();

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
      tunnellersList
        .flatMap(([, lists]) => lists.map((item) => item.birthYear))
        .filter(
          (year): year is string => Boolean(year) && !isNaN(Number(year)),
        ),
    ),
  ).sort((a, b) => Number(a) - Number(b));

  const uniqueDeathYears: string[] = Array.from(
    new Set(
      tunnellersList
        .flatMap(([, lists]) => lists.map((item) => item.deathYear))
        .filter(
          (year): year is string => Boolean(year) && !isNaN(Number(year)),
        ),
    ),
  ).sort((a, b) => Number(a) - Number(b));

  const filterList: Filters = {
    detachment: [],
    corps: [],
    ranks: { Officers: [], "Non-Commissioned Officers": [], "Other Ranks": [] },
    birthYear: uniqueBirthYears,
    unknownBirthYear: "unknown",
    deathYear: uniqueDeathYears,
    unknownDeathYear: "unknown",
  };

  const [filters, setFilters] = useState<Filters>(filterList);
  const [isOpen, setIsOpen] = useState(false);

  const handleDetachmentFilter = (detachment: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (!newFilters.detachment) {
        newFilters.detachment = [];
      }
      if (newFilters.detachment.includes(detachment)) {
        newFilters.detachment = newFilters.detachment.filter(
          (d) => d !== detachment,
        );
      } else {
        newFilters.detachment.push(detachment);
      }

      return newFilters;
    });
  };

  const handleCorpsFilter = (corps: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (!newFilters.corps) {
        newFilters.corps = [];
      }
      if (newFilters.corps.includes(corps)) {
        newFilters.corps = newFilters.corps.filter((c) => c !== corps);
      } else {
        newFilters.corps.push(corps);
      }

      return newFilters;
    });
  };

  const handleBirthSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };

        const [startYear, endYear] = value;
        newFilters.birthYear = uniqueBirthYears.filter(
          (year) => year >= String(startYear) && year <= String(endYear),
        );

        return newFilters;
      });
    }
  };

  const handleUnknwonBirthYear = (unknown: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      newFilters.unknownBirthYear = unknown ? "unknown" : "";

      return newFilters;
    });
  };

  const handleDeathSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };

        const [startYear, endYear] = value;
        newFilters.deathYear = uniqueDeathYears.filter(
          (year) => year >= String(startYear) && year <= String(endYear),
        );

        return newFilters;
      });
    }
  };

  const handleUnknwonDeathYear = (unknown: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      newFilters.unknownDeathYear = unknown ? "unknown" : "";

      return newFilters;
    });
  };

  const handleRankFilter = (ranksFilter: Record<string, string[]>) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      newFilters.ranks = { ...prevFilters.ranks };

      Object.entries(ranksFilter).forEach(([category, ranks]) => {
        if (ranks.length === 0) {
          const allSelected = rankCategories[category].every((rank) =>
            newFilters.ranks[category].includes(rank),
          );

          newFilters.ranks[category] = allSelected
            ? []
            : rankCategories[category];
        } else {
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
        }
      });

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
                  filters.corps.includes(tunneller.attachedCorps ?? "");
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

  const totalFilteredTunnellers = isFiltered(filters).reduce(
    (acc, [, tunnellers]) => acc + tunnellers.length,
    0,
  );
  const totalTunnellers = tunnellersList.reduce(
    (acc, [, tunnellers]) => acc + tunnellers.length,
    0,
  );

  const startBirthYear = filters.birthYear?.[0];
  const endBirthYear = filters.birthYear?.[filters.birthYear.length - 1];
  const startDeathYear = filters.deathYear?.[0];
  const endDeathYear = filters.deathYear?.[filters.deathYear.length - 1];

  const handleResetFilters = () => {
    setFilters(filterList);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const HandleFilterButton = () => {
    setIsOpen(true);
  };

  const rollFiltersProps = {
    className: STYLES["filters-container"],
    uniqueDetachments,
    uniquecorps,
    uniqueBirthYears,
    uniqueDeathYears,
    sortedRanks,
    filters,
    startBirthYear,
    endBirthYear,
    startDeathYear,
    endDeathYear,
    handleDetachmentFilter,
    handleCorpsFilter,
    handleBirthSliderChange,
    handleDeathSliderChange,
    handleRankFilter,
    handleUnknwonBirthYear,
    handleUnknwonDeathYear,
  };

  const isDesktop = () => {
    return width && width > 896;
  };

  return (
    <>
      <Dialog
        id="filter-dialog"
        isFooterEnabled={true}
        isOpen={isOpen}
        handleResetFilters={handleResetFilters}
        onClose={onClose}
        title="Filter"
        totalFiltered={totalFilteredTunnellers}
        total={totalTunnellers}
      >
        <RollFilter {...rollFiltersProps} />
      </Dialog>
      <div className={STYLES.container}>
        <div className={STYLES.header}>
          <Title title={"The New Zealand\\Tunnellers"} />
        </div>
        <div className={STYLES["roll-container"]}>
          <div className={STYLES.controls}>
            <div className={STYLES["results-container"]}>
              <button
                className={STYLES["reset-button"]}
                onClick={handleResetFilters}
              >
                Reset filter
              </button>
              <p className={STYLES.results}>
                {totalFilteredTunnellers > 1
                  ? `${totalFilteredTunnellers} results`
                  : `${totalFilteredTunnellers} result`}
              </p>
            </div>
            <button
              className={STYLES["filter-button"]}
              onClick={HandleFilterButton}
            >
              Filter
            </button>
            {isDesktop() ? <RollFilter {...rollFiltersProps} /> : null}
          </div>
          {isFiltered(filters).length > 0 ? (
            <RollAlphabet tunnellers={isFiltered(filters)} />
          ) : (
            <RollNoResults handleResetFilters={handleResetFilters} />
          )}
        </div>
      </div>
    </>
  );
}
