import { NextResponse } from "next/server";
import { cache } from "react";

import { TunnellerProfile } from "@/types/tunneller";

import { getTunneller } from "../database/getTunneller";
import { mysqlConnection } from "../database/mysqlConnection";

export type Props = {
  params: Promise<{ id: string }>;
};

export const getTunnellerProfile = cache(
  async (props: Props): Promise<TunnellerProfile> => {
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

    const { id } = await props.params;
    const response = await getData(id);
    return await response.json();
  },
);
