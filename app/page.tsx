import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { HomePage } from "@/components/HomePage/HomePage";
import { HistoryChapterData, HistoryImageChapters } from "@/types/homepage";
import {
  historyChaptersQuery,
  historyImageChaptersQuery,
} from "@/utils/database/queries/homepageQuery";
import { getHistoryChapters } from "@/utils/helpers/homepage";

export const dynamic = "force-dynamic";

async function getData() {
  const connection = await db.connect();

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
