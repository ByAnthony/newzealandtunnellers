import { db } from "@vercel/postgres";

import { AboutUs } from "@/components/AboutUs/AboutUs";
import {
  AboutUsArticle,
  AboutUsData,
  ImageData,
  SectionData,
} from "@/types/article";
import {
  aboutUsImage,
  aboutUsSections,
  aboutUsTitle,
} from "@/utils/database/queries/aboutUsQuery";

export const dynamic = "force-dynamic";

async function getData() {
  const connection = await db.connect();

  try {
    const data: AboutUsData = await aboutUsTitle(connection);
    const sections: SectionData[] = await aboutUsSections(connection);
    const images: ImageData[] = await aboutUsImage(connection);

    const article: AboutUsArticle = {
      id: data.id,
      title: data.title,
      section: sections,
      image: images,
    };

    return article;
  } catch (error) {
    throw new Error("Failed to fecth about us data");
  } finally {
    connection.release();
  }
}

export default async function Page() {
  const article: AboutUsArticle = await getData();

  return <AboutUs article={article} />;
}
