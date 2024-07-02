import { getTunnellers } from "@/utils/database/getEndpoint";
import { Roll } from "@/components/Roll/Roll";
import { TunnellerWithFullNameData, Tunneller } from "@/types/tunnellers";

export default async function Tunnellers() {
  const tunnellers: TunnellerWithFullNameData[] = await getTunnellers();

  return <Roll tunnellers={tunnellers} />;
}
