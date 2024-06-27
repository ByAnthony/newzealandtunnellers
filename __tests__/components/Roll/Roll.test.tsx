import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockTunnellers } from "../../mocks/mockTunnellers";
import { Roll } from "../../../app/components/Roll/Roll";

describe("Roll", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<Roll tunnellers={mockTunnellers} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the component correctly", () => {
    render(<Roll tunnellers={mockTunnellers} />);

    const buttonB = screen.getByLabelText("Filter names by the letter B");
    const buttonD = screen.getByLabelText("Filter names by the letter D");
    const buttonM = screen.getByLabelText("Filter names by the letter M");
    const buttonS = screen.getByLabelText("Filter names by the letter S");
    expect(buttonB).toBeInTheDocument();
    expect(buttonB).toHaveTextContent("B");
    expect(buttonD).toBeInTheDocument();
    expect(buttonD).toHaveTextContent("D");
    expect(buttonM).toBeInTheDocument();
    expect(buttonM).toHaveTextContent("M");
    expect(buttonS).toBeInTheDocument();
    expect(buttonS).toHaveTextContent("S");

    const buttonAll = screen.getByLabelText("Remove the filter by name");
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toHaveTextContent("All");

    const titleB = screen.getByLabelText("Letter B");
    const titleD = screen.getByLabelText("Letter D");
    const titleM = screen.getByLabelText("Letter M");
    const titleS = screen.getByLabelText("Letter S");
    expect(titleB).toHaveClass("title");
    expect(titleB).toHaveTextContent("B");
    expect(titleB).toBeInTheDocument();
    expect(titleD).toHaveClass("title");
    expect(titleD).toHaveTextContent("D");
    expect(titleD).toBeInTheDocument();
    expect(titleM).toHaveClass("title");
    expect(titleM).toHaveTextContent("M");
    expect(titleM).toBeInTheDocument();
    expect(titleS).toHaveClass("title");
    expect(titleS).toHaveTextContent("S");
    expect(titleS).toBeInTheDocument();

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();

    expect(screen.getByText("Biff")).toBeInTheDocument();
    expect(screen.getByText("Tanen")).toBeInTheDocument();

    expect(screen.getByText("Emmett")).toBeInTheDocument();
    expect(screen.getByText("Brown")).toBeInTheDocument();

    expect(screen.getByText("Marty")).toBeInTheDocument();
    expect(screen.getByText("McFly")).toBeInTheDocument();
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
});
