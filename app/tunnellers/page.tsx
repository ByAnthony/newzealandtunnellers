import { Roll } from "../../app/components/Roll/Roll";

export default async function Tunnellers() {
    async function getTunnellers() {
        const res = await fetch(`http://localhost:3000/api/tunnellers`);
        return res.json();
      }
      
    const tunnellers = await getTunnellers();

    return (
        <Roll tunnellers={tunnellers} />
    )
}