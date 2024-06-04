import { Name } from './roll';

export type TunnellerImage = {
    id: number,
    image: string,
}

export type Date = {
    year: string | null,
    dayMonth: string | null,
}

export type Parent = {
    name: string,
    origin: string | null,
}

export type Parents = {
    mother: Parent | null,
    father: Parent | null,
}

export type Birth = {
    date: Date | null,
    country: string | null,
}

export type Origins = {
    birth: Birth,
    parents: Parents,
    inNzLength: string | null,
}

export type ArmyExperience = {
    unit: string | null,
    country: string | null,
    conflict: string | null,
    duration: string | null,
}

export type Employment = {
    occupation: string | null,
    employer: string | null,
}

export type PreWayYears = {
    armyExperience: ArmyExperience[] | [],
    employment: Employment
    residence: string | null;
    maritalStatus: string | null,
    wife: string | null,
    religion: string | null,
}

export type Transferred = {
    date: Date,
    postedFrom: string,
}

export type Enlistment = {
    serial: string,
    rank: string,
    date: Date,
    district: string | null,
    alias: string | null,
    transferredToTunnellers: Transferred | null,
    ageAtEnlistment: number | null,
}

export type Training = {
    date: Date,
    location: string,
    locationType: string,
}

export type EmbarkationUnit = {
    detachment: string,
    training: Training,
    section: string | null,
    attachedCorps: string | null,
}

export type Transport = {
    reference: string | null,
    vessel: string,
    departureDate: Date,
    departurePort: string | null,
    arrivalDate: Date | null,
    arrivalPort: string | null,
}

export type EventDetail = {
    description: string | null,
    title: string | null,
    image: string | null,
}

export type Event = {
    date: Date,
    event: EventDetail[],
}

export type TransferredTo = {
    date: Date,
    unit: string,
}

export type DeathPlace = {
    location: string,
    town: string,
    country: string,
}

export type DeathCause = {
    type: string,
    circumstances: string,
}

export type Cemetery = {
    name: string,
    location: string,
    country: string,
    graveReference: string,
}

export type Death = {
    date: Date,
    place: DeathPlace | null,
    cause: DeathCause | null,
    cemetery: Cemetery | null,
    ageAtDeath: number | null,
}

export type Demobilization = {
    date: Date,
    country: string | null,
}

export type EndOfService = {
    deserter: boolean,
    transferred: TransferredTo | null,
    deathWar: Death | null,
    transportNz: Transport | null,
    demobilization: Demobilization | null,
}

export type Medal = {
    name: string,
    country: string,
    image: string,
    citation: string | null,
}

export type MilitaryYears = {
    enlistment: Enlistment,
    embarkationUnit: EmbarkationUnit,
    transportUk: Transport,
    frontEvents: Record<string, Event[]>,
    endOfService: EndOfService,
    medals: Medal[] | [],
}

export type PostWarDeath = Death & {
    deathWarInjury: boolean,
}

export type PostServiceYears = {
    death: PostWarDeath,
}

export type NzArchives = {
    ibid?: string,
    reference: string,
    url: string,
}

export type Book = {
    title: string,
    town: string,
    publisher: string,
}

export type NominalRoll = Book & {
    date: string,
    page: string,
    volume: string | null,
    roll: string | null,
}

export type LondonGazette = {
    ibid?: string;
    page: string,
    date: string,
}

export type Sources = {
    nzArchives: NzArchives[],
    awmmCenotaph: string,
    nominalRoll: NominalRoll,
    londonGazette: LondonGazette[] | [],
}

export type ImageArchives = {
    location: string,
    reference: string,
}

export type ImageNewspaper = {
    name: string,
    date: string,
}

export type ImageBookAuthor = {
    forename: string,
    surname: string,
}

export type ImageBook = Book & {
    authors: ImageBookAuthor[],
    year: string,
    page: string | null,
}

export type ImageSource = {
    aucklandLibraries: string | null,
    archives: ImageArchives | null,
    family: string | null,
    newspaper: ImageNewspaper | null,
    book: ImageBook | null,
}

export type Image = {
    url: string,
    source: ImageSource,
}

export type Summary = {
    serial: string,
    name: Name,
    birth: string,
    death: string | null,
}

export type Profile = {
    id: number,
    summary: Summary,
    origins: Origins,
    preWarYears: PreWayYears,
    militaryYears: MilitaryYears,
    postServiceYears: PostServiceYears,
    sources: Sources,
    image: Image | null,
}
