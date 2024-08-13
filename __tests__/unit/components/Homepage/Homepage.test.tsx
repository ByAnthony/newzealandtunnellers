import { render } from "@testing-library/react";

import { HomePage } from "@/components/HomePage/HomePage";
import * as useWindowDimensionsHook from "@/utils/helpers/useWindowDimensions";
import { mockHistory } from "@/utils/mocks/mockHistory";

jest.mock("@/utils/helpers/useWindowDimensions");

describe("Homepage", () => {
  const mockHomepage = {
    historyChapters: mockHistory,
  };

  const renderWithMockedDimensions = (width: number, height: number) => {
    (useWindowDimensionsHook.useWindowDimensions as jest.Mock).mockReturnValue({
      width,
      height,
    });

    return render(<HomePage homepage={mockHomepage} />);
  };

  test("matches the snapshot for mobile viewport", () => {
    const { asFragment } = renderWithMockedDimensions(500, 800);

    expect(asFragment()).toMatchSnapshot();
  });

  test("matches the snapshot for tablet/desktop viewports", () => {
    const { asFragment } = renderWithMockedDimensions(600, 800);

    expect(asFragment()).toMatchSnapshot();
  });
});
