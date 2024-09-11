import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { Roll } from "@/components/Roll/Roll";
import { TunnellerWithFullNameData, Tunneller } from "@/types/tunnellers";
import { getTunnellers } from "@/utils/database/getTunnellers";

async function getData() {
  const connection = await db.connect();

  try {
    const response = await getTunnellers(connection);
    const data = await response.json();

    const tunnellers: Record<string, Tunneller[]> = data.reduce(
      (
        acc: Record<string, Tunneller[]>,
        tunneller: TunnellerWithFullNameData,
      ) => {
        const firstLetter: string = tunneller.surname.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push({
          ...tunneller,
          name: {
            surname: tunneller.surname,
            forename: tunneller.forename,
          },
        });
        return acc;
      },
      {} as { [key: string]: Tunneller[] },
    );

    return NextResponse.json(tunnellers);
  } catch (error) {
    throw new Error("Failed to fetch Tunnellers");
  } finally {
    connection.release();
  }
}

export default async function Page() {
  const response = await getData();
  const tunnellers: Record<string, Tunneller[]> = await response.json();

  return <Roll tunnellers={tunnellers} />;
}
