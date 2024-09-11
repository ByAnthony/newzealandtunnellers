import { db } from "@vercel/postgres";

import { Menu } from "@/components/Menu/Menu";
import { getTunnellers } from "@/utils/database/getTunnellers";

async function getData() {
  const connection = await db.connect();

  try {
    return getTunnellers(connection);
  } catch (error) {
    throw new Error("Failed to fetch homepage data");
  } finally {
    connection.release();
  }
}

export async function MenuContainer() {
  const response = await getData();
  const tunnellers = await response.json();

  return <Menu tunnellers={tunnellers} />;
}
