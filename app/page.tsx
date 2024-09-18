import { NextResponse } from "next/server";

import { HomePage } from "@/components/HomePage/HomePage";
import { HistoryImageChapters, HistoryChapterData } from "@/types/homepage";
import { mysqlConnection } from "@/utils/database/mysqlConnection";
import {
  historyImageChaptersQuery,
  historyChaptersQuery,
} from "@/utils/database/queries/homepageQuery";
import { getHistoryChapters } from "@/utils/helpers/homepage";

async function getData() {
  const connection = await mysqlConnection.getConnection();

  try {
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

    return NextResponse.json(homepage);
  } catch (error) {
    throw new Error("Failed to fetch homepage data");
  } finally {
    connection.release();
  }
}

export default async function Page() {
  const response = await getData();
  const homepage = await response.json();

  return <HomePage homepage={homepage} />;
}
