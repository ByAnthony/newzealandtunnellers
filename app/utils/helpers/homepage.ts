import { historyChapter, historyImageChapters } from "../../types/homepage";

export const getHistoryChapters = (
  chapters: historyChapter[],
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

  return chapters.map((chapter: historyChapter, index: number) => ({
    ...chapter,
    image: getChapterImage(images, index),
  }));
};
