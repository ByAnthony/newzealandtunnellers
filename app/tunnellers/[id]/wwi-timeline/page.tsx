import { Timeline } from "@/components/Timeline/Timeline";
import { TunnellerProfile } from "@/types/tunneller";
import { getTunnellerProfile, Props } from "@/utils/helpers/getTunneller";

export async function generateMetadata(props: Props) {
  const tunneller: TunnellerProfile = await getTunnellerProfile(props);

  const surname = tunneller.summary.name.surname;
  const forename = tunneller.summary.name.forename;

  return {
    title: `Timeline of ${forename} ${surname} - New Zealand Tunnellers`,
  };
}

export default async function Page(props: Props) {
  const tunneller: TunnellerProfile = await getTunnellerProfile(props);

  return <Timeline tunneller={tunneller} />;
}
