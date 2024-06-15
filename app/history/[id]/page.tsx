import { Chapter } from "../../types/article";
import { gethistoryChapter } from "../../utils/api/getEndpoint";
import { Article } from "../../components/Article/Article";

export default async function historyChapter({
  params,
}: {
  params: { id: string };
}) {
  const article: Chapter = await gethistoryChapter(params.id);

  return <Article article={article} />;
}
