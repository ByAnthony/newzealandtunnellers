import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import {
  mockArticleImage,
  mockSectionOne,
} from "../../../utils/mocks/mockArticle";

import { Content } from "./Content";

describe("HowToCite for Article", () => {
  const component = (
    <Content imageList={[mockArticleImage]} sectionList={[mockSectionOne]} />
  );

  test("renders the component correctly", () => {
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders paragraph and images correctly", () => {
    render(component);

    expect(screen.getByText(/Section Title/)).toBeInTheDocument();
    expect(screen.getByRole("img").getAttribute("src")).toEqual(
      "/images/history/img-123.png",
    );
    expect(screen.getByRole("img").getAttribute("alt")).toEqual(
      "Accessible alt text",
    );
    expect(screen.getByText(/An Amazing Photo/)).toBeInTheDocument();
    expect(
      screen.getByText(/The French Photographer Doisneau/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Where the photo is preserved/),
    ).toBeInTheDocument();
  });

  test("does not render component when no image list", () => {
    const { container } = render(
      <Content imageList={undefined} sectionList={[mockSectionOne]} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
