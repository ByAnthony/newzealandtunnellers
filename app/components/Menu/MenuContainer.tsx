import { getTunnellers } from "../../../utils/database/getEndpoint";
import { Menu } from "./Menu";

export async function MenuContainer() {
  const tunnellers = await getTunnellers();

  return <Menu tunnellers={tunnellers} />;
}
