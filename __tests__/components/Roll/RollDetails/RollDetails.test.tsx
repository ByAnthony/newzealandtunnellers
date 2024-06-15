import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { RollDetails } from "../../../../app/components/Roll/RollDetails/RollDetails";
import { mockDetailsList } from "__tests__/mocks/mockRoll";

const component = <RollDetails listOfTunnellers={mockDetailsList} />;

test("renders the component correctly", () => {
  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();
});

test("renders details", () => {
  render(component);

  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("Doe")).toBeInTheDocument();
  expect(
    screen
      .getByRole("link", { name: "John Doe 1886-1952 →" })
      .getAttribute("href"),
  ).toBe("/tunnellers/26");

  expect(screen.getByText("Alexander")).toBeInTheDocument();
  expect(screen.getByText("Driscott")).toBeInTheDocument();
  expect(
    screen
      .getByRole("link", { name: "Alexander Driscott 1886-1952 →" })
      .getAttribute("href"),
  ).toBe("/tunnellers/1");
});
