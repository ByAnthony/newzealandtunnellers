export type Name = {
    surname: string,
    forename: string,
  }
  
export type Tunneller = {
    id: number,
    name: Name,
    birthDate: string | null,
    deathDate: string | null,
  }

  export type TunnellerData = {
    id: number,
    forename: string,
    surname: string,
    birthDate: string | null,
    deathDate: string | null,
    fullName: string,
  }
