import { NextResponse } from "next/server";

import { Tunneller, TunnellerData } from "@/types/tunnellers";
import { mysqlConnection } from "@/utils/database/mysqlConnection";
import { rollQuery } from "@/utils/database/queries/rollQuery";

export async function GET() {
  try {
    const connection = await mysqlConnection.getConnection();

    const results: TunnellerData[] = await rollQuery(connection);

    const tunnellers: Tunneller[] = results.map((result: any) => ({
      ...result,
      fullName: `${result.forename} ${result.surname}`,
    }));

    connection.release();

    return NextResponse.json(tunnellers);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    );
  }
}
