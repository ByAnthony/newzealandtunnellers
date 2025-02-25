import { render, screen } from "@testing-library/react";

import { Roll } from "@/components/Roll/Roll";
import { AttachedCorpsBadge } from "@/components/Roll/RollDetails/RollDetails";
import { Tunneller } from "@/types/tunnellers";

const tunnellers: Record<string, Tunneller[]> = {
  A: [
    {
      id: 1,
      name: { forename: "John", surname: "Ashford" },
      birthYear: "1880",
      deathYear: "1915",
      detachment: "Main Body",
      rank: "Sapper",
      search: { fullName: "John Ashford" },
      attachedCorps: null,
    },
  ],
  B: [
    {
      id: 2,
      name: { forename: "Richard", surname: "Sloman" },
      birthYear: "1877",
      deathYear: "1956",
      detachment: "Main Body",
      rank: "Sapper",
      search: { fullName: "Richard Sloman" },
      attachedCorps: null,
    },
  ],
};

describe("Roll", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<Roll tunnellers={tunnellers} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the title", () => {
    render(<Roll tunnellers={tunnellers} />);
    expect(screen.getByText(/The New Zealand/)).toBeInTheDocument();
    expect(screen.getByText(/Tunnellers/)).toBeInTheDocument();
  });

  test("renders the total filtered results", () => {
    render(<Roll tunnellers={tunnellers} />);
    expect(screen.getByText(/2 results/)).toBeInTheDocument();
  });

  test("renders the RollAlphabet component when there are filtered results", () => {
    render(<Roll tunnellers={tunnellers} />);
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/Ashford/)).toBeInTheDocument();
    expect(screen.getByText(/Richard/)).toBeInTheDocument();
    expect(screen.getByText(/Sloman/)).toBeInTheDocument();
  });

  test("renders the RollNoResults component when there are no filtered results", () => {
    const emptyTunnellers = {};
    render(<Roll tunnellers={emptyTunnellers} />);
    expect(
      screen.getByText("Sorry, no profile matches your filters"),
    ).toBeInTheDocument();
  });
});

describe("AttachedCorpsBadge", () => {
  test("renders correctly with given props", () => {
    render(<AttachedCorpsBadge attachedCorps="Engineers" />);
    const badgeElement = screen.getByText("Engineers");
    expect(badgeElement).toBeInTheDocument();
  });
});
