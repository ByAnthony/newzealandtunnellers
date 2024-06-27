import { TunnellerWithFullNameData } from "../../app/types/tunnellers";

const mockTunnellerData1: TunnellerWithFullNameData = {
  id: "1",
  forename: "John",
  surname: "Doe",
  birthYear: "1886",
  deathYear: "1952",
  fullName: "John Doe",
};

const mockTunnellerData2: TunnellerWithFullNameData = {
  id: "2",
  forename: "Biff",
  surname: "Tanen",
  birthYear: "1897",
  deathYear: null,
  fullName: "William Smith",
};

const mockTunnellerData3: TunnellerWithFullNameData = {
  id: "3",
  forename: "Emmett",
  surname: "Brown",
  birthYear: null,
  deathYear: "1935",
  fullName: "Emmett Brown",
};

const mockTunnellerData4: TunnellerWithFullNameData = {
  id: "4",
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
