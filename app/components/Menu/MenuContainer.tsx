import { getTunnellers } from "../../../app/utils/api/getTunnellers";
import { Menu } from "./Menu";

export async function MenuContainer() {
  const tunnellers = await getTunnellers();

  return <Menu tunnellers={tunnellers} />;
}
