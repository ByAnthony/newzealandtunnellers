import { Tunneller } from "@/types/tunnellers";

export const getUniqueBirthYears = (list: [string, Tunneller[]][]) => {
  return Array.from(
    new Set(
      list
        .flatMap(([, lists]) => lists.map((item) => item.birthYear))
        .filter(
          (year): year is string => Boolean(year) && !isNaN(Number(year)),
        ),
    ),
  ).sort((a, b) => Number(a) - Number(b));
};

export const getUniqueDeathYears = (list: [string, Tunneller[]][]) => {
  return Array.from(
    new Set(
      list
        .flatMap(([, lists]) => lists.map((item) => item.deathYear))
        .filter(
          (year): year is string => Boolean(year) && !isNaN(Number(year)),
        ),
    ),
  ).sort((a, b) => Number(a) - Number(b));
};
