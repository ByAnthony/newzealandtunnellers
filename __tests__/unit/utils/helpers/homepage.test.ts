import { HistoryChapterData, HistoryImageChapters } from "@/types/homepage";
import { getHistoryChapters } from "@/utils/helpers/homepage";

describe("getHistoryChapters", () => {
  const chapters: HistoryChapterData[] = [
    { id: "chapter-1", chapter: 1, title: "Title 1" },
    { id: "chapter-2", chapter: 2, title: "Title 2" },
  ];

  test("should correctly map the chapters and assign the corresponding image", () => {
    const images: HistoryImageChapters[] = [
      { file: "image1.jpg" },
      { file: "image2.jpg" },
    ];

    const result = getHistoryChapters(chapters, images);

    expect(result).toEqual([
      { id: "chapter-1", chapter: 1, title: "Title 1", image: "image1.jpg" },
      { id: "chapter-2", chapter: 2, title: "Title 2", image: "image2.jpg" },
    ]);
  });

  test("should assign an empty string to the image if there is no corresponding image", () => {
    const images = [{ file: "image1.jpg" }];

    const result = getHistoryChapters(chapters, images);

    expect(result).toEqual([
      { id: "chapter-1", chapter: 1, title: "Title 1", image: "image1.jpg" },
      { id: "chapter-2", chapter: 2, title: "Title 2", image: "" },
    ]);
  });
});
