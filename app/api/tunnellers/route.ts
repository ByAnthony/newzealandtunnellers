import { NextResponse } from "next/server";
import { mysqlConnection } from "../../utils/api/mysqlConnection";
import { rollQuery } from "../../utils/api/queries/rollQuery";
import { Tunneller, TunnellerData } from "../../types/tunnellers";

export async function GET() {
  const connection = await mysqlConnection();

  try {
    const results: TunnellerData[] = await rollQuery(connection);

    const modifiedResults: Tunneller[] = results.map((result: any) => ({
      ...result,
      fullName: `${result.forename} ${result.surname}`.toLowerCase(),
    }));

    return NextResponse.json(modifiedResults);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    );
  }
}
