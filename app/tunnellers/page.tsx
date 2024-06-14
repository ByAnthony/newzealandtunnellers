import { getTunnellers } from "../../app/utils/api/getTunnellers";
import { Tunneller } from "../../app/utils/components/types/roll";
import { Roll } from "../../app/components/Roll/Roll";

type DatabaseData = {
    id: number,
    surname: string,
    forename: string,
    birthDate: string | null,
    deathDate: string | null,
    fullName: string,
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
