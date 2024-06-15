import { getTunnellers } from "../../utils/api/getEndpoint";
import { Menu } from "./Menu";

export async function MenuContainer() {
  const tunnellers = await getTunnellers();

  return <Menu tunnellers={tunnellers} />;
}
