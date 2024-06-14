export type ProfileData = {
    id: number,
    surname: string,
    forename: string,
    birth_date: string | null,
    death_date: string | null,
    birth_country: string | null,
    mother_name: string | null,
    mother_origin: string | null,
    father_name: string | null,
    father_origin: string | null,
    nz_resident_in_month: string | null,
    enlistment_date: string | null,
    posted_date: string | null,
    occupation: string | null,
    employer: string | null,
    residence: string | null,
    marital_status: string | null,
    wife_name: string | null,
    serial: string | null,
    rank: string | null,
    district: string | null,
    aka: string | null,
    posted_from_corps: string | null,
    embarkation_unit: string | null,
    training_start: string | null,
    training_location: string | null,
    training_location_type: string | null,
    section: string | null,
    attached_corps: string | null,
    transport_uk_ref: string | null,
    transport_uk_vessel: string | null,
    transport_uk_start: string | null,
    has_deserted: number | null,
    transferred_to_date: string | null,
    transferred_to_unit: string | null,
    death_type: string | null,
    transport_nz_ref: string | null,
    transport_nz_vessel: string | null,
    transport_nz_start: string | null,
    demobilization_date: string | null,
    discharge_uk: number | null,
    death_location: string | null,
    death_town: string | null,
    death_country: string | null,
    death_cause: string | null,
    death_circumstances: string | null,
    cemetery: string | null,
    cemetery_town: string | null,
    cemetery_country: string | null,
    grave: string | null,
    awmm_cenotaph: string | null,
    nominal_roll_volume: string | null,
    nominal_roll_number: string | null,
    nominal_roll_page: string | null,
    image: string | null,
    image_source_auckland_libraries: string | null,
    archives_name: string | null,
    archives_ref: string | null,
    family_name: string | null,
    newspaper_name: string | null,
    newspaper_date: string | null,
    book_title: string | null,
    book_town: string | null,
    book_publisher: string | null,
    book_year: string | null,
    book_page: string | null,
}

export type ArmyExperience = {
    unit: string | null,
    country: string | null,
    conflict: string | null,
    duration: string | null,
}

export type Medal = {
    name: string | null,
    country: string | null,
    image: string | null,
    citation: string | null,
}

export type SingleEvent = {
    date: string,
    event: string | null,
    title: string | null,
    image: string | null,
}

export type JoinEvent = {
    enlistmentDate: string | null,
    trainingStart: string,
    trainingLocation: string | null,
    embarkationUnit: string | null,
}

export type DateObj = {
    year: string | null,
    dayMonth: string | null,
}

export type DeathPlace = {
    location: string | null,
    town: string | null,
    country: string | null,
}

export type DeathCause = {
    cause: string | null,
    circumstances: string | null,
}

export type Cemetery = {
    name: string | null,
    location: string | null,
    country: string | null,
    grave: string | null,
}

export type NzArchive = {
    reference: string | null,
    url: string | null,
}

export type LondonGazette = {
    page: string | null,
    date: string | null,
}

export type ImageArchives = {
    location: string | null,
    reference: string | null,
}

export type ImageNewspaper = {
    name: string | null,
    date: DateObj | null,
}

export type Author = {
    forename: string | null,
    surname: string | null,
}

export type ImageBook = {
    authors: Author[] | null,
    title: string | null,
    town: string | null,
    publisher: string | null,
    year: string | null,
    page: string | null,
}

export type ImageSource = {
    aucklandLibraries: string | null,
    archives: ImageArchives | null,
    family: string | null,
    newspaper: ImageNewspaper | null,
    book: ImageBook | null,
}
