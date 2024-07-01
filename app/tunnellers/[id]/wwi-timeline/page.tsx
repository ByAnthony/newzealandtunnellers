import { Timeline } from "../../../components/Timeline/Timeline";
import { TunnellerProfile } from "../../../types/tunneller";
import { getTunneller } from "../../../../utils/database/getEndpoint";

export default async function WwiTimeline({
  params,
}: {
  params: { id: string };
}) {
  const tunneller: TunnellerProfile = await getTunneller(params.id);

  return <Timeline tunneller={tunneller} />;
}
