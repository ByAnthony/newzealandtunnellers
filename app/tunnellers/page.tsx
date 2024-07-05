import { getTunnellers } from "@/utils/database/getEndpoint";
import { Roll } from "@/components/Roll/Roll";
import { TunnellerWithFullNameData, Tunneller } from "@/types/tunnellers";

async function getData() {
  try {
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

    return tunnellers;
  } catch (error) {
    throw new Error("Failed to fetch Tunnellers")
  }
};

export default async function Page() {
  const tunnellers: Record<string, Tunneller[]> = await getData();

  return <Roll tunnellers={tunnellers} />;
}
