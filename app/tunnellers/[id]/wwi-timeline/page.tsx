import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { Timeline } from "@/components/Timeline/Timeline";
import { TunnellerProfile } from "@/types/tunneller";
import { getTunneller } from "@/utils/database/getTunneller";

async function getData({ params }: { params: { id: string } }) {
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

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getData({ params });
  const tunneller: TunnellerProfile = await response.json();

  return <Timeline tunneller={tunneller} />;
}
