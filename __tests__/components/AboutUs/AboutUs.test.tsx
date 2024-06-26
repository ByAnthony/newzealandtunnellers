import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AboutUs } from "../../../app/components/AboutUs/AboutUs";
import { mockArticle } from "../../../app/utils/mocks/mockArticle";

describe("<AboutUs />", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<AboutUs article={mockArticle} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the article title, sections, and image correctly", () => {
    render(<AboutUs article={mockArticle} />);

    expect(screen.getByText("Our Story")).toBeInTheDocument();

    expect(
      screen.getByText("This is the first paragraph of our story."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is the second paragraph of our story."),
    ).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "A picture of our team");
  });
});
