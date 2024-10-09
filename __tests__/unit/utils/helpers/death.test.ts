import {
  getDeathPlace,
  getDeathCause,
  getCemetery,
  isWarInjuriesDeathAfterWar,
  getDeath,
} from "@/utils/helpers/death";

describe("getDeathPlace", () => {
  const location = "City";
  const country = "Country";

  test("should return the death place when all parameters are provided", () => {
    const town = "Town";
    const result = getDeathPlace(location, town, country);
    expect(result).toEqual({
      location,
      town,
      country,
    });
  });

  test("should return null when any parameter is missing", () => {
    const result = getDeathPlace(null, null, null);
    expect(result).toBeNull();
  });
});

describe("getDeathCause", () => {
  const circumstances = "Circumstances";

  test("should return the death cause when all parameters are provided", () => {
    const cause = "Cause";
    const result = getDeathCause(cause, circumstances);
    expect(result).toEqual({
      cause,
      circumstances,
    });
  });

  test("should return null when any parameter is missing", () => {
    const cause = null;
    const result = getDeathCause(cause, circumstances);
    expect(result).toBeNull();
  });
});

describe("getCemetery", () => {
  const location = "City";
  const country = "Country";
  const grave = "Grave";

  test("should return the cemetery details when all parameters are provided", () => {
    const name = "Cemetery";
    const result = getCemetery(name, location, country, grave);
    expect(result).toEqual({
      name,
      location,
      country,
      grave,
    });
  });

  test("should return null when any parameter is missing", () => {
    const name = null;
    const result = getCemetery(name, location, country, grave);
    expect(result).toBeNull();
  });
});

describe("isWarInjuriesDeathAfterWar", () => {
  test("should return true when the type is 'warInjuriesDeathAfterWar'", () => {
    const type = "War injuries";
    const result = isWarInjuriesDeathAfterWar(type);
    expect(result).toBe(true);
  });

  test("should return false when the type is not 'warInjuriesDeathAfterWar'", () => {
    const type = "Other type";
    const result = isWarInjuriesDeathAfterWar(type);
    expect(result).toBe(false);
  });
});

describe("getDeath", () => {
  const warInjuriesDeathAfterWar = false;
  const date = {
    year: "2022",
    dayMonth: "01-01",
  };
  const place = {
    location: "City",
    town: "Town",
    country: "Country",
  };
  const cause = {
    cause: "Cause",
    circumstances: "Circumstances",
  };
  const cemetery = {
    name: "Cemetery",
    location: "City",
    country: "Country",
    grave: "Grave",
  };
  const ageAtDeath = 30;

  test("should return the death details when death type is in the list", () => {
    const deathType = "War";
    const result = getDeath(
      warInjuriesDeathAfterWar,
      deathType,
      date,
      place,
      cause,
      cemetery,
      ageAtDeath,
    );
    expect(result).toEqual({
      warInjuriesDeathAfterWar,
      date,
      place,
      cause,
      cemetery,
      ageAtDeath,
    });
  });

  test("should return the death details when death type is other and death date knwon", () => {
    const deathType = null;
    const result = getDeath(
      warInjuriesDeathAfterWar,
      deathType,
      date,
      place,
      cause,
      cemetery,
      ageAtDeath,
    );
    expect(result).toEqual({
      warInjuriesDeathAfterWar,
      date,
      place,
      cause,
      cemetery,
      ageAtDeath,
    });
  });

  test("should return null when death type is other", () => {
    const deathType = "Other";
    const result = getDeath(
      warInjuriesDeathAfterWar,
      deathType,
      date,
      place,
      cause,
      cemetery,
      ageAtDeath,
    );
    expect(result).toBeNull();
  });
});
