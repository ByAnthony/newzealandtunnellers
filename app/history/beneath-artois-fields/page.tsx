import { promises as fs } from "fs";

import { Article } from "@/components/Article/Article";

export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/utils/data/json/history/beneath-artois-fields.json",
    "utf8",
  );
  const article = JSON.parse(file);

  return <Article article={article} />;
}
