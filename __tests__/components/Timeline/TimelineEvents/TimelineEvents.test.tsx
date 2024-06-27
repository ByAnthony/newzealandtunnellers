import { render, screen } from "@testing-library/react";
import { TimelineEvents } from "../../../../app/components/Timeline/TimelineEvents/TimelineEvents";
import {
  mockDeath,
  mockEndOfService,
  mockMilitaryYears,
} from "../../../mocks/mockTunneller";
import {
  mockFrontEventsWithDiedOfDisease,
  mockFrontEventsWithKilledInAction,
} from "../../../mocks/mockFrontEvents";

test("should render TimelineEvents", () => {
  const { asFragment } = render(
    <TimelineEvents militaryYears={mockMilitaryYears} death={mockDeath} />,
  );

  expect(asFragment()).toMatchSnapshot();
});

describe("TimelineEvents", () => {
  const makeMockDeath = (location: string, town: string) => ({
    ...mockDeath,
    place: {
      country: "France",
      location,
      town,
    },
  });

  test("should render disease", () => {
    render(
      <TimelineEvents
        militaryYears={{
          ...mockMilitaryYears,
          frontEvents: mockFrontEventsWithDiedOfDisease,
          endOfService: { ...mockEndOfService, deathWar: true },
        }}
        death={{
          ...mockDeath,
          date: { year: "1917", dayMonth: "8 August" },
          cause: { cause: "Died of disease", circumstances: "Pneumonia" },
        }}
      />,
    );

    expect(screen.getByText("(Pneumonia)")).toBeInTheDocument();
  });

  test("should render injuries", () => {
    render(
      <TimelineEvents
        militaryYears={{
          ...mockMilitaryYears,
          frontEvents: mockFrontEventsWithDiedOfDisease,
          endOfService: { ...mockEndOfService, deathWar: false },
        }}
        death={{
          ...mockDeath,
          date: { year: "1917", dayMonth: "8 August" },
          cause: { cause: "Died of disease", circumstances: "Pneumonia" },
        }}
      />,
    );

    expect(screen.getByText("Pneumonia")).toBeInTheDocument();
  });

  test("should render location and town when known", () => {
    render(
      <TimelineEvents
        militaryYears={{
          ...mockMilitaryYears,
          frontEvents: mockFrontEventsWithKilledInAction,
        }}
        death={makeMockDeath("Baraffles", "Rebreuve-Ranchicourt")}
      />,
    );

    expect(
      screen.getByText("Baraffles, Rebreuve-Ranchicourt"),
    ).toBeInTheDocument();
  });

  test("should render location only when town is null", () => {
    render(
      <TimelineEvents
        militaryYears={{
          ...mockMilitaryYears,
          frontEvents: mockFrontEventsWithKilledInAction,
        }}
        death={makeMockDeath("Baraffles", "")}
      />,
    );

    expect(screen.getByText("Baraffles")).toBeInTheDocument();
    expect(screen.queryByText("Rebreuve-Ranchicourt")).not.toBeInTheDocument();
  });

  test("should not render location and town when unknown", () => {
    render(
      <TimelineEvents
        militaryYears={{
          ...mockMilitaryYears,
          frontEvents: mockFrontEventsWithKilledInAction,
        }}
        death={makeMockDeath("", "")}
      />,
    );

    expect(screen.queryByText("Baraffles")).not.toBeInTheDocument();
    expect(screen.queryByText("Rebreuve-Ranchicourt")).not.toBeInTheDocument();
  });
});
