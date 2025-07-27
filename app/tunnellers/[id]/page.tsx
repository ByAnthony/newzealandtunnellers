import { NextResponse } from "next/server";
import { cache } from "react";

import { Profile } from "@/components/Profile/Profile";
import { TunnellerProfile } from "@/types/tunneller";
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

const getTunnellerProfile = cache(
  async (props: Props): Promise<TunnellerProfile> => {
    const { id } = await props.params;
    const response = await getData(id);
    return await response.json();
  },
);

export async function generateMetadata(props: Props) {
  const tunneller: TunnellerProfile = await getTunnellerProfile(props);

  const surname = tunneller.summary.name.surname;
  const forename = tunneller.summary.name.forename;

  return {
    title: `${forename} ${surname} - New Zealand Tunnellers`,
  };
}

export default async function Page(props: Props) {
  const tunneller: TunnellerProfile = await getTunnellerProfile(props);

  return <Profile tunneller={tunneller} />;
}
