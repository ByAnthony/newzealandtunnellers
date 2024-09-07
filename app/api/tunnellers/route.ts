import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { Tunneller, TunnellerData } from "@/types/tunnellers";
import { rollQuery } from "@/utils/database/queries/rollQuery";

export async function GET() {
  const connection = await db.connect();

  try {
    const results: TunnellerData[] = await rollQuery(connection);

    const tunnellers: Tunneller[] = results.map((result: any) => ({
      ...result,
      fullName: `${result.forename} ${result.surname}`,
    }));

    return NextResponse.json(tunnellers);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}
