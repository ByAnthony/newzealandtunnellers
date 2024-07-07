import { getTunnellers } from "@/utils/database/getEndpoint";
import { Roll } from "@/components/Roll/Roll";
import { TunnellerWithFullNameData } from "@/types/tunnellers";

export default async function Page() {
  const tunnellers: TunnellerWithFullNameData[] = await getTunnellers();

  return <Roll tunnellers={tunnellers} />;
}
