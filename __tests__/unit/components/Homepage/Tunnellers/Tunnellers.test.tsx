import { render, screen } from "@testing-library/react";

import { Tunnellers } from "@/components/HomePage/Tunnellers/Tunnellers";

describe("Tunnellers", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<Tunnellers />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the main title", () => {
    render(<Tunnellers />);

    const title = screen.getByRole("heading", {
      name: "The Kiwis who fought beneath the no man’s land",
    });
    expect(title).toBeInTheDocument();
  });

  test("renders link to all Tunnellers page", () => {
    render(<Tunnellers />);

    const tunnellersLink = screen.getByRole("link", {
      name: "Discover The New Zealand Tunnellers",
    });
    expect(tunnellersLink).toHaveAttribute("href", "/tunnellers");
  });
});
