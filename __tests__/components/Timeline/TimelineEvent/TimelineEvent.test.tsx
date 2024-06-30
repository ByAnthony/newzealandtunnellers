import { render, screen } from "@testing-library/react";
import { TimelineEvent } from "../../../../app/components/Timeline/TimelineEvent/TimelineEvent";
import {
  mockEvent,
  mockEventBuried,
  mockEventCompany,
  mockEventDescription,
  mockEventDiedOfAccident,
  mockEventDiedOfDisease,
  mockEventDiedOfWounds,
  mockEventEnlisted,
  mockEventGrave,
  mockEventKilledInAction,
  mockEventPosted,
  mockEventTitleAndDescription,
  mockEventTrained,
} from "../../../testUtils//mocks/mockFrontEvents";

test("should render a timeline", () => {
  render(
    <TimelineEvent
      event={[
        mockEventCompany,
        mockEventDescription,
        mockEventEnlisted,
        mockEventPosted,
        mockEventTrained,
        mockEventTitleAndDescription,
      ]}
      place={() => null}
      disease={undefined}
      warInjuries={undefined}
      ageAtEnlistment={32}
    />,
  );

  expect(screen.getByText("Enlisted at the age of 32")).toBeInTheDocument();
  expect(screen.getByText("Main Body")).toBeInTheDocument();

  expect(screen.getByText(/Posted/)).toBeInTheDocument();
  expect(screen.getByText("Reinforcement")).toBeInTheDocument();

  expect(screen.getByText("Trained")).toBeInTheDocument();
  expect(screen.getByText("Military Camp, Somewhere")).toBeInTheDocument();

  expect(screen.getByText("Major Event")).toBeInTheDocument();
  expect(screen.getByText("Something happened")).toBeInTheDocument();

  expect(screen.getByText("Something happened that day")).toBeInTheDocument();

  const image = screen.getByRole("presentation");
  expect(image).toHaveAttribute("alt", "");
  expect(image).toHaveAttribute(
    "src",
    "/_next/image?url=%2Fimages%2Froll%2Fimage.jpg&w=1920&q=75",
  );
  expect(
    screen.getByText("Something happened that day for the Company"),
  ).toBeInTheDocument();
});

