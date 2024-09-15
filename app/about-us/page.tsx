import { promises as fs } from "fs";

import { AboutUs } from "@/components/AboutUs/AboutUs";

// Limitation from vercel compute time on the database
// If data is fetched from the database, use:

// async function getData() {
//   const connection = await db.connect();

//   try {
//     const data: AboutUsData = await aboutUsTitle(connection);
//     const sections: SectionData[] = await aboutUsSections(connection);
//     const images: ImageData[] = await aboutUsImage(connection);

//     const article: AboutUsArticle = {
//       id: data.id,
//       title: data.title,
//       section: sections,
//       image: images,
//     };

//     return NextResponse.json(article);
//   } catch (error) {
//     throw new Error("Failed to fecth about us data");
//   } finally {
//     connection.release();
//   }
// }

// export default async function Page() {
//  const response = await getData();
//  const article = response.json();

export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/utils/data/json/about-us/index.json",
    "utf8",
  );
  const article = JSON.parse(file);

  return <AboutUs article={article} />;
}
