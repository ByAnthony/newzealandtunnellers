import { render } from "@testing-library/react";
import { Profile } from "../../../app/components/Profile/Profile";
import { mockTunnellerProfile } from "../../mocks/mockTunneller";

describe("Profile", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<Profile tunneller={mockTunnellerProfile} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
