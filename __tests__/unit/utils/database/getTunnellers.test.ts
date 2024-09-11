import { NextResponse } from "next/server";

import { TunnellerData, TunnellerWithFullNameData } from "@/types/tunnellers";
import { getTunnellers } from "@/utils/database/getTunnellers";
import { rollQuery } from "@/utils/database/queries/rollQuery";

jest.mock("@/utils/database/queries/rollQuery");

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data) => data),
  },
}));

describe("getTunnellers", () => {
  it("should return a list of tunnellers with full names", async () => {
    const mockConnection = {};
    const mockResults: TunnellerData[] = [
      {
        id: 1,
        forename: "John",
        surname: "Doe",
        birthYear: "1940",
        deathYear: "2020",
      },
      {
        id: 2,
        forename: "Jane",
        surname: "Smith",
        birthYear: "1915",
        deathYear: "1999",
      },
    ];

    (rollQuery as jest.Mock).mockResolvedValue(mockResults);

    const response = await getTunnellers(mockConnection);

    const expectedTunnellers: TunnellerWithFullNameData[] = [
      {
        id: 1,
        forename: "John",
        surname: "Doe",
        birthYear: "1940",
        deathYear: "2020",
        fullName: "John Doe",
      },
      {
        id: 2,
        forename: "Jane",
        surname: "Smith",
        birthYear: "1915",
        deathYear: "1999",
        fullName: "Jane Smith",
      },
    ];

    expect(response).toEqual(NextResponse.json(expectedTunnellers));
  });
});
