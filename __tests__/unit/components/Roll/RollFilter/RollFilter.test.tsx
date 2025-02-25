import { render, screen, fireEvent } from "@testing-library/react";

import { RollFilter } from "@/components/Roll/RollFilter/RollFilter";

const defaultProps = {
  className: "test-class",
  uniqueDetachments: ["Main Body", "1st Reinforcements"],
  uniquecorps: ["Tunnelling Corps", "Engineers"],
  uniqueBirthYears: ["1880", "1890", "1900"],
  uniqueDeathYears: ["1915", "1920", "1930"],
  sortedRanks: {
    Officers: ["Major", "Captain"],
    "Non-Commissioned Officers": ["Sergeant", "Corporal"],
    "Other Ranks": ["Private", "Lance Corporal"],
  },
  filters: {
    detachment: [],
    corps: [],
    birthYear: ["1880", "1900"],
    deathYear: ["1915", "1930"],
    ranks: {
      Officers: [],
      "Non-Commissioned Officers": [],
      "Other Ranks": [],
    },
    unknownBirthYear: "",
    unknownDeathYear: "",
  },
  startBirthYear: "1880",
  endBirthYear: "1900",
  startDeathYear: "1915",
  endDeathYear: "1930",
  handleDetachmentFilter: jest.fn(),
  handleCorpsFilter: jest.fn(),
  handleBirthSliderChange: jest.fn(),
  handleDeathSliderChange: jest.fn(),
  handleRankFilter: jest.fn(),
  handleUnknwonBirthYear: jest.fn(),
  handleUnknwonDeathYear: jest.fn(),
};

describe("RollFilter", () => {
  it("renders the detachment filters", () => {
    render(<RollFilter {...defaultProps} />);
    expect(screen.getByText("Detachments")).toBeInTheDocument();
    expect(screen.getByLabelText("Main Body")).toBeInTheDocument();
    expect(screen.getByLabelText("1st Reinforcements")).toBeInTheDocument();
  });

  it("renders the corps filters", () => {
    render(<RollFilter {...defaultProps} />);
    expect(screen.getByText("Corps")).toBeInTheDocument();
    expect(screen.getByLabelText("Tunnelling Corps")).toBeInTheDocument();
    expect(screen.getByLabelText("Engineers")).toBeInTheDocument();
  });

  it("renders the birth year slider", () => {
    render(<RollFilter {...defaultProps} />);
    expect(screen.getByText("Birth Years")).toBeInTheDocument();
    expect(screen.getByText("1880-1900")).toBeInTheDocument();
  });

  it("renders the death year slider", () => {
    render(<RollFilter {...defaultProps} />);
    expect(screen.getByText("Death Years")).toBeInTheDocument();
    expect(screen.getByText("1915-1930")).toBeInTheDocument();
  });

  it("renders the rank filters", () => {
    render(<RollFilter {...defaultProps} />);
    expect(screen.getByText("Ranks")).toBeInTheDocument();
    expect(screen.getByLabelText("Officers")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Non-Commissioned Officers"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Other Ranks")).toBeInTheDocument();
  });

  it("calls handleDetachmentFilter when a detachment checkbox is clicked", () => {
    render(<RollFilter {...defaultProps} />);
    const checkbox = screen.getByLabelText("Main Body");
    fireEvent.click(checkbox);
    expect(defaultProps.handleDetachmentFilter).toHaveBeenCalledWith(
      "Main Body",
    );
  });

  it("calls handleCorpsFilter when a corps checkbox is clicked", () => {
    render(<RollFilter {...defaultProps} />);
    const checkbox = screen.getByLabelText("Tunnelling Corps");
    fireEvent.click(checkbox);
    expect(defaultProps.handleCorpsFilter).toHaveBeenCalledWith(
      "Tunnelling Corps",
    );
  });

  //   it("calls handleBirthSliderChange when the birth year slider is changed", () => {
  //     render(<RollFilter {...defaultProps} />);
  //     const slider = screen.getByRole("slider", { name: "Birth Years" });
  //     fireEvent.change(slider, { target: { value: [1880, 1900] } });
  //     expect(defaultProps.handleBirthSliderChange).toHaveBeenCalledWith([
  //       1880, 1900,
  //     ]);
  //   });

  //   it("calls handleDeathSliderChange when the death year slider is changed", () => {
  //     render(<RollFilter {...defaultProps} />);
  //     const slider = screen.getByRole("slider", { name: "Death Years" });
  //     fireEvent.change(slider, { target: { value: [1915, 1930] } });
  //     expect(defaultProps.handleDeathSliderChange).toHaveBeenCalledWith([
  //       1915, 1930,
  //     ]);
  //   });

  it("calls handleRankFilter when a rank checkbox is clicked", () => {
    render(<RollFilter {...defaultProps} />);
    const checkbox = screen.getByLabelText("Major");
    fireEvent.click(checkbox);
    expect(defaultProps.handleRankFilter).toHaveBeenCalledWith({
      Officers: ["Major"],
    });
  });

  it("calls handleUnknwonBirthYear when the unknown birth year checkbox is clicked", () => {
    render(<RollFilter {...defaultProps} />);
    const checkbox = screen.getByLabelText("Includes unknown birth year");
    fireEvent.click(checkbox);
    expect(defaultProps.handleUnknwonBirthYear).toHaveBeenCalledWith("unknown");
  });

  it("calls handleUnknwonDeathYear when the unknown death year checkbox is clicked", () => {
    render(<RollFilter {...defaultProps} />);
    const checkbox = screen.getByLabelText("Includes unknown death year");
    fireEvent.click(checkbox);
    expect(defaultProps.handleUnknwonDeathYear).toHaveBeenCalledWith("unknown");
  });
});
