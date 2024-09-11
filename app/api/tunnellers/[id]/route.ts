import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { getTunneller } from "@/utils/database/getTunneller";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const connection = await db.connect();

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
