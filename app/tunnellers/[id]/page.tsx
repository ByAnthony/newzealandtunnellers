import { NextResponse } from "next/server";

import { Profile } from "@/components/Profile/Profile";
import { getTunneller } from "@/utils/database/getTunneller";
import { mysqlConnection } from "@/utils/database/mysqlConnection";

type Props = {
  params: Promise<{ id: string }>;
};

async function getData(id: string) {
  const connection = await mysqlConnection.getConnection();

  try {
    return getTunneller(id, connection);
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

export default async function Page(props: Props) {
  const { id } = await props.params;
  const response = await getData(id);
  const tunneller = await response.json();

  return <Profile tunneller={tunneller} />;
}
