
import { Tunneller } from "../../app/utils/components/types/roll";
import { Roll } from "../../app/components/Roll/Roll";
import { getBaseUrl } from "../utils/api/getBaseUrl";

type DatabaseData = {
    id: number,
    surname: string,
    forename: string,
    birthDate: string | null,
    deathDate: string | null,
    fullName: string,
};


export async function getTunnellers() {
    const res = await fetch(`${getBaseUrl()}/api/tunnellers`);
    return res.json();
};

export default async function Tunnellers() {
    const data: DatabaseData[] = await getTunnellers();

    const tunnellers: Record<string, Tunneller[]> = data.reduce((acc: Record<string, Tunneller[]>, tunneller: DatabaseData) => {
        const firstLetter = tunneller.surname.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
        acc[firstLetter] = [];
        }
        acc[firstLetter].push({
            id: tunneller.id,
            name: {
                surname: tunneller.surname,
                forename: tunneller.forename
            },
            birthDate: tunneller.birthDate,
            deathDate: tunneller.deathDate,
        });
        return acc;
    }, {} as { [key: string]: Tunneller[] });

    return (
        <Roll tunnellers={tunnellers} />
    )
};
