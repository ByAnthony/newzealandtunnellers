import { NextResponse } from "next/server";

import { Article } from "@/components/Article/Article";
import {
  ArticleData,
  SectionData,
  ArticleReferenceData,
  Chapter,
  ImageData,
} from "@/types/article";
import { mysqlConnection } from "@/utils/database/mysqlConnection";
import {
  chapterQuery,
  sectionsQuery,
  imagesQuery,
  nextArticleQuery,
} from "@/utils/database/queries/historyChapterQuery";
import { getNextChapter } from "@/utils/helpers/article";

async function getData(params: { id: string }) {
  const connection = await mysqlConnection.getConnection();

  try {
    const data: ArticleData = await chapterQuery(params.id, connection);
    const section: SectionData[] = await sectionsQuery(params.id, connection);
    const images: ImageData[] = await imagesQuery(params.id, connection);
    const nextArticle: ArticleReferenceData[] =
      await nextArticleQuery(connection);

    const article: Chapter = {
      id: data.id,
      chapter: data.chapter,
      title: data.title,
      section: section,
      image: images,
      next: getNextChapter(data.chapter, nextArticle),
      notes: data.notes,
    };

    return NextResponse.json(article);
  } catch (error) {
    throw new Error("Failed to fetch history chapter data");
  } finally {
    connection.release();
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getData({ id: params.id });
  const article = await response.json();

  return <Article article={article} />;
}
