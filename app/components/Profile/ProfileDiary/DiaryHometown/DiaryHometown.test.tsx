import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { DiaryHometown } from "./DiaryHometown";

const component = <DiaryHometown residence="Wellington" />;

test("renders the component correctly", () => {
  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();
});

test("renders residence when known", () => {
  render(component);

  expect(screen.getByText("Live")).toBeInTheDocument();
  expect(screen.getByText("Hometown")).toBeInTheDocument();
  expect(screen.getByText("Wellington")).toBeInTheDocument();
});

test("does not render residence when unknown", () => {
  const { container } = render(<DiaryHometown residence={null} />);

  expect(container).toBeEmptyDOMElement();
});
