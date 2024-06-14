import { getTunnellers } from "../../app/utils/api/getTunnellers";
import { Roll } from "../../app/components/Roll/Roll";
import { Tunneller } from "../../app/types/roll";

export default async function Tunnellers() {
    const data: Tunneller[] = await getTunnellers();

    const tunnellers: Record<string, Tunneller[]> = data
        .reduce((acc: Record<string, Tunneller[]>, tunneller: Tunneller) => {
            const firstLetter = tunneller.surname.charAt(0).toUpperCase();
            if (!acc[firstLetter]) {
            acc[firstLetter] = [];
            }
            acc[firstLetter].push(tunneller);
            return acc;
    }, {} as { [key: string]: Tunneller[] });

    return (
        <Roll tunnellers={tunnellers} />
    );
};
