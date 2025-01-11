import { Tunneller } from "@/types/tunnellers";

const mockTunneller1: Tunneller = {
  id: 1,
  name: { forename: "John", surname: "Doe" },
  birthYear: "1886",
  deathYear: "1952",
  search: { fullName: "John Doe" },
};

const mockTunneller2: Tunneller = {
  id: 2,
  name: { forename: "Biff", surname: "Tanen" },
  birthYear: "1897",
  deathYear: null,
  search: { fullName: "Biff Tanen" },
};

const mockTunneller3: Tunneller = {
  id: 3,
  name: { forename: "Emmett", surname: "Brown" },
  birthYear: null,
  deathYear: "1935",
  search: { fullName: "Emmett Brown" },
};

const mockTunneller4: Tunneller = {
  id: 4,
  name: { forename: "Marty", surname: "McFly" },
  birthYear: null,
  deathYear: null,
  search: { fullName: "Marty McFly" },
};

export const mockTunnellersData: Tunneller[] = [
  mockTunneller3,
  mockTunneller1,
  mockTunneller4,
  mockTunneller2,
];

export const mockTunnellers: Record<string, Tunneller[]> = {
  B: [mockTunneller3],
  D: [mockTunneller1],
  M: [mockTunneller4],
  T: [mockTunneller2],
};
