import { render, screen, fireEvent } from "@testing-library/react";

import { RollNoResults } from "@/components/Roll/RollNoResults/RollNoResults";

describe("RollNoResults", () => {
  it("renders the no results message", () => {
    render(<RollNoResults handleResetFilters={jest.fn()} />);
    expect(
      screen.getByText("Sorry, no profile matches your filters"),
    ).toBeInTheDocument();
  });

  it("calls handleResetFilters when the button is clicked", () => {
    const handleResetFilters = jest.fn();
    render(<RollNoResults handleResetFilters={handleResetFilters} />);
    const button = screen.getByText("Clear Filter");
    fireEvent.click(button);
    expect(handleResetFilters).toHaveBeenCalledTimes(1);
  });
});
