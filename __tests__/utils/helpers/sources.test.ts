import {
  getAwmm,
  getLondonGazette,
  getNominalRoll,
  getNzArchives,
} from "@/utils/helpers/sources";

describe("getNzArchives function", () => {
  test("transforms an array of NzArchives objects into the expected format", () => {
    const mockNzArchives = [
      { reference: "Ref123", url: "123" },
      { reference: "Ref456", url: "456" },
    ];

    const expectedOutput = [
      {
        reference: "Ref123",
        url: "https://collections.archives.govt.nz/web/arena/search#/entity/aims-archive/R123",
      },
      {
        reference: "Ref456",
        url: "https://collections.archives.govt.nz/web/arena/search#/entity/aims-archive/R456",
      },
    ];

    const result = getNzArchives(mockNzArchives);

    expect(result).toEqual(expectedOutput);
  });
});

describe("getAwmm function", () => {
  test("returns the correct URL when awmm is provided", () => {
    const awmmId = "C12345";
    const expectedUrl = `https://www.aucklandmuseum.com/war-memorial/online-cenotaph/record/${awmmId}`;
    const result = getAwmm(awmmId);
    expect(result).toBe(expectedUrl);
  });

  test("returns null when awmm is null", () => {
    const result = getAwmm(null);
    expect(result).toBeNull();
  });
});

describe("getNominalRoll function", () => {
  test("returns the correct object when volume and roll are provided", () => {
    const volume = "I";
    const roll = "123";
    const page = "456";
    const result = getNominalRoll(volume, roll, page);
    expect(result).toEqual({
      title: "Nominal Rolls of New Zealand Expeditionary Force",
      town: "Wellington",
      publisher: "Government Printer",
      date: "1914-1919",
      page: `p.\u00A0${page}`,
      volume: `Vol.${volume}`,
      roll: `Roll No.${roll}`,
    });
  });

  test("returns the correct object when volume or roll is null", () => {
    const volume = null;
    const roll = null;
    const page = "789";
    const result = getNominalRoll(volume, roll, page);
    expect(result).toEqual({
      title:
        "Nominal Roll of New Zealand Expeditionary Force, 1915. New Zealand Engineers Tunnelling Company",
      town: "Wellington",
      publisher: "Government Printer",
      date: "1916",
      page: `p.\u00A0${page}`,
    });
  });
});

describe("getLondonGazette function", () => {
  test("transforms an array of LondonGazette objects into the expected format", () => {
    const mockLondonGazetteList = [
      { page: "1234", date: "1916-04-25" },
      { page: "5678", date: "1917-07-30" },
    ];

    const expectedOutput = [
      { page: "1234", date: "25 April 1916" },
      { page: "5678", date: "30 July 1917" },
    ];

    const result = getLondonGazette(mockLondonGazetteList);

    expect(result).toEqual(expectedOutput);
  });
});
