import { Tunneller } from "@/types/tunnellers";

export const rankCategories: Record<string, string[]> = {
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

export const getUniqueRanks = (list: [string, Tunneller[]][]) => {
  return Array.from(
    new Set(list.flatMap(([, lists]) => lists.map((item) => item.rank))),
  );
};

export const getSortedRanks = (list: string[]) => {
  return Object.fromEntries(
    Object.entries(
      list.reduce((acc: Record<string, string[]>, rank) => {
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
};
