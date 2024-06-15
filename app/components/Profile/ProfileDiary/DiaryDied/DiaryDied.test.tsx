import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { mockAfterWarDeath } from "../../../../utils/mocks/mockPostServiceYears";
import { mockDeath, mockDate } from "../../../../utils/mocks/mockMilitaryYears";

import { DiaryDied } from "./DiaryDied";

describe("Death War", () => {
  const component = <DiaryDied warDeath={mockDeath} afterWarDeath={null} />;

  test("renders the component correctly", () => {
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders age and date when known", () => {
    render(component);

    expect(screen.getByText("Died at the age of 89")).toBeInTheDocument();
    expect(screen.getByText("13 October 1926")).toBeInTheDocument();
  });

  test("renders date when age unknown", () => {
    const mockComponent = (
      <DiaryDied
        warDeath={{ ...mockDeath, ageAtDeath: null }}
        afterWarDeath={null}
      />
    );

    render(mockComponent);

    expect(screen.queryByText("Died at the age of 89")).not.toBeInTheDocument();
    expect(screen.getByText("13 October 1926")).toBeInTheDocument();
  });

  test("renders year when day and month unknown", () => {
    const mockComponent = (
      <DiaryDied
        warDeath={{
          ...mockDeath,
          date: { ...mockDate, dayMonth: null },
          ageAtDeath: null,
        }}
        afterWarDeath={null}
      />
    );

    render(mockComponent);

    expect(screen.queryByText("Died at the age of 89")).not.toBeInTheDocument();
    expect(screen.getByText("1926")).toBeInTheDocument();
  });
});

describe("Post War Death", () => {
  const component = (
    <DiaryDied warDeath={null} afterWarDeath={mockAfterWarDeath} />
  );

  test("renders the component correctly", () => {
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders age and date when known", () => {
    render(component);

    expect(screen.getByText("Died at the age of 89")).toBeInTheDocument();
    expect(screen.getByText("13 October 1926")).toBeInTheDocument();
  });

  test("renders date when age unknown", () => {
    const mockComponent = (
      <DiaryDied
        warDeath={null}
        afterWarDeath={{ ...mockAfterWarDeath, ageAtDeath: null }}
      />
    );

    render(mockComponent);

    expect(screen.queryByText("Died at the age of 89")).not.toBeInTheDocument();
    expect(screen.getByText("13 October 1926")).toBeInTheDocument();
  });

  test("renders year when day and month unknown", () => {
    const mockComponent = (
      <DiaryDied
        warDeath={null}
        afterWarDeath={{
          ...mockAfterWarDeath,
          date: { ...mockDate, dayMonth: null },
          ageAtDeath: null,
        }}
      />
    );

    render(mockComponent);

    expect(screen.queryByText("Died at the age of 89")).not.toBeInTheDocument();
    expect(screen.getByText("1926")).toBeInTheDocument();
  });
});

test("does not render the component when unknown", () => {
  const { container } = render(
    <DiaryDied warDeath={null} afterWarDeath={null} />,
  );

  expect(container).toBeEmptyDOMElement();
});
