import { NextResponse } from "next/server";

import { Timeline } from "@/components/Timeline/Timeline";
import { TunnellerProfile } from "@/types/tunneller";
import { getTunneller } from "@/utils/database/getTunneller";
import { mysqlConnection } from "@/utils/database/mysqlConnection";

type Props = {
  params: Promise<{ id: string }>;
};

async function getData(params: { id: string }) {
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

export default async function Page(props: Props) {
  const { id } = await props.params;
  const response = await getData({ id });
  const tunneller: TunnellerProfile = await response.json();

  return <Timeline tunneller={tunneller} />;
}
