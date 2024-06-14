import { getTunnellers } from "app/tunnellers/page"
import { Menu } from "./Menu";

export async function MenuContainer() {
    const tunnellers = await getTunnellers();

    return (
        <Menu tunnellers={tunnellers} />
    )
};
