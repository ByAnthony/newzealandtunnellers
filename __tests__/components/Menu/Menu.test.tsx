import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Menu } from "../../../app/components/Menu/Menu";
import { mockTunnellersData } from "../../mocks/mockTunnellers";
import { doc } from "prettier";

describe("Menu", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<Menu tunnellers={mockTunnellersData} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the component correctly", () => {
    render(<Menu tunnellers={mockTunnellersData} />);

    const nextButton = screen.getByRole("link", {
      name: "Go to the Homepage",
    });
    expect(nextButton).toHaveAttribute("href", "/");

    const search = screen.getByRole("textbox");
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute("placeholder", "Search for a Tunneller");
  });

  test("can input a name", () => {
    render(<Menu tunnellers={mockTunnellersData} />);

    const search = screen.getByRole("textbox");
    fireEvent.click(search);
    fireEvent.change(search, {
      target: { value: "John Doe" },
    });

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toHaveClass("surname");
    expect(screen.getByText("(1886-1952)")).toBeInTheDocument();
    expect(screen.getAllByRole("link")[1]).toHaveAttribute(
      "href",
      "/tunnellers/1",
    );
  });

  test("can close the dropdown with outside click", () => {
    render(<Menu tunnellers={mockTunnellersData} />);

    const search = screen.getByRole("textbox");
    fireEvent.click(search);
    fireEvent.change(search, {
      target: { value: "John Doe" },
    });

    expect(screen.getByRole("list")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("can clear name and close the dropdown", () => {
    render(<Menu tunnellers={mockTunnellersData} />);

    const search = screen.getByRole("textbox");
    fireEvent.click(search);
    fireEvent.change(search, {
      target: { value: "John Doe" },
    });

    expect(screen.getByRole("list")).toBeInTheDocument();

    fireEvent.click(search);
    fireEvent.change(search, {
      target: { value: "" },
    });
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
