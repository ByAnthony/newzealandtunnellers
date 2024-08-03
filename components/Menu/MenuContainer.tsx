import { Menu } from "@/components/Menu/Menu";
import { getTunnellers } from "@/utils/database/getEndpoint";

export async function MenuContainer() {
  const tunnellers = await getTunnellers();

  return <Menu tunnellers={tunnellers} />;
}
