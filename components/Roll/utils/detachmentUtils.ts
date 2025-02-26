import { Tunneller } from "@/types/tunnellers";

export const getUniqueDetachments = (list: [string, Tunneller[]][]) => {
  return Array.from(
    new Set(list.flatMap(([, lists]) => lists.map((item) => item.detachment))),
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
};
