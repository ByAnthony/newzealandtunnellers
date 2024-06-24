import { ArmyExperience } from "../../../app/types/tunneller";
import { getArmyExperience } from "../../../app/utils/helpers/preWarYears";

describe("getArmyExperience function", () => {
  it("converts duration from months to years correctly for multiple experiences", () => {
    const experiences: ArmyExperience[] = [
      {
        unit: "101st Airborne",
        country: "USA",
        conflict: "WWII",
        duration: "12",
      },
      {
        unit: "5th Infantry",
        country: "USA",
        conflict: "Korean War",
        duration: "6",
      },
      {
        unit: "1st Infantry",
        country: "USA",
        conflict: "Vietnam War",
        duration: "24",
      },
    ];
    const expectedResult: ArmyExperience[] = [
      {
        unit: "101st Airborne",
        country: "USA",
        conflict: "WWII",
        duration: "1 year",
      },
      {
        unit: "5th Infantry",
        country: "USA",
        conflict: "Korean War",
        duration: "6 months",
      },
      {
        unit: "1st Infantry",
        country: "USA",
        conflict: "Vietnam War",
        duration: "2 years",
      },
    ];
    const result = getArmyExperience(experiences);
    expect(result).toEqual(expectedResult);
  });

  it("returns an empty array when experiences array is empty", () => {
    const result = getArmyExperience([]);
    expect(result).toEqual([]);
  });

  it("handles null duration by returning null for the duration", () => {
    const experiences: ArmyExperience[] = [
      {
        unit: "101st Airborne",
        country: "USA",
        conflict: "WWII",
        duration: null,
      },
    ];
    const expectedResult: ArmyExperience[] = [
      {
        unit: "101st Airborne",
        country: "USA",
        conflict: "WWII",
        duration: null,
      },
    ];
    const result = getArmyExperience(experiences);
    expect(result).toEqual(expectedResult);
  });

  it('correctly converts single month duration to "1 month"', () => {
    const experiences: ArmyExperience[] = [
      {
        unit: "101st Airborne",
        country: "USA",
        conflict: "WWII",
        duration: "1",
      },
    ];
    const expectedResult: ArmyExperience[] = [
      {
        unit: "101st Airborne",
        country: "USA",
        conflict: "WWII",
        duration: "1 month",
      },
    ];
    const result = getArmyExperience(experiences);
    expect(result).toEqual(expectedResult);
  });
});
