import { Profile } from "../../components/Profile/Profile";
import { TunnellerProfile } from "../../types/tunneller";
import { getTunneller } from "../../../utils/database/getEndpoint";

export default async function Tunnellers({
  params,
}: {
  params: { id: string };
}) {
  const tunneller: TunnellerProfile = await getTunneller(params.id);

  return <Profile tunneller={tunneller} />;
}
