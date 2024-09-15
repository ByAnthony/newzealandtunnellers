import { promises as fs } from "fs";

import { Article } from "@/components/Article/Article";

// Limitation from vercel compute time on the database
// If data is fetched from the database:
// create [id] folder in history folder;
// create page.tsx file in [id] folder;
// and use the following code in page.tsx file:

// async function getData(params: { id: string }) {
//   const connection = await db.connect();

//   try {
//     const data: ArticleData = await chapterQuery(params.id, connection);
//     const section: SectionData[] = await sectionsQuery(params.id, connection);
//     const images: ImageData[] = await imagesQuery(params.id, connection);
//     const nextArticle: ArticleReferenceData[] =
//       await nextArticleQuery(connection);

//     const article: Chapter = {
//       id: data.id,
//       chapter: data.chapter,
//       title: data.title,
//       section: section,
//       image: images,
//       next: getNextChapter(data.chapter, nextArticle),
//       notes: data.notes,
//     };

//     return NextResponse.json(article);
//   } catch (error) {
//     throw new Error("Failed to fetch history chapter data");
//   } finally {
//     connection.release();
//   }
// }

// export default async function Page({ params }: { params: { id: string } }) {
//  const response = await getData(params.id);
//  const article = response.json();

// Remove all unnecessary folders in history folder;

export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/utils/data/json/history/call-to-pick-and-shovel.json",
    "utf8",
  );
  const article = JSON.parse(file);

  return <Article article={article} />;
}
