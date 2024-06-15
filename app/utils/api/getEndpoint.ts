import { getBaseUrl } from "./getBaseUrl";

export async function getTunnellers() {
  const res = await fetch(`${getBaseUrl()}/api/tunnellers`);
  return res.json();
}

export async function getTunneller(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/tunnellers/${id}`);
  return res.json();
}

export async function gethistoryChapter(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/history/${id}`);
  return res.json();
}

export async function getAboutUs() {
  const res = await fetch(`${getBaseUrl()}/api/about-us`);
  return res.json();
}
