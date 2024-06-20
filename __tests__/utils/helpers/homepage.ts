import {
  historyChapterData,
  historyImageChapters,
} from "../../../app/types/homepage";
import { getHistoryChapters } from "../../../app/utils/helpers/homepage";

describe("getHistoryChapters", () => {
  const chapters: historyChapterData[] = [
    { id: "chapter-1", chapter: 1, title: "Title 1" },
    { id: "chapter-2", chapter: 2, title: "Title 2" },
  ];

  it("should correctly map the chapters and assign the corresponding image", () => {
    const images: historyImageChapters[] = [
      { file: "image1.jpg" },
      { file: "image2.jpg" },
    ];

    const result = getHistoryChapters(chapters, images);

    expect(result).toEqual([
      { id: "chapter-1", chapter: 1, title: "Title 1", image: "image1.jpg" },
      { id: "chapter-2", chapter: 2, title: "Title 2", image: "image2.jpg" },
    ]);
  });

  it("should assign an empty string to the image if there is no corresponding image", () => {
    const images = [{ file: "image1.jpg" }];

    const result = getHistoryChapters(chapters, images);

    expect(result).toEqual([
      { id: "chapter-1", chapter: 1, title: "Title 1", image: "image1.jpg" },
      { id: "chapter-2", chapter: 2, title: "Title 2", image: "" },
    ]);
  });
});
