import { Tunneller } from "@/types/tunnellers";

export const getUniqueCorps = (list: [string, Tunneller[]][]) => {
  return Array.from(
    new Set(
      list.flatMap(([, lists]) =>
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
};
