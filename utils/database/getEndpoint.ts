import { getBaseUrl } from "./getBaseUrl";

export async function getTunnellers() {
  const res = await fetch(`${getBaseUrl()}/api/tunnellers`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getTunneller(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/tunnellers/${id}`);
  return res.json();
}
