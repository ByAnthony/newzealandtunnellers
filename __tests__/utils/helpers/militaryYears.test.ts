import { SingleEventData } from "../../../app/types/tunneller";
import {
  getAgeAtEnlistment,
  getEventEndDate,
  getEventStartDate,
  getTransferred,
} from "../../../app/utils/helpers/militaryYears";

describe("getTransferred", () => {
  test("returns an object with formatted date and unit when both date and unit are provided", () => {
    const date = "2023-04-01";
    const unit = "101st Airborne";
    const expectedResult = {
      date: { year: "2023", dayMonth: "1 April" },
      unit: "101st Airborne",
    };
    const result = getTransferred(date, unit);
    expect(result).toEqual(expectedResult);
  });

  test("returns null when date is null", () => {
    const unit = "101st Airborne";
    const result = getTransferred(null, unit);
    expect(result).toBeNull();
  });

  test("returns null when unit is null", () => {
    const date = "2023-04-01";
    const result = getTransferred(date, null);
    expect(result).toBeNull();
  });

  test("returns null when both date and unit are null", () => {
    const result = getTransferred(null, null);
    expect(result).toBeNull();
  });
});

describe("getAgeAtEnlistment", () => {
  test("returns age at enlistment when enlistmentDate and birthDate are provided", () => {
    const enlistmentDate = "2023-04-01";
    const birthDate = "2000-04-01";
    const expectedAge = 23;
    const result = getAgeAtEnlistment(enlistmentDate, null, birthDate);
    expect(result).toBe(expectedAge);
  });

  test("returns age at posting when postedDate and birthDate are provided and enlistmentDate is null", () => {
    const postedDate = "2023-04-01";
    const birthDate = "2000-04-01";
    const expectedAge = 23;
    const result = getAgeAtEnlistment(null, postedDate, birthDate);
    expect(result).toBe(expectedAge);
  });

  test("returns null when both enlistmentDate and postedDate are null", () => {
    const birthDate = "2000-04-01";
    const result = getAgeAtEnlistment(null, null, birthDate);
    expect(result).toBeNull();
  });

  test("returns null when birthDate is null", () => {
    const enlistmentDate = "2023-04-01";
    const result = getAgeAtEnlistment(enlistmentDate, null, null);
    expect(result).toBeNull();
  });
});

describe("getEventStartDate", () => {
  test("returns the earliest date from an array of SingleEventData", () => {
    const tunnellerEvents: SingleEventData[] = [
      {
        date: "2023-04-03",
        event: "enlistment",
        title: "Enlisted",
        image: null,
      },
      { date: "2023-04-01", event: "posting", title: "Enlisted", image: null },
      {
        date: "2023-04-02",
        event: "promotion",
        title: "Enlisted",
        image: null,
      },
    ];
    const expectedResult = "2023-04-01";
    const result = getEventStartDate(tunnellerEvents);
    expect(result).toBe(expectedResult);
  });

  test("returns the date when array contains only one SingleEventData", () => {
    const tunnellerEvents: SingleEventData[] = [
      {
        date: "2023-04-01",
        event: "enlistment",
        title: "Enlisted",
        image: null,
      },
    ];
    const expectedResult = "2023-04-01";
    const result = getEventStartDate(tunnellerEvents);
    expect(result).toBe(expectedResult);
  });
});

describe("getEventEndDate", () => {
  test("returns the latest date from an array of SingleEventData", () => {
    const tunnellerEvents = [
      {
        date: "2023-04-03",
        event: "enlistment",
        title: "Enlisted",
        image: null,
      },
      { date: "2023-04-01", event: "posting", title: "Enlisted", image: null },
      {
        date: "2023-04-02",
        event: "promotion",
        title: "Enlisted",
        image: null,
      },
    ];
    const expectedResult = "2023-04-05";
    const result = getEventEndDate(tunnellerEvents);
    expect(result).toBe(expectedResult);
  });

  test("returns the date when array contains only one SingleEventData", () => {
    const tunnellerEvents = [
      {
        date: "2023-04-02",
        event: "promotion",
        title: "Enlisted",
        image: null,
      },
    ];
    const expectedResult = "2023-04-01";
    const result = getEventEndDate(tunnellerEvents);
    expect(result).toBe(expectedResult);
  });
});
