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
