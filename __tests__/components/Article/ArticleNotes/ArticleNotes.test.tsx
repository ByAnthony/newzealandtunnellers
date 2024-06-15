import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { mockNotes } from "../../../utils/mocks/mockArticle";

import { ArticleNotes } from "./ArticleNotes";

const component = <ArticleNotes notes={mockNotes} />;

test("renders the component correctly", () => {
  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();
});

test("renders title correctly", () => {
  render(component);

  expect(screen.getAllByRole("link")[0]).toHaveAttribute(
    "href",
    "#reference_1",
  );
  expect(screen.getAllByRole("link")[0]).toHaveAttribute("id", "footnote_1");
  expect(screen.getAllByRole("link")[1]).toHaveAttribute(
    "href",
    "#reference_2",
  );
  expect(screen.getAllByRole("link")[1]).toHaveAttribute("id", "footnote_2");
});
