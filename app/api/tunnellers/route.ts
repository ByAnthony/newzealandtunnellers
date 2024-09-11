import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { getTunnellers } from "@/utils/database/getTunnellers";

export async function GET() {
  const connection = await db.connect();

  try {
    const tunnellers = await getTunnellers(connection);

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
