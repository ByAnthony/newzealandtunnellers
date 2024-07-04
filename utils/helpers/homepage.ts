import { HistoryChapterData, HistoryImageChapters } from "@/types/homepage";

export const getHistoryChapters = (
  chapters: HistoryChapterData[],
  images: HistoryImageChapters[],
) => {
  const getChapterImage = (
    images: HistoryImageChapters[],
    position: number,
  ) => {
    if (position >= 0 && position < images.length) {
      return images[position].file;
    }
    return "";
  };

  return chapters.map((chapter: HistoryChapterData, index: number) => ({
    ...chapter,
    image: getChapterImage(images, index),
  }));
};
