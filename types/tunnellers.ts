// Database extract
export type TunnellerData = {
  id: number;
  forename: string;
  surname: string;
  birthYear: string | null;
  deathYear: string | null;
  detachment: Detachment;
  rank: Rank;
};

// Shaped data
export type Name = {
  forename: string;
  surname: string;
};

type Search = {
  fullName: string;
};

export type Rank =
  | "Sapper"
  | "Second Corporal"
  | "Sergeant"
  | "Company Quartermaster Sergeant"
  | "Second Lieutenant"
  | "Corporal"
  | "Lance Corporal"
  | "Captain"
  | "Company Sergeant Major"
  | "Lieutenant"
  | "Major"
  | "Sergeant Major"
  | "Quartermaster Sergeant"
  | "Driver"
  | "Motor Mechanic";

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
  rank: Rank;
  search: Search;
};
