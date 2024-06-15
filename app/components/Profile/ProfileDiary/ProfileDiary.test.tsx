import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { mockId } from "../../../utils/mocks/mockProfile";
import { mockMilitaryYears } from "../../../utils/mocks/mockMilitaryYears";
import { mockOrigins } from "../../../utils/mocks/mockOrigins";
import { mockPostServiceYears } from "../../../utils/mocks/mockPostServiceYears";
import { mockPreWarYears } from "../../../utils/mocks/mockPreWarYears";

import { ProfileDiary } from "./ProfileDiary";

const component = (
  <ProfileDiary
    tunnellerId={mockId}
    origins={mockOrigins}
    preWarYears={mockPreWarYears}
    militaryYears={mockMilitaryYears}
    postWarYears={mockPostServiceYears}
  />
);

test("renders the component correctly", () => {
  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();
});
