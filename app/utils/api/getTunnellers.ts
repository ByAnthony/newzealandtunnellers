import { getBaseUrl } from "./getBaseUrl";

export async function getTunnellers() {
    const res = await fetch(`${getBaseUrl()}/api/tunnellers`);
    return res.json();
};
