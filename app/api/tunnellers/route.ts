import { NextResponse } from "next/server";

import { getTunnellers } from "@/utils/database/getTunnellers";
import { mysqlConnection } from "@/utils/database/mysqlConnection";

export async function GET() {
  const connection = await mysqlConnection.getConnection();
  try {
    return await getTunnellers(connection);
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
