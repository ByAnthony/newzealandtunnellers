import { getTunnellers } from "../../utils/database/getEndpoint";
import { Roll } from "../../app/components/Roll/Roll";
import { TunnellerWithFullNameData, Tunneller } from "../types/tunnellers";

export default async function Tunnellers() {
  const data: TunnellerWithFullNameData[] = await getTunnellers();

  const tunnellers: Record<string, Tunneller[]> = data.reduce(
    (
      acc: Record<string, Tunneller[]>,
      tunneller: TunnellerWithFullNameData,
    ) => {
      const firstLetter: string = tunneller.surname.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push({
        ...tunneller,
        name: {
          surname: tunneller.surname,
          forename: tunneller.forename,
        },
      });
      return acc;
    },
    {} as { [key: string]: Tunneller[] },
  );

  return <Roll tunnellers={tunnellers} />;
}
