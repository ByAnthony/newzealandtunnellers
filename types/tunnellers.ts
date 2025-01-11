// Database extract
export type TunnellerData = {
  id: number;
  forename: string;
  surname: string;
  birthYear: string | null;
  deathYear: string | null;
  detachment: Detachment;
};

// Shaped data
export type Name = {
  forename: string;
  surname: string;
};

type Search = {
  fullName: string;
};

export type Detachment =
  | "Main Body"
  | "1st Reinforcements"
  | "2nd Reinforcements"
  | "3rd Reinforcements"
  | "4th Reinforcements"
  | "5th Reinforcements"
  | "6th Reinforcements"
  | "7th Reinforcements";

export type Tunneller = {
  id: number;
  name: Name;
  birthYear: string | null;
  deathYear: string | null;
  detachment: Detachment;
  search: Search;
};
