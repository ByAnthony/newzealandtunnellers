import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { mockNextButton } from "../../../utils/mocks/mockArticle";

import { ArticleNextChapterButton } from "./ArticleNextChapterButton";

const component = <ArticleNextChapterButton chapter={mockNextButton} />;

test("renders the component correctly", () => {
  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();
});

test("renders next chapter button correctly", () => {
  render(component);

  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    "/history/my-path-to-next-chapter/",
  );
  expect(screen.getByRole("link")).toHaveTextContent(/Next Chapter/);
  expect(screen.getByRole("link")).toHaveTextContent(/Chapter 3/);
});

test("do not render next chapter button if null", () => {
  const { container } = render(
    <ArticleNextChapterButton chapter={undefined} />,
  );

  expect(container).toBeEmptyDOMElement();
});
