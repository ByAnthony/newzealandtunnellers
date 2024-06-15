import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import { mockFrontEventsWithKilledInAction } from "../../../utils/mocks/mockFrontEvents";
import {
  mockEmbarkationUnit,
  mockEnlistment,
  mockMedals,
  mockMilitaryYears,
  mockTransport,
} from "../../../utils/mocks/mockMilitaryYears";
import { mockPostServiceYears } from "../../../utils/mocks/mockPostServiceYears";

import { TimelineEvents } from "./TimelineEvents";

test("should render TimelineEvents", () => {
  const { asFragment } = render(
    <TimelineEvents
      militaryYears={mockMilitaryYears}
      postServiceYears={mockPostServiceYears}
    />,
  );

  expect(asFragment()).toMatchSnapshot();
});

describe("TimelineEvents place()", () => {
  const makeMockMilitaryYears = (location: string, town: string) => ({
    enlistment: mockEnlistment,
    embarkationUnit: mockEmbarkationUnit,
    transportUk: mockTransport,
    frontEvents: mockFrontEventsWithKilledInAction,
    endOfService: {
      deserter: false,
      transferred: null,
      deathWar: {
        date: {
          year: "1916",
          dayMonth: "9 Septmber",
        },
        place: {
          location,
          town,
          country: "France",
        },
        cause: {
          type: "Killed in action",
          circumstances: "Killed on the battlefield",
        },
        cemetery: {
          name: "Cemetery",
          location: "Ranchicourt",
          country: "France",
          graveReference: "1 A 26",
        },
        ageAtDeath: 18,
      },
      transportNz: null,
      demobilization: null,
    },
    medals: mockMedals,
  });

  test("should render location and town when known", () => {
    render(
      <TimelineEvents
        militaryYears={makeMockMilitaryYears(
          "Baraffles",
          "Rebreuve-Ranchicourt",
        )}
        postServiceYears={mockPostServiceYears}
      />,
    );

    expect(
      screen.getByText("Baraffles, Rebreuve-Ranchicourt"),
    ).toBeInTheDocument();
  });

  test("should render location only when town is null", () => {
    render(
      <TimelineEvents
        militaryYears={makeMockMilitaryYears("Baraffles", "")}
        postServiceYears={mockPostServiceYears}
      />,
    );

    expect(screen.getByText("Baraffles")).toBeInTheDocument();
    expect(screen.queryByText("Rebreuve-Ranchicourt")).not.toBeInTheDocument();
  });

  test("should not render location and town when unknown", () => {
    render(
      <TimelineEvents
        militaryYears={makeMockMilitaryYears("", "")}
        postServiceYears={mockPostServiceYears}
      />,
    );

    expect(screen.queryByText("Baraffles")).not.toBeInTheDocument();
    expect(screen.queryByText("Rebreuve-Ranchicourt")).not.toBeInTheDocument();
  });
});
