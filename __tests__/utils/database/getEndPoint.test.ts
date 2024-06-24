import {
  getTunneller,
  getTunnellers,
} from "../../../app/utils/database/getEndpoint";

describe("Tunnellers API functions", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("/api/tunnellers/")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({ id: url.split("/").pop(), name: "John Doe" }),
        });
      }
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: "1", name: "John Doe" },
            { id: "2", name: "Jane Doe" },
          ]),
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getTunnellers returns an array of tunnellers", async () => {
    const tunnellers = await getTunnellers();
    expect(Array.isArray(tunnellers)).toBeTruthy();
    expect(tunnellers.length).toBeGreaterThan(0);
    expect(tunnellers[0]).toHaveProperty("id");
    expect(tunnellers[0]).toHaveProperty("name");
  });

  it("getTunneller returns a single tunneller object given an id", async () => {
    const id = "1";
    const tunneller = await getTunneller(id);
    expect(tunneller).toHaveProperty("id", id);
    expect(tunneller).toHaveProperty("name");
  });
});
