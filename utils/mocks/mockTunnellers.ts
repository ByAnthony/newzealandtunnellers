import { Tunneller, TunnellerWithFullNameData } from "@/types/tunnellers";

const mockTunnellerData1: TunnellerWithFullNameData = {
  id: 1,
  forename: "John",
  surname: "Doe",
  birthYear: "1886",
  deathYear: "1952",
  fullName: "John Doe",
};

const mockTunnellerData2: TunnellerWithFullNameData = {
  id: 2,
  forename: "Biff",
  surname: "Tanen",
  birthYear: "1897",
  deathYear: null,
  fullName: "William Smith",
};

const mockTunnellerData3: TunnellerWithFullNameData = {
  id: 3,
  forename: "Emmett",
  surname: "Brown",
  birthYear: null,
  deathYear: "1935",
  fullName: "Emmett Brown",
};

const mockTunnellerData4: TunnellerWithFullNameData = {
  id: 4,
  forename: "Marty",
  surname: "McFly",
  birthYear: null,
  deathYear: null,
  fullName: "Marty McFly",
};

export const mockTunnellersData: TunnellerWithFullNameData[] = [
  mockTunnellerData1,
  mockTunnellerData2,
  mockTunnellerData3,
  mockTunnellerData4,
];

const mockTunneller1: Tunneller = {
  id: 1,
  name: { forename: "John", surname: "Doe" },
  birthYear: "1886",
  deathYear: "1952",
  fullName: "John Doe",
};

const mockTunneller2: Tunneller = {
  id: 2,
  name: { forename: "Biff", surname: "Tanen" },
  birthYear: "1897",
  deathYear: null,
  fullName: "William Smith",
};

const mockTunneller3: Tunneller = {
  id: 3,
  name: { forename: "Emmett", surname: "Brown" },
  birthYear: null,
  deathYear: "1935",
  fullName: "Emmett Brown",
};

const mockTunneller4: Tunneller = {
  id: 4,
  name: { forename: "Marty", surname: "McFly" },
  birthYear: null,
  deathYear: null,
  fullName: "Marty McFly",
};

export const mockTunnellers: Record<string, Tunneller[]> = {
  B: [mockTunneller3],
  D: [mockTunneller1],
  M: [mockTunneller4],
  S: [mockTunneller2],
};
