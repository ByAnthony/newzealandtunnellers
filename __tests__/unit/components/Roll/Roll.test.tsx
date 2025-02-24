import { fireEvent, render, screen } from "@testing-library/react";

import { Roll } from "@/components/Roll/Roll";
import { AttachedCorpsBadge } from "@/components/Roll/RollDetails/RollDetails";
import { mockTunnellers } from "__tests__/unit/utils/mocks/mockTunnellers";

describe("Roll", () => {
  beforeEach(() => {
    global.scrollTo = jest.fn();
  });

  test("matches the snapshot", () => {
    const { asFragment } = render(<Roll tunnellers={mockTunnellers} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the component correctly", () => {
    render(<Roll tunnellers={mockTunnellers} />);

    const buttonB = screen.getByLabelText("Filter names by the letter B");
    const buttonD = screen.getByLabelText("Filter names by the letter D");
    const buttonM = screen.getByLabelText("Filter names by the letter M");
    const buttonT = screen.getByLabelText("Filter names by the letter T");
    expect(buttonB).toBeInTheDocument();
    expect(buttonB).toHaveTextContent("B");
    expect(buttonD).toBeInTheDocument();
    expect(buttonD).toHaveTextContent("D");
    expect(buttonM).toBeInTheDocument();
    expect(buttonM).toHaveTextContent("M");
    expect(buttonT).toBeInTheDocument();
    expect(buttonT).toHaveTextContent("T");

    const buttonAll = screen.getByLabelText("Remove the filter by letter");
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toHaveTextContent("All");

    const titleB = screen.getByLabelText("Letter B");
    const titleD = screen.getByLabelText("Letter D");
    const titleM = screen.getByLabelText("Letter M");
    const titleT = screen.getByLabelText("Letter T");
    expect(titleB).toHaveClass("title");
    expect(titleB).toHaveTextContent("B");
    expect(titleB).toBeInTheDocument();
    expect(titleD).toHaveClass("title");
    expect(titleD).toHaveTextContent("D");
    expect(titleD).toBeInTheDocument();
    expect(titleM).toHaveClass("title");
    expect(titleM).toHaveTextContent("M");
    expect(titleM).toBeInTheDocument();
    expect(titleT).toHaveClass("title");
    expect(titleT).toHaveTextContent("T");
    expect(titleT).toBeInTheDocument();

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    const johnDoe = screen.getByRole("link", {
      name: "Sapper John Doe Main Body 1886-1952 →",
    });
    expect(johnDoe).toHaveAttribute("href", "/tunnellers/1");

    expect(screen.getByText("Biff")).toBeInTheDocument();
    expect(screen.getByText("Tanen")).toBeInTheDocument();
    const biffTanen = screen.getByRole("link", {
      name: "Sapper Biff Tanen 2nd Reinforcements 1897-†? →",
    });
    expect(biffTanen).toHaveAttribute("href", "/tunnellers/2");

    expect(screen.getByText("Emmett")).toBeInTheDocument();
    expect(screen.getByText("Brown")).toBeInTheDocument();
    const EmmetBrown = screen.getByRole("link", {
      name: "Sapper Emmett Brown Main Body ?-1935 →",
    });
    expect(EmmetBrown).toHaveAttribute("href", "/tunnellers/3");

    expect(screen.getByText("Marty")).toBeInTheDocument();
    expect(screen.getByText("McFly")).toBeInTheDocument();
    const MartyMcFly = screen.getByRole("link", {
      name: "Sapper Marty McFly 5th Reinforcements Army Pay Corps ?-†? →",
    });
    expect(MartyMcFly).toHaveAttribute("href", "/tunnellers/4");
  });

  test("should filter by name", () => {
    render(<Roll tunnellers={mockTunnellers} />);

    const buttonD = screen.getByLabelText("Filter names by the letter D");
    fireEvent.click(buttonD);
    expect(screen.getByLabelText("Letter D")).toBeInTheDocument();
    expect(screen.queryByLabelText("Letter B")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Letter M")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Letter S")).not.toBeInTheDocument();

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();

    expect(screen.queryByText("Biff")).not.toBeInTheDocument();
    expect(screen.queryByText("Tanen")).not.toBeInTheDocument();

    expect(screen.queryByText("Emmett")).not.toBeInTheDocument();
    expect(screen.queryByText("Brown")).not.toBeInTheDocument();

    expect(screen.queryByText("Marty")).not.toBeInTheDocument();
    expect(screen.queryByText("McFly")).not.toBeInTheDocument();
  });

  test("should remove filter by name", () => {
    render(<Roll tunnellers={mockTunnellers} />);

    const buttonD = screen.getByLabelText("Filter names by the letter D");
    const buttonAll = screen.getByLabelText("Remove the filter by letter");

    fireEvent.click(buttonD);

    expect(screen.getByLabelText("Letter D")).toBeInTheDocument();
    expect(screen.queryByLabelText("Letter B")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Letter M")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Letter T")).not.toBeInTheDocument();

    fireEvent.click(buttonAll);

    expect(screen.getByLabelText("Letter D")).toBeInTheDocument();
    expect(screen.getByLabelText("Letter B")).toBeInTheDocument();
    expect(screen.getByLabelText("Letter M")).toBeInTheDocument();
    expect(screen.getByLabelText("Letter T")).toBeInTheDocument();
  });
});

describe("AttachedCorpsBadge", () => {
  test("renders correctly with given props", () => {
    render(<AttachedCorpsBadge attachedCorps="Engineers" />);
    const badgeElement = screen.getByText("Engineers");
    expect(badgeElement).toBeInTheDocument();
  });
});
