import { HomePage } from "@/components/HomePage/HomePage";
import {
  HistoryChapterData,
  HistoryImageChapters,
  TunnellerImages,
} from "@/types/homepage";
import { mysqlConnection } from "@/utils/database/mysqlConnection";
import {
  historyChaptersQuery,
  historyImageChaptersQuery,
  tunnellerImagesQuery,
} from "@/utils/database/queries/homepageQuery";
import { getHistoryChapters } from "@/utils/helpers/homepage";

async function getData() {
  try {
    const connection = await mysqlConnection.getConnection();

    const tunnellerImages: TunnellerImages[] =
      await tunnellerImagesQuery(connection);
    const historyImageChapters: HistoryImageChapters[] =
      await historyImageChaptersQuery(connection);
    const historyChapters: HistoryChapterData[] =
      await historyChaptersQuery(connection);

    const homepage = {
      tunnellers: tunnellerImages,
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
};

export default async function Page() {
  const homepage = await getData();

  return <HomePage homepage={homepage} />
}
