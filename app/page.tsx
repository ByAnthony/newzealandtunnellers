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

export default async function Page() {
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

    return <HomePage homepage={homepage} />;
  } catch (error) {
    return { error: error };
  }
}
