import { historyChapterData, historyImageChapters } from "@/types/homepage";

export const getHistoryChapters = (
  chapters: historyChapterData[],
  images: historyImageChapters[],
) => {
  const getChapterImage = (
    images: historyImageChapters[],
    position: number,
  ) => {
    if (position >= 0 && position < images.length) {
      return images[position].file;
    }
    return "";
  };

  return chapters.map((chapter: historyChapterData, index: number) => ({
    ...chapter,
    image: getChapterImage(images, index),
  }));
};
