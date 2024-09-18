import { Menu } from "@/components/Menu/Menu";
import { getTunnellers } from "@/utils/database/getTunnellers";
import { mysqlConnection } from "@/utils/database/mysqlConnection";

async function getData() {
  const connection = await mysqlConnection.getConnection();

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
