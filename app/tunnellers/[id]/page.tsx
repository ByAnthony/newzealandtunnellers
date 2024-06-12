import { getBaseUrl } from "../../../app/utils/api/getBaseUrl";


async function getTunneller(id: string) {
    const res = await fetch(`${getBaseUrl()}/api/tunnellers/${id}`);
    return res.json();
  }

export default async function Tunnellers({ params }: { params: { id: string } }) {
    const tunneller = await getTunneller(params.id);
    console.log(tunneller)
    return (
        <div>{tunneller.surname}</div>
    )
}