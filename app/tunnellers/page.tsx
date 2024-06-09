import { Tunneller } from "app/types/roll";
import { Roll } from "../../app/components/Roll/Roll";
import { getBaseUrl } from "../../app/utils/getBaseUrl";

async function getTunnellers() {
    const res = await fetch(`${getBaseUrl()}/api/tunnellers`);
    return res.json();
}

export default async function Tunnellers() {
    const tunnellers: Record<string, Tunneller[]> = await getTunnellers();
    return (
        <Roll tunnellers={tunnellers} />
    )
}