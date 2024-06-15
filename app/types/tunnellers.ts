// Database extract
export type TunnellerData = {
    id: string,
    forename: string,
    surname: string,
    birthYear: string | null,
    deathYear: string | null,
}


// Shaped data
export type Tunneller = {
    id: string,
    forename: string,
    surname: string,
    birthYear: string | null,
    deathYear: string | null,
    fullName: string,
}
