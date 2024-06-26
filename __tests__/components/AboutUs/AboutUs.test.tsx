import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AboutUs } from "../../../app/components/AboutUs/AboutUs";
import { mockAboutUs } from "../../../app/utils/mocks/mockAboutUs";

describe("AboutUs", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<AboutUs article={mockAboutUs} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the component correctly", () => {
    render(<AboutUs article={mockAboutUs} />);

    const titleLineOne = screen.getByText("My Awesome");
    expect(titleLineOne).toHaveClass("title-line-1");

    const titleLineTwo = screen.getByText("Article Title");
    expect(titleLineTwo).toHaveClass("title-line-2");

    expect(screen.getByText("Section Title 1")).toBeInTheDocument();
    expect(screen.getByText("Section text one")).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Accessible alt text");

    expect(screen.getByText("Section Title 2")).toBeInTheDocument();
    expect(screen.getByText("Section text two")).toBeInTheDocument();
  });
});
