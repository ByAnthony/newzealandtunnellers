import { NextResponse } from "next/server";

import { TunnellerData, Tunneller } from "@/types/tunnellers";

import { rollQuery } from "./queries/rollQuery";

export async function getTunnellers(connection: any) {
  const results: TunnellerData[] = await rollQuery(connection);

  const tunnellers: Tunneller[] = results.map((result: any) => ({
    ...result,
    fullName: `${result.forename} ${result.surname}`,
  }));

  return NextResponse.json(tunnellers);
}
