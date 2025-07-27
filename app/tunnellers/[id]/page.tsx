import { Profile } from "@/components/Profile/Profile";
import { TunnellerProfile } from "@/types/tunneller";
import { getTunnellerProfile, Props } from "@/utils/helpers/getTunneller";

export async function generateMetadata(props: Props) {
  const tunneller: TunnellerProfile = await getTunnellerProfile(props);

  const surname = tunneller.summary.name.surname;
  const forename = tunneller.summary.name.forename;

  return {
    title: `${forename} ${surname} - New Zealand Tunnellers`,
  };
}

export default async function Page(props: Props) {
  const tunneller: TunnellerProfile = await getTunnellerProfile(props);

  return <Profile tunneller={tunneller} />;
}
