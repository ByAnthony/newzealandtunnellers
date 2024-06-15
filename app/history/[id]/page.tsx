import {
  ArticleData,
  ArticleReferenceData,
  Chapter,
  ImageData,
  SectionData,
} from "../../types/article";
import { Article } from "../../components/Article/Article";
import { mysqlConnection } from "../../utils/database/mysqlConnection";
import {
  chapterQuery,
  imagesQuery,
  nextArticleQuery,
  sectionsQuery,
} from "../../utils/database/queries/historyChapterQuery";
import {
  getSections,
  getImages,
  getNextChapter,
} from "../../utils/helpers/article";

export default async function historyChapter({
  params,
}: {
  params: { id: string };
}) {
  const connection = await mysqlConnection();

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
      section: getSections(section),
      image: getImages(images),
      next: getNextChapter(data.chapter, nextArticle),
      notes: data.notes,
    };

    return <Article article={article} />;
  } catch (error) {
    return { error: error };
  }
}
