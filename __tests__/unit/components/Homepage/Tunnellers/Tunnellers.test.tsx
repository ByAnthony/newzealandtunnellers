import { render, screen } from "@testing-library/react";

import { Tunnellers } from "@/components/HomePage/Tunnellers/Tunnellers";

describe("Tunnellers", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<Tunnellers />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders link to all Tunnellers page", () => {
    render(<Tunnellers />);

    const tunnellersLink = screen.getByRole("link", {
      name: "Discover The New Zealand Tunnellers",
    });
    expect(tunnellersLink).toHaveAttribute("href", "/tunnellers");
  });
});