describe("TimelineEvent with killed in action", () => {
  test("should render killed in action event with description and place", () => {
    render(
      <TimelineEvent
        event={[mockEventDescription, mockEventKilledInAction]}
        place={() => "Baraffles, Rebreuve-Ranchicourt"}
        disease={undefined}
        warInjuries={undefined}
        ageAtEnlistment={null}
      />,
    );

    expect(screen.getByText("Something happened that day")).toBeInTheDocument();

    expect(screen.getByText("Killed in action")).toBeInTheDocument();
    expect(screen.getByText("Killed on the battlefield")).toBeInTheDocument();
    expect(
      screen.getByText("Baraffles, Rebreuve-Ranchicourt"),
    ).toBeInTheDocument();
  });

  test("should render killed in action event with description when place is null", () => {
    render(
      <TimelineEvent
        event={[mockEventDescription, mockEventKilledInAction]}
        place={() => null}
        disease={undefined}
        warInjuries={undefined}
        ageAtEnlistment={null}
      />,
    );

    expect(screen.getByText("Something happened that day")).toBeInTheDocument();

    expect(screen.getByText("Killed in action")).toBeInTheDocument();
    expect(screen.getByText("Killed on the battlefield")).toBeInTheDocument();
    expect(
      screen.queryByText("Baraffles, Rebreuve-Ranchicourt"),
    ).not.toBeInTheDocument();
  });

  test("should render killed in action event with place when description is null", () => {
    render(
      <TimelineEvent
        event={[
          mockEventDescription,
          { ...mockEvent, title: "Killed in action" },
        ]}
        place={() => "Baraffles, Rebreuve-Ranchicourt"}
        disease={undefined}
        warInjuries={undefined}
        ageAtEnlistment={null}
      />,
    );

    expect(screen.getByText("Something happened that day")).toBeInTheDocument();

    expect(screen.getByText("Killed in action")).toBeInTheDocument();
    expect(
      screen.getByText("Baraffles, Rebreuve-Ranchicourt"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Killed on the battlefield"),
    ).not.toBeInTheDocument();
  });
});

describe("TimelineEvent with died of wounds", () => {
  test("should render died of wounds event", () => {
    render(
      <TimelineEvent
        event={[mockEventDescription, mockEventDiedOfWounds]}
        place={() => "Baraffles, Rebreuve-Ranchicourt"}
        disease={undefined}
        warInjuries={undefined}
        ageAtEnlistment={null}
      />,
    );

    expect(screen.getByText("Something happened that day")).toBeInTheDocument();

    expect(screen.getByText("Died of wounds")).toBeInTheDocument();
    expect(
      screen.getByText("Baraffles, Rebreuve-Ranchicourt"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Wounded on the battlefield"),
    ).not.toBeInTheDocument();
  });
});

describe("TimelineEvent with died of disease", () => {
  test("should render died of disease event with place and circumstances", () => {
    render(
      <TimelineEvent
        event={[mockEventDescription, mockEventDiedOfDisease]}
        place={() => "Baraffles, Rebreuve-Ranchicourt"}
        disease="Pneumonia"
        warInjuries={undefined}
        ageAtEnlistment={null}
      />,
    );

    expect(screen.getByText("Something happened that day")).toBeInTheDocument();

    expect(screen.getByText("Died of disease")).toBeInTheDocument();
    expect(screen.getByText("(Pneumonia)")).toBeInTheDocument();
    expect(
      screen.getByText("Baraffles, Rebreuve-Ranchicourt"),
    ).toBeInTheDocument();
  });

  test("should render died of disease event with circumstances when place is null", () => {
    render(
      <TimelineEvent
        event={[mockEventDescription, mockEventDiedOfDisease]}
        place={() => null}
        disease="Pneumonia"
        warInjuries={undefined}
        ageAtEnlistment={null}
      />,
    );

    expect(screen.getByText("Something happened that day")).toBeInTheDocument();

    expect(screen.getByText("Died of disease")).toBeInTheDocument();
    expect(screen.getByText("(Pneumonia)")).toBeInTheDocument();
    expect(
      screen.queryByText("Baraffles, Rebreuve-Ranchicourt"),
    ).not.toBeInTheDocument();
  });

  test("should render died of disease event with war injuries", () => {
    render(
      <TimelineEvent
        event={[mockEventDescription, mockEventDiedOfDisease]}
        place={() => null}
        disease={undefined}
        warInjuries="Injuries contracted during active service"
        ageAtEnlistment={null}
      />,
    );

    expect(screen.getByText("Something happened that day")).toBeInTheDocument();

    expect(screen.getByText("Died of disease")).toBeInTheDocument();
    expect(
      screen.getByText("Injuries contracted during active service"),
    ).toBeInTheDocument();
  });
});

describe("TimelineEvent with died of accident", () => {
  test("should render died of accident event", () => {
    render(
      <TimelineEvent
        event={[mockEventDescription, mockEventDiedOfAccident]}
        place={() => null}
        disease={undefined}
        warInjuries={undefined}
        ageAtEnlistment={null}
      />,
    );

    expect(screen.getByText("Something happened that day")).toBeInTheDocument();

    expect(screen.getByText("Died of accident")).toBeInTheDocument();
    expect(screen.getByText("Fatal accident")).toBeInTheDocument();
  });
});

describe("TimelineEvent with buried and grave reference", () => {
  test("should render died of wounds event", () => {
    render(
      <TimelineEvent
        event={[
          mockEventBuried,
          mockEventDescription,
          mockEventDiedOfWounds,
          mockEventGrave,
        ]}
        place={() => "Baraffles, Rebreuve-Ranchicourt"}
        disease={undefined}
        warInjuries={undefined}
        ageAtEnlistment={null}
      />,
    );

    expect(screen.getByText("Something happened that day")).toBeInTheDocument();

    expect(screen.getByText("Died of wounds")).toBeInTheDocument();
    expect(
      screen.getByText("Baraffles, Rebreuve-Ranchicourt"),
    ).toBeInTheDocument();

    expect(screen.getByText("Buried")).toBeInTheDocument();
    expect(screen.getByText("Cemetery, France")).toBeInTheDocument();

    expect(screen.getByText("Grave reference")).toBeInTheDocument();
    expect(screen.getByText("1 A 26")).toBeInTheDocument();
  });
});
