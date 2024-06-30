import { HomePage } from "./components/HomePage/HomePage";
import {
  historyChapterData,
  historyImageChapters,
  TunnellerImages,
} from "./types/homepage";
import { mysqlConnection } from "./utils/database/mysqlConnection";
import {
  historyChaptersQuery,
  historyImageChaptersQuery,
  tunnellerImagesQuery,
} from "./utils/database/queries/homepageQuery";
import { getHistoryChapters } from "./utils/helpers/homepage";

export default async function Home() {
  try {
    const connection = await mysqlConnection();

    const tunnellerImages: TunnellerImages[] =
      await tunnellerImagesQuery(connection);
    const historyImageChapters: historyImageChapters[] =
      await historyImageChaptersQuery(connection);
    const historyChapters: historyChapterData[] =
      await historyChaptersQuery(connection);

    const homepage = {
      tunnellers: tunnellerImages,
      historyChapters: getHistoryChapters(
        historyChapters,
        historyImageChapters,
      ),
    };

    connection.end();

    return <HomePage homepage={homepage} />;
  } catch (error) {
    return { error: error };
  }
}
