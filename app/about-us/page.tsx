import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { AboutUs } from "@/components/AboutUs/AboutUs";
import {
  AboutUsData,
  SectionData,
  AboutUsArticle,
  ImageData,
} from "@/types/article";
import {
  aboutUsTitle,
  aboutUsSections,
  aboutUsImage,
} from "@/utils/database/queries/aboutUsQuery";

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

    return NextResponse.json(article);
  } catch (error) {
    throw new Error("Failed to fecth about us data");
  } finally {
    connection.release();
  }
}

export default async function Page() {
  const response = await getData();
  const article = await response.json();

  return <AboutUs article={article} />;
}
