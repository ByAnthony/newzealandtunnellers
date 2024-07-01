import { displayBiographyDates } from "../../../utils/helpers/roll";

describe("displayBiographyDates", () => {
  test("returns a formatted string with both birth and death dates", () => {
    expect(displayBiographyDates("1920", "1990")).toBe("1920-1990");
  });

  test("returns a formatted string with birth date and †? when death date is null", () => {
    expect(displayBiographyDates("1920", null)).toBe("1920-†?");
  });

  test("returns a formatted string with ? and death date when birth date is null", () => {
    expect(displayBiographyDates(null, "1990")).toBe("?-1990");
  });

  test("returns ?-†? when both birth and death dates are null", () => {
    expect(displayBiographyDates(null, null)).toBe("?-†?");
  });
});
