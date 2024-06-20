import {
  getAge,
  getDate,
  getDayMonth,
  getYear,
} from "../../../app/utils/helpers/date";

describe("getYear", () => {
  it("should return the year from a date string", () => {
    const date = "2022-01-01";
    const expectedYear = "2022";
    const result = getYear(date);
    expect(result).toEqual(expectedYear);
  });

  it("should handle different date formats", () => {
    const date = "2022/12/11";
    const expectedYear = "2022";
    const result = getYear(date);
    expect(result).toEqual(expectedYear);
  });
});

describe("getDayMonth", () => {
  it("should return the day and month from a date string", () => {
    const date = "2022-01-01";
    const expectedDayMonth = "1 January";
    const result = getDayMonth(date);
    expect(result).toEqual(expectedDayMonth);
  });

  it("should handle different date formats", () => {
    const date = "2022/12/11";
    const expectedDayMonth = "11 December";
    const result = getDayMonth(date);
    expect(result).toEqual(expectedDayMonth);
  });
});

describe("getDate", () => {
  it("should return an object with year and dayMonth properties", () => {
    const date = "2022-01-01";
    const expectedDateObj = { year: "2022", dayMonth: "1 January" };
    const result = getDate(date);
    expect(result).toEqual(expectedDateObj);
  });

  it("should handle different date formats", () => {
    const date = "2022/12/11";
    const expectedDateObj = { year: "2022", dayMonth: "11 December" };
    const result = getDate(date);
    expect(result).toEqual(expectedDateObj);
  });
});

describe("getAge", () => {
  it("should return the age based on birthDate and currentDate", () => {
    const birthDate = "2000-01-01";
    const currentDate = "2022-01-01";
    const expectedAge = 22;
    const result = getAge(birthDate, currentDate);
    expect(result).toEqual(expectedAge);
  });

  it("should return null if birthDate or currentDate is null", () => {
    const birthDate = null;
    const currentDate = "2022-01-01";
    const result = getAge(birthDate, currentDate);
    expect(result).toBeNull();
  });

  it("should decrease age by 1 if birth month and day is greater than current month and day", () => {
    const birthDate = "2000-12-31";
    const currentDate = "2022-01-01";
    const expectedAge = 21;
    const result = getAge(birthDate, currentDate);
    expect(result).toEqual(expectedAge);
  });
});
