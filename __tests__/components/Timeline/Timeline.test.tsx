import { render } from "@testing-library/react";
import { Timeline } from "../../../app/components/Timeline/Timeline";
import { mockTunnellerProfile } from "../../mocks/mockTunneller";

describe("Timeline", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(
      <Timeline tunneller={mockTunnellerProfile} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
