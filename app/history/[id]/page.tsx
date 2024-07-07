import {
  ArticleData,
  ArticleReferenceData,
  Chapter,
  ImageData,
  SectionData,
} from "@/types/article";
import { Article } from "@/components/Article/Article";
import { mysqlConnection } from "@/utils/database/mysqlConnection";
import {
  chapterQuery,
  imagesQuery,
  nextArticleQuery,
  sectionsQuery,
} from "@/utils/database/queries/historyChapterQuery";
import { getNextChapter } from "@/utils/helpers/article";

export default async function Page({ params }: { params: { id: string } }) {
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

    return <Article article={article} />;
  } catch (error) {
    return { error: error };
  } finally {
    connection.release();
  }
}
