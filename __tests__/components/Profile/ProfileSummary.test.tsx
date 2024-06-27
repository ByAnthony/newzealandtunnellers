import { render, screen } from "@testing-library/react";
import { ProfileSummary } from "../../../app/components/Profile/ProfileSummary/ProfileSummary";
import {
  mockSummary,
  mockEmbarkationUnit,
  mockEnlistment,
} from "../../mocks/mockTunneller";

const component = (
  <ProfileSummary
    summary={mockSummary}
    embarkationUnit={mockEmbarkationUnit}
    enlistment={mockEnlistment}
    image={null}
  />
);

test("renders the component correctly", () => {
  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();
});

test("renders unit and section correctly", () => {
  render(component);

  expect(screen.getByText("Main Body")).toBeInTheDocument();
  expect(screen.getByText("Section No.2")).toBeInTheDocument();
});

test("renders only unit when section unknown", () => {
  const mockComponent = (
    <ProfileSummary
      summary={mockSummary}
      embarkationUnit={{
        ...mockEmbarkationUnit,
        detachment: "1st Reinforcement",
        section: null,
      }}
      enlistment={mockEnlistment}
      image={null}
    />
  );
  render(mockComponent);

  expect(screen.getByText("1st Reinforcement")).toBeInTheDocument();
  expect(screen.queryByText("Section No.2")).not.toBeInTheDocument();
});

test("renders rank and serial correctly", () => {
  render(component);

  expect(screen.getByText("Sapper")).toBeInTheDocument();
  expect(screen.getByText("1/1000")).toBeInTheDocument();
});

test("renders image when known", () => {
  const mockComponent = (
    <ProfileSummary
      summary={mockSummary}
      embarkationUnit={mockEmbarkationUnit}
      enlistment={mockEnlistment}
      image={{
        url: "1-1000.jpg",
        source: {
          aucklandLibraries: null,
          archives: null,
          family: "Doe",
          newspaper: null,
          book: null,
        },
      }}
    />
  );
  render(mockComponent);

  expect(screen.getByRole("img").getAttribute("alt")).toEqual(
    "Portrait of John Smith",
  );
  expect(screen.getByRole("img").getAttribute("src")).toEqual(
    "/_next/image?url=%2Fimages%2Froll%2Ftunnellers%2F1-1000.jpg&w=640&q=75",
  );
});
