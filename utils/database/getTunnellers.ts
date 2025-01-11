import { NextResponse } from "next/server";

import { Tunneller, TunnellerData } from "@/types/tunnellers";

import { rollQuery } from "./queries/rollQuery";

export async function getTunnellers(connection: any) {
  const results: TunnellerData[] = await rollQuery(connection);

  const tunnellers: Tunneller[] = results.map((result: TunnellerData) => ({
    id: result.id,
    name: {
      surname: result.surname,
      forename: result.forename,
    },
    birthYear: result.birthYear,
    deathYear: result.deathYear,
    search: {
      fullName: `${result.forename} ${result.surname}`,
    },
  }));

  return NextResponse.json(tunnellers);
}
