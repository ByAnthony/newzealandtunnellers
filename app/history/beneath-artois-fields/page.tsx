import { promises as fs } from "fs";

import { Article } from "@/components/Article/Article";

// Limitation from vercel compute time on the database
// See call-to-pick-and-shovel/page.tsx for database fetching
export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/utils/data/json/history/beneath-artois-fields.json",
    "utf8",
  );
  const article = JSON.parse(file);

  return <Article article={article} />;
}
