import { render, screen } from "@testing-library/react";
import { TimelineEvents } from "../../../../app/components/Timeline/TimelineEvents/TimelineEvents";
import { mockDeath, mockMilitaryYears } from "../../../mocks/mockTunneller";
import { mockFrontEventsWithKilledInAction } from "../../../mocks/mockFrontEvents";

test("should render TimelineEvents", () => {
  const { asFragment } = render(
    <TimelineEvents militaryYears={mockMilitaryYears} death={mockDeath} />,
  );

  expect(asFragment()).toMatchSnapshot();
});

describe("TimelineEvents place()", () => {
  const makeMockDeath = (location: string, town: string) => ({
    ...mockDeath,
    place: {
      country: "France",
      location,
      town,
    },
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
