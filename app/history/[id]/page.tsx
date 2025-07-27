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

type Props = {
  params: Promise<{ id: string }>;
};

async function getData(id: string) {
  const connection = await mysqlConnection.getConnection();

  try {
    const data: ArticleData = await chapterQuery(id, connection);
    const section: SectionData[] = await sectionsQuery(id, connection);
    const images: ImageData[] = await imagesQuery(id, connection);
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
    throw new Error(
      `Failed to fetch Chapter data: ${(error as Error).message}`,
    );
  } finally {
    connection.release();
  }
}

async function getArticle(props: Props): Promise<Chapter> {
  const { id } = await props.params;
  const response = await getData(id);
  return await response.json();
}

export async function generateMetadata(props: Props) {
  const article = await getArticle(props);
  const title = article.title.replace(/\\/g, " ");

  return {
    title: `${title} - New Zealand Tunnellers`,
  };
}

export default async function Page(props: Props) {
  const article = await getArticle(props);

  return <Article article={article} />;
}
