import { NextResponse } from "next/server";

import { Profile } from "@/components/Profile/Profile";
import { getTunneller } from "@/utils/database/getTunneller";
import { mysqlConnection } from "@/utils/database/mysqlConnection";

async function getData({ params }: { params: { id: string } }) {
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

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getData({ params });
  const tunneller = await response.json();

  return <Profile tunneller={tunneller} />;
}
