import { render, screen } from "@testing-library/react";

import { History } from "@/components/HomePage/History/History";
import { mockHistory } from "@/utils/mocks/mockHistory";

describe("History", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<History articles={mockHistory} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the component correctly", () => {
    render(<History articles={mockHistory} />);

    mockHistory.forEach((article) => {
      const articleCard = screen.getByRole("link", {
        name: new RegExp(
          `Go to Chapter ${article.chapter}: ${article.title.replace(/\\/g, " ")}`,
          "i",
        ),
      });
      expect(articleCard).toBeInTheDocument();

      const articleCardDiv = articleCard.closest("div");
      expect(articleCardDiv).toHaveStyle(
        `backgroundImage: url(../images/history/${article.image})`,
      );

      const titleLine1 = screen.getByText(splitTitle(article.title)[0]);
      const titleLine2 = screen.getByText(splitTitle(article.title)[1]);
      const titleLine3 = screen.getByText(`Chapter ${article.chapter}`);
      expect(titleLine1).toBeInTheDocument();
      expect(titleLine2).toBeInTheDocument();
      expect(titleLine3).toBeInTheDocument();
    });
  });
});

const splitTitle = (string: string) => {
  const split = string.split("\\");
  return split;
};
