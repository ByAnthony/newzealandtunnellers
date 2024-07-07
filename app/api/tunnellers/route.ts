import { NextResponse } from "next/server";
import { mysqlConnection } from "@/utils/database/mysqlConnection";
import { rollQuery } from "@/utils/database/queries/rollQuery";
import { Tunneller, TunnellerData } from "@/types/tunnellers";

export async function GET() {
  const connection = await mysqlConnection.getConnection();

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
