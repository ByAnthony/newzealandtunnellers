import { NextResponse } from "next/server";
import { mysqlConnection } from "../../../utils/api/mysqlConnection";
import {
  chapterQuery,
  imagesQuery,
  nextArticleQuery,
  sectionQuery,
} from "../../../utils/api/queries/historyChapterQuery";
import {
  ArticleData,
  ArticleReferenceData,
  Chapter,
  ImageData,
  SectionData,
} from "../../../types/article";

const getSections = (sections: SectionData[]) => {
  return sections.map((section: SectionData) => ({
    title: section.title,
    text: section.text,
  }));
};

const getImages = (images: ImageData[]) => {
  return images.map((image: ImageData) => ({
    file: image.file,
    title: image.title,
    photographer: image.photographer,
    reference: image.reference,
    alt: image.alt,
  }));
};

const getNextChapter = (chapter: number, articles: ArticleReferenceData[]) => {
  const index = articles.findIndex(
    (article: ArticleReferenceData) => article.chapter === chapter,
  );

  if (index !== -1 && index + 1 < articles.length) {
    const nextArticle = articles[index + 1];
    return {
      url: nextArticle.id,
      chapter: nextArticle.chapter,
      title: nextArticle.title,
    };
  }

  return null;
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const connection = await mysqlConnection();

  try {
    const article: ArticleData = await chapterQuery(params.id, connection);
    const section: SectionData[] = await sectionQuery(params.id, connection);
    const images: ImageData[] = await imagesQuery(params.id, connection);
    const nextArticle: ArticleReferenceData[] =
      await nextArticleQuery(connection);

    const data: Chapter = {
      id: article.id,
      chapter: article.chapter,
      title: article.title,
      section: getSections(section),
      image: getImages(images),
      next: getNextChapter(article.chapter, nextArticle),
      notes: article.notes,
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    );
  }
}
