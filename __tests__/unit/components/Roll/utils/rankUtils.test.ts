import {
  getSortedRanks,
  getUniqueRanks,
} from "@/components/Roll/utils/rankUtils";
import { mockTunnellers } from "__tests__/unit/utils/mocks/mockTunnellers";

describe("getUniqueDetachments", () => {
  test("returns unique detachments sorted correctly", () => {
    const result = getUniqueRanks(Object.entries(mockTunnellers));
    expect(result).toEqual(["Sapper"]);
  });

  test("handles empty list", () => {
    const result = getUniqueRanks([]);
    expect(result).toEqual([]);
  });
});

describe("getSortedRanks", () => {
  test("returns sorted ranks", () => {
    const result = getSortedRanks(["Sapper"]);
    expect(result).toEqual({
      "Other Ranks": ["Sapper"],
    });
  });

  test("handles empty list", () => {
    const result = getSortedRanks([]);
    expect(result).toEqual({});
  });
});
