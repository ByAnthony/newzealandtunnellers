import { HomePage } from "./components/HomePage/HomePage";
import {
  historyChapter,
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
  const connection = await mysqlConnection();

  try {
    const tunnellerImages: TunnellerImages[] =
      await tunnellerImagesQuery(connection);
    const historyImageChapters: any =
      await historyImageChaptersQuery(connection);
    const historyChapters: historyChapter[] =
      await historyChaptersQuery(connection);

    const homepage = {
      tunnellers: tunnellerImages,
      historyChapters: getHistoryChapters(
        historyChapters,
        historyImageChapters,
      ),
    };

    return <HomePage homepage={homepage} />;
  } catch (error) {
    return { error: error };
  }
}
