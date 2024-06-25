import { Event, SingleEventData } from "../../../app/types/tunneller";
import {
  getAgeAtEnlistment,
  getDemobilization,
  getDischargedCountry,
  getEventEndDate,
  getEventStartDate,
  getGroupedEventsByDate,
  getGroupedEventsByYear,
  getJoinEvents,
  getTransferred,
  getTransport,
  getWarDeathEvents,
  isDeathWar,
  isDeserter,
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
        date: "2023-04-05",
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
        date: "2023-04-01",
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

describe("getJoinEvents function", () => {
  test("should return enlistment and training events when enlistmentDate is before trainingStart", () => {
    const joinData = {
      enlistmentDate: "2020-01-01",
      trainingStart: "2020-01-01",
      embarkationUnit: "Unit A",
      trainingLocation: "Location A",
    };
    const expectedEvents = [
      {
        date: joinData.enlistmentDate,
        event: "Unit A",
        title: "Enlisted",
        image: null,
      },
      {
        date: joinData.trainingStart,
        event: "Location A",
        title: "Trained",
        image: null,
      },
    ];
    expect(getJoinEvents(joinData)).toEqual(expectedEvents);
  });

  test("should return enlistment and training events on the same date when enlistmentDate is the same as trainingStart", () => {
    const joinData = {
      enlistmentDate: "2020-01-01",
      trainingStart: "2020-01-01",
      embarkationUnit: "Unit B",
      trainingLocation: "Location B",
    };
    const expectedEvents = [
      {
        date: joinData.enlistmentDate,
        event: "Unit B",
        title: "Enlisted",
        image: null,
      },
      {
        date: joinData.enlistmentDate,
        event: "Location B",
        title: "Trained",
        image: null,
      },
    ];
    expect(getJoinEvents(joinData)).toEqual(expectedEvents);
  });

  test("should return an empty array when join data is null", () => {
    expect(getJoinEvents(null)).toEqual([]);
  });
});

// TODO deathWar tests

describe("getGroupedEventsByDate function", () => {
  test("should group events by the same date", () => {
    const events: Event[] = [
      {
        date: { year: "1916", dayMonth: "1 July" },
        event: [{ description: "Event A", title: null, image: null }],
      },
      {
        date: { year: "1916", dayMonth: "1 July" },
        event: [{ description: "Event B", title: null, image: null }],
      },
      {
        date: { year: "1917", dayMonth: "11 November" },
        event: [{ description: "Event C", title: null, image: null }],
      },
    ];
    const expectedGroupedEvents: Event[] = [
      {
        date: { year: "1916", dayMonth: "1 July" },
        event: [
          { description: "Event A", title: null, image: null },
          { description: "Event B", title: null, image: null },
        ],
      },
      {
        date: { year: "1917", dayMonth: "11 November" },
        event: [{ description: "Event C", title: null, image: null }],
      },
    ];
    expect(getGroupedEventsByDate(events)).toEqual(expectedGroupedEvents);
  });

  test("should handle an empty events array", () => {
    const events: Event[] = [];
    const expectedGroupedEvents: Event[] = [];
    expect(getGroupedEventsByDate(events)).toEqual(expectedGroupedEvents);
  });

  test("should not modify events with unique dates", () => {
    const events: Event[] = [
      {
        date: { year: "1916", dayMonth: "1 July" },
        event: [{ description: "Event A", title: null, image: null }],
      },
      {
        date: { year: "1917", dayMonth: "11 November" },
        event: [{ description: "Event B", title: null, image: null }],
      },
    ];
    const expectedGroupedEvents: Event[] = [
      {
        date: { year: "1916", dayMonth: "1 July" },
        event: [{ description: "Event A", title: null, image: null }],
      },
      {
        date: { year: "1917", dayMonth: "11 November" },
        event: [{ description: "Event B", title: null, image: null }],
      },
    ];
    expect(getGroupedEventsByDate(events)).toEqual(expectedGroupedEvents);
  });
});

describe("getGroupedEventsByYear function", () => {
  test("should group events by year", () => {
    const events: Event[] = [
      {
        date: { year: "1916", dayMonth: "1 July" },
        event: [{ description: "Event A", title: null, image: null }],
      },
      {
        date: { year: "1916", dayMonth: "2 July" },
        event: [{ description: "Event B", title: null, image: null }],
      },
      {
        date: { year: "1917", dayMonth: "11 November" },
        event: [{ description: "Event C", title: null, image: null }],
      },
    ];
    const expectedOutput: {
      [year: string]: Event[];
    } = {
      "1916": [
        {
          date: { year: "1916", dayMonth: "1 July" },
          event: [{ description: "Event A", title: null, image: null }],
        },
        {
          date: { year: "1916", dayMonth: "2 July" },
          event: [{ description: "Event B", title: null, image: null }],
        },
      ],
      "1917": [
        {
          date: { year: "1917", dayMonth: "11 November" },
          event: [{ description: "Event C", title: null, image: null }],
        },
      ],
    };
    expect(getGroupedEventsByYear(events)).toEqual(expectedOutput);
  });

  test("should handle an empty events array", () => {
    const events: Event[] = [];
    const expectedOutput = {};
    expect(getGroupedEventsByYear(events)).toEqual(expectedOutput);
  });
});

// TODO front event tests

describe("isDeserter function", () => {
  test("should return true if isDeserter is 1", () => {
    expect(isDeserter(1)).toBe(true);
  });

  test("should return false if isDeserter is 0", () => {
    expect(isDeserter(0)).toBe(false);
  });

  test("should return false if isDeserter is null", () => {
    expect(isDeserter(null)).toBe(false);
  });
});

describe("isDeathWar function", () => {
  test('should return true if isDeathWar is "War"', () => {
    expect(isDeathWar("War")).toBe(true);
  });

  test('should return false if isDeathWar is not "War"', () => {
    expect(isDeathWar("Peace")).toBe(false);
    expect(isDeathWar("")).toBe(false);
    expect(isDeathWar(null)).toBe(false);
  });
});

describe("getTransport function", () => {
  test("should return transport object if all parameters are provided", () => {
    const reference = "REF123";
    const vessel = "HMS Victory";
    const departureDate = { year: "1805", dayMonth: "21 October" };
    const expected = {
      reference: "REF123",
      vessel: "HMS Victory",
      departureDate: { year: "1805", dayMonth: "21 October" },
    };
    expect(getTransport(reference, vessel, departureDate)).toEqual(expected);
  });

  test("should return null if any parameter is null", () => {
    expect(
      getTransport(null, "HMS Victory", {
        year: "1805",
        dayMonth: "21 October",
      }),
    ).toBeNull();
    expect(
      getTransport("REF123", null, { year: "1805", dayMonth: "21 October" }),
    ).toBeNull();
    expect(getTransport("REF123", "HMS Victory", null)).toBeNull();
  });
});

describe("getDemobilization function", () => {
  test("should return demobilization object if both date and country are provided", () => {
    const date = { year: "1945", dayMonth: "2 September" };
    const country = "USA";
    const expected = {
      date: { year: "1945", dayMonth: "2 September" },
      country: "USA",
    };
    expect(getDemobilization(date, country)).toEqual(expected);
  });

  test("should return null if date is null", () => {
    const country = "USA";
    expect(getDemobilization(null, country)).toBeNull();
  });

  test("should return null if country is null", () => {
    const date = { year: "1945", dayMonth: "2 September" };
    expect(getDemobilization(date, null)).toBeNull();
  });

  test("should return null if both date and country are null", () => {
    expect(getDemobilization(null, null)).toBeNull();
  });
});

describe("getDischargedCountry function", () => {
  test('should return "United Kingdom" if isDischargedUk is 1', () => {
    expect(getDischargedCountry(1)).toBe("United Kingdom");
  });

  test('should return "New Zealand" if isDischargedUk is 0', () => {
    expect(getDischargedCountry(0)).toBe("New Zealand");
  });

  test('should return "New Zealand" if isDischargedUk is null', () => {
    expect(getDischargedCountry(null)).toBe("New Zealand");
  });
});
