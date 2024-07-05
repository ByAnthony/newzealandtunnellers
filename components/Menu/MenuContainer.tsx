import { getTunnellers } from "@/utils/database/getEndpoint";
import { Menu } from "./Menu";

export const revalidate = 0;

export async function MenuContainer() {
  const tunnellers = await getTunnellers();

  return <Menu tunnellers={tunnellers} />;
}
