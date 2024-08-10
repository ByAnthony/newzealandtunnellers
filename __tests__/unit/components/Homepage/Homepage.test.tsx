import { render } from "@testing-library/react";

import { HomePage } from "@/components/HomePage/HomePage";
import { mockHistory } from "@/utils/mocks/mockHistory";

describe("Homepage", () => {
  const mockHomepage = {
    historyChapters: mockHistory,
  };

  test("matches the snapshot", () => {
    const { asFragment } = render(<HomePage homepage={mockHomepage} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
