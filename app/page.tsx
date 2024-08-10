import { HomePage } from "@/components/HomePage/HomePage";
import { HistoryChapterData, HistoryImageChapters } from "@/types/homepage";
import { mysqlConnection } from "@/utils/database/mysqlConnection";
import {
  historyChaptersQuery,
  historyImageChaptersQuery,
} from "@/utils/database/queries/homepageQuery";
import { getHistoryChapters } from "@/utils/helpers/homepage";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const connection = await mysqlConnection.getConnection();

    const historyImageChapters: HistoryImageChapters[] =
      await historyImageChaptersQuery(connection);
    const historyChapters: HistoryChapterData[] =
      await historyChaptersQuery(connection);

    const homepage = {
      historyChapters: getHistoryChapters(
        historyChapters,
        historyImageChapters,
      ),
    };

    connection.release();

    return homepage;
  } catch (error) {
    throw new Error("Failed to fetch homepage data");
  }
}

export default async function Page() {
  const homepage = await getData();

  return <HomePage homepage={homepage} />;
}
