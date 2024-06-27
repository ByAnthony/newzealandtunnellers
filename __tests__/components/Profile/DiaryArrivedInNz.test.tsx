import { render, screen } from "@testing-library/react";
import { DiaryArrivedInNz } from "../../../app/components/Profile/ProfileDiary/DiaryArrivedInNz/DiaryArrivedInNz";

const component = <DiaryArrivedInNz inNzLength="1903" />;

test("renders the component correctly", () => {
  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();
});

test("renders the component when date known", () => {
  render(component);

  expect(screen.getByText("Settled in New Zealand")).toBeInTheDocument();
  expect(screen.getByText("1903")).toBeInTheDocument();
});

test("does not render the component when date unknown", () => {
  const { container } = render(<DiaryArrivedInNz inNzLength={null} />);

  expect(container).toBeEmptyDOMElement();
});
