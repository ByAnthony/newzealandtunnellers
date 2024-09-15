import { promises as fs } from "fs";

import { HomePage } from "@/components/HomePage/HomePage";

// Limitation from vercel compute time on the database
// If data is fetched from the database, use:

// async function getData() {
//   const connection = await db.connect();

//   try {
//     const historyImageChapters: HistoryImageChapters[] =
//       await historyImageChaptersQuery(connection);
//     const historyChapters: HistoryChapterData[] =
//       await historyChaptersQuery(connection);

//     const homepage = {
//       historyChapters: getHistoryChapters(
//         historyChapters,
//         historyImageChapters,
//       ),
//     };

//     return NextResponse.json(homepage);
//   } catch (error) {
//     throw new Error("Failed to fetch homepage data");
//   } finally {
//     connection.release();
//   }
// }

// export default async function Page() {
//  const response = await getData();
//  const homepage = response.json();

export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/utils/data/json/homepage/index.json",
    "utf8",
  );
  const homepage = JSON.parse(file);

  return <HomePage homepage={homepage} />;
}
