import { getNextChapter } from "../../../app/utils/helpers/article";

describe("getNextChapter", () => {
  const articles = [
    { id: "article1", chapter: 1, title: "Article 1" },
    { id: "article2", chapter: 2, title: "Article 2" },
    { id: "article3", chapter: 3, title: "Article 3" },
  ];

  it("should return the next chapter when it exists", () => {
    const chapter = 1;
    const expectedNextChapter = {
      url: "article2",
      chapter: 2,
      title: "Article 2",
    };

    const nextChapter = getNextChapter(chapter, articles);

    expect(nextChapter).toEqual(expectedNextChapter);
  });

  it("should return null when there is no next chapter", () => {
    const chapter = 3;

    const nextChapter = getNextChapter(chapter, articles);

    expect(nextChapter).toBeNull();
  });
});
