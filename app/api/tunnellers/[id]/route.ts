import { NextResponse } from "next/server";

import { getTunneller } from "@/utils/database/getTunneller";
import { mysqlConnection } from "@/utils/database/mysqlConnection";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const connection = await mysqlConnection.getConnection();
  try {
    return getTunneller({ params: { id: params.id } }, connection);
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
