import { Death } from "../../app/types/tunneller";
import { mockDeath } from "./mockTunneller";

export const mockAfterWarDeath: Death = {
  ...mockDeath,
  warInjuriesDeathAfterWar: true,
};
