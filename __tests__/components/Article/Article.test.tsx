import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Article } from "../../../app/components/Article/Article";
import { mockArticle } from "../../mocks/mockArticle";
import { findElementWithText } from "../../helpers/findElementWithText";

jest.mock("../../../app/utils/helpers/date", () => ({
  today: new Date("2023-05-04"),
}));

describe("Article", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<Article article={mockArticle} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the component correctly", () => {
    render(<Article article={mockArticle} />);

    const historyLink = screen.getByText("History");
    expect(historyLink).toHaveAttribute("href", "/#history");

    const titleLineOne = screen.getByText("My Awesome");
    expect(titleLineOne).toHaveClass("title-line-1");

    const titleLineTwo = screen.getByText("Article Title");
    expect(titleLineTwo).toHaveClass("title-line-2");

    expect(screen.getByText("Section Title 1")).toBeInTheDocument();
    expect(screen.getByText("Section text one")).toBeInTheDocument();

    const image = screen.getAllByRole("img");
    expect(image).toHaveLength(2);
    expect(image[0]).toHaveAttribute("alt", "Accessible alt text");
    expect(image[0]).toHaveAttribute(
      "src",
      "/_next/image?url=%2Fimages%2Fhistory%2Fimg-123.png&w=1920&q=75",
    );
    expect(image[1]).toHaveAttribute("alt", "Accessible alt text");
    expect(image[1]).toHaveAttribute(
      "src",
      "/_next/image?url=%2Fimages%2Fhistory%2Fimg-123.png&w=1920&q=75",
    );
    expect(screen.getByText("An Amazing Photo")).toBeInTheDocument();
    expect(
      screen.getByText("The French Photographer Doisneau"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Where the photo is preserved"),
    ).toBeInTheDocument();

    expect(screen.getByText("Section Title 2")).toBeInTheDocument();
    expect(screen.getByText("Section text two")).toBeInTheDocument();

    const nextButton = screen.getByRole("link", {
      name: "Go to Chapter 3: Next Chapter",
    });
    expect(nextButton).toHaveAttribute(
      "href",
      "/history/my-path-to-next-chapter/",
    );
    expect(screen.getByText("Chapter 3")).toBeInTheDocument();
    expect(screen.getByText("Next Chapter")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Notes" })).toBeInTheDocument();
    const noteOne = screen.getByText("1.");
    expect(noteOne).toHaveAttribute("href", "#reference_1");
    expect(noteOne).toHaveAttribute("id", "footnote_1");
    const noteTwo = screen.getByText("2.");
    expect(noteTwo).toHaveAttribute("href", "#reference_2");
    expect(noteTwo).toHaveAttribute("id", "footnote_2");

    expect(
      screen.getByRole("heading", { name: "How to cite this page" }),
    ).toBeInTheDocument();
    expect(screen.getByText("My Awesome Article Title")).toBeInTheDocument();
    expect(
      findElementWithText("history/my-awesome-article-title."),
    ).toBeInTheDocument();
    expect(findElementWithText("Accessed: 4 May 2023.")).toBeInTheDocument();
  });

  test("does not render the next chapter link when null", () => {
    render(<Article article={{ ...mockArticle, next: null }} />);

    expect(
      screen.queryByRole("link", {
        name: "Go to Chapter 3: Next Chapter",
      }),
    ).toBeNull();
  });
});
