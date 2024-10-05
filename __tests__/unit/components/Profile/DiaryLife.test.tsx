import { render, screen } from "@testing-library/react";

import { DiaryLife } from "@/components/Profile/ProfileDiary/DiaryLife/DiaryLife";

const component = <DiaryLife maritalStatus="Married" wife="Jane Doe" />;

test("renders the component correctly", () => {
  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();
});

test("renders personal life when known", () => {
  render(component);

  expect(screen.getByText("Personal Life")).toBeInTheDocument();
  expect(screen.getByText("Marital Status")).toBeInTheDocument();
  expect(screen.getByText("Married")).toBeInTheDocument();
  expect(screen.getByText("Wife")).toBeInTheDocument();
  expect(screen.getByText("Jane Doe")).toBeInTheDocument();
});

describe.each(["Single", "Widower", "Separated"])(
  "renders marital status if",
  (maritalStatus) => {
    test(`${maritalStatus}`, () => {
      const mockComponent = (
        <DiaryLife maritalStatus={maritalStatus} wife={null} />
      );

      render(mockComponent);

      expect(screen.getByText("Personal Life")).toBeInTheDocument();
      expect(screen.getByText("Marital Status")).toBeInTheDocument();
      expect(screen.getByText(maritalStatus)).toBeInTheDocument();
      expect(screen.queryByText("Wife")).not.toBeInTheDocument();
      expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    });
  },
);

test("does not render residence when unknown", () => {
  const { container } = render(<DiaryLife maritalStatus={null} wife={null} />);

  expect(container).toBeEmptyDOMElement();
});
