import { fireEvent, render, screen } from "@testing-library/react";

import { AboutUs } from "@/components/AboutUs/AboutUs";
import { mockAboutUs } from "__tests__/unit/utils/mocks/mockAboutUs";

let originalWindowLocation = window.location;

beforeEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    enumerable: true,
    value: new URL(window.location.href),
  });
});

afterEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    enumerable: true,
    value: originalWindowLocation,
  });
});

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

  test("should open mailto link when email button is clicked", () => {
    window.open = jest.fn();

    const { getByLabelText } = render(<AboutUs article={mockAboutUs} />);

    const emailButton = getByLabelText("Contact by email");

    fireEvent.click(emailButton);

    expect(window.open).toHaveBeenCalledWith("mailto:info@nztunnellers.com");
  });

  test("should navigate to LinkedIn URL when LinkedIn button is clicked", () => {
    const { getByLabelText } = render(<AboutUs article={mockAboutUs} />);

    const linkedinButton = getByLabelText("Contact on LinkedIn");

    fireEvent.click(linkedinButton);

    expect(window.location.href).toBe(
      "https://www.linkedin.com/in/anthony-byledbal/",
    );
  });
});
