// Database extract
export type TunnellerData = {
  id: number;
  forename: string;
  surname: string;
  birthYear: string | null;
  deathYear: string | null;
};

export type TunnellerWithFullNameData = TunnellerData & {
  fullName: string;
};

// Shaped data
export type Name = {
  forename: string;
  surname: string;
};

export type Tunneller = {
  id: number;
  name: Name;
  birthYear: string | null;
  deathYear: string | null;
  fullName: string;
};
