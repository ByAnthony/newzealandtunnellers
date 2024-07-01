import { render } from "@testing-library/react";
import { formatText } from "../../../utils/helpers/article";
import { getNextChapter } from "../../../utils/helpers/article";

describe("getNextChapter", () => {
  const articles = [
    { id: "article1", chapter: 1, title: "Article 1" },
    { id: "article2", chapter: 2, title: "Article 2" },
    { id: "article3", chapter: 3, title: "Article 3" },
  ];

  test("should return the next chapter when it exists", () => {
    const chapter = 1;
    const expectedNextChapter = {
      url: "article2",
      chapter: 2,
      title: "Article 2",
    };

    const nextChapter = getNextChapter(chapter, articles);

    expect(nextChapter).toEqual(expectedNextChapter);
  });

  test("should return null when there is no next chapter", () => {
    const chapter = 3;

    const nextChapter = getNextChapter(chapter, articles);

    expect(nextChapter).toBeNull();
  });
});

describe("formatText", () => {
  test("renders italic text correctly", () => {
    const { getByText } = render(formatText("This is *italic* text."));
    expect(getByText("italic").tagName).toBe("EM");
  });

  test("renders footnote links correctly", () => {
    const { getByText } = render(formatText("This is a [1](#footnote_1)."));
    const link = getByText("[1]");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#footnote_1");
  });

  test("renders reference links correctly", () => {
    const { getByText } = render(formatText("This is a [1](#reference_1)."));
    const link = getByText("1");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#reference_1");
  });

  test("renders combined text correctly", () => {
    const { getByText } = render(
      formatText("This is *italic* and this is a [link](http://example.com)."),
    );
    expect(getByText("italic").tagName).toBe("EM");
    const link = getByText("link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "http://example.com");
  });

  test("handles text with no special formatting", () => {
    const { container } = render(formatText("Just plain text."));
    expect(container.textContent).toBe("Just plain text.");
  });
});
