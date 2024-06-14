import { NextResponse } from "next/server";
import { mysqlConnection } from "../../../utils/api/mysqlConnection";
import { tunnellerQuery } from "../../../utils/api/queries/tunnellerQuery";
import { armyExperienceQuery } from "../../../utils/api/queries/armyExperienceQuery";
import { medalsQuery } from "../../../utils/api/queries/medalsQuery";
import { nzArchivesQuery } from "app/utils/api/queries/nzArchivesQuery";
import { londonGazetteQuery } from "app/utils/api/queries/londonGazetteQuery";
import { imageSourceBookAuthorsQuery } from "app/utils/api/queries/imageSourceBookAuthorsQuery";
import { companyEventsQuery } from "app/utils/api/queries/companyEventsQuery";
import { tunnellerEventsQuery } from "app/utils/api/queries/tunnellerEventsQuery";

type ArmyExperience = {
    unit: string | null,
    country: string | null,
    conflict: string | null,
    duration: string | null,
};

type Medal = {
    name: string | null,
    country: string | null,
    image: string | null,
    citation: string | null,
};

type SingleEvent = {
    date: string,
    event: string | null,
    title: string | null,
    image: string | null,
};

type JoinEvent = {
    enlistmentDate: string | null,
    trainingStart: string,
    trainingLocation: string | null,
    embarkationUnit: string | null,
};

type Date = {
    year: string | null,
    dayMonth: string | null,
};

type DeathPlace = {
    location: string | null,
    town: string | null,
    country: string | null,
};

type DeathCause = {
    cause: string | null,
    circumstances: string | null,
};

type Cemetery = {
    name: string | null,
    location: string | null,
    country: string | null,
    grave: string | null,
};

type NzArchive = {
    reference: string | null,
    url: string | null,
};

type LondonGazette = {
    page: string | null,
    date: string | null,
};

type ImageArchives = {
    location: string | null,
    reference: string | null,
};

type ImageNewspaper = {
    name: string | null,
    date: Date | null,
};

type Author = {
    forename: string | null,
    surname: string | null,
};

type ImageBook = {
    authors: Author[] | null,
    title: string | null,
    town: string | null,
    publisher: string | null,
    year: string | null,
    page: string | null,
}

type ImageSource = {
    aucklandLibraries: string | null,
    archives: ImageArchives | null,
    family: string | null,
    newspaper: ImageNewspaper | null,
    book: ImageBook | null,
};


const getYear = (date: string | null) => {
    return date ? date.slice(0, 4) : null;
};

const getDayMonth = (date: string) => {
    const datetime = new Date(date);
    const day = datetime.getDate();
    const month = datetime.toLocaleString('default', { month: 'long' });

    return date ? `${day} ${month}` : null;
};

const getDate = (date: string | null) => {
    return date ? 
        { year: getYear(date), dayMonth: getDayMonth(date)} :
        null
};

const getParent = (name: string, origin: string) => {
    return name ? { name, origin } : null
};

const getNzResident = (month: string | null, enlistment: string | null, posted: string | null) => {
    if (month) {
        const calculateResidentSince = (year: string, month: string| null) => {
            if (Number(month) < 12) {
                return year;
            }
            const residenceInYear = Number(month) / 12;
            const residentSince = Number(year) - residenceInYear;
            return residentSince.toString();
        };
    
        if (enlistment) {
            const enlistmentYear = enlistment.slice(0, 4);
            return calculateResidentSince(enlistmentYear, month);
        }
    
        if (posted) {
            const postedYear = posted.slice(0, 4);
            return calculateResidentSince(postedYear, month);
        }
    }
    return null;
}

const getArmyExperience = (experiences: ArmyExperience[]) => {
    const convertMonthToYear = (duration: string | null) => {
        if (duration) {
            const durationAsNumber = Number(duration);
            if (durationAsNumber < 24) {
                return durationAsNumber === 1 ? `${duration} month` : `${duration} months`;
            }
            const year = durationAsNumber / 12;
            return year === 1 ? `${year} year` : `${year} years`;
        }
        return null;
    };

    if (experiences) {
        return experiences.map((experience: ArmyExperience) => ({
            unit: experience.unit,
            country: experience.country,
            conflict: experience.conflict,
            duration: convertMonthToYear(experience.duration),
        }));
    }
    return null;
};

const getTransferred = (date: string | null, postedFrom: string | null) => {
    return date && postedFrom ? { date: getDate(date), postedFrom } : null
};

const getAge = (birthDate: string, currentDate: string) => {
    const birth = new Date(birthDate);
    const current = new Date(currentDate);
    let age = current.getFullYear() - birth.getFullYear();
    const monthDiff = current.getMonth() - birth.getMonth();
    const dayDiff = current.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}

const getAgeAtEnlistment = (enlistmentDate: string | null, postedDate: string | null, birthDate: string | null) => {
    if (enlistmentDate && birthDate) {
        return getAge(birthDate, enlistmentDate);
    }
    if (postedDate && birthDate) {
        return getAge(birthDate, postedDate);
    }
    return null;
};

const getEventStartDate = (tunnellerEvents: SingleEvent[]) => {
    return tunnellerEvents.reduce((minDate, event) => {
        return event.date < minDate ? event.date : minDate;
    }, tunnellerEvents[0].date);
};

const getEventEndDate = (tunnellerEvents: SingleEvent[]) => { 
    return tunnellerEvents.reduce((maxDate, event) => {
        return event.date > maxDate ? event.date : maxDate;
    }, tunnellerEvents[0].date);
};

const getJoinEvents = (join: JoinEvent) => {
    const joinEvents: SingleEvent[] = [];

    if (join.enlistmentDate && join.enlistmentDate < join.trainingStart) {
        joinEvents.push(
            {
                date: join.enlistmentDate,
                event: join.embarkationUnit,
                title: "Enlisted",
                image: null,
            },
            {
                date: join.trainingStart,
                event: join.trainingLocation,
                title: "Trained",
                image: null,
            }
        );
    };
    if (join.enlistmentDate && join.enlistmentDate >= join.trainingStart) {
        joinEvents.push(
            {
                date: join.enlistmentDate,
                event: join.embarkationUnit,
                title: "Enlisted",
                image: null,
            },
            {
                date: join.enlistmentDate,
                event: join.trainingLocation,
                title: "Trained",
                image: null,
            }
        );
    };

    return joinEvents;
};

const getWarDeathEvents = (death: any) => {
    const deathEvents: SingleEvent[] = [];

    if (death.deathType === "War") {
        if (death.deathCause === "Killed in action" || "Died of wounds") {
            deathEvents.push({
                date: death.deathDate,
                event: death.deathCircumstances,
                title: death.deathCause,
                image: null,
            });
        };

        if (death.deathCause === "Died of disease") {
            deathEvents.push({
                date: death.deathDate,
                event: `${death.deathLocation}, ${death.deathTown}`,
                title: death.deathCause,
                image: null,
            });
        };

        if (death.deathCause === "Died of accident") {
            deathEvents.push({
                date: death.deathDate,
                event: death.deathLocation,
                title: death.deathCause,
                image: null,
            });
        };

        deathEvents.push(
            {
                date: death.deathDate,
                event: `${death.cemetery}, ${death.cemteryTown}`,
                title: "Buried",
                image: null,
            },
            {
                date: death.deathDate,
                event: death.grave,
                title: "Grave reference",
                image: null,
            }
        );
    };

    if (death.deathType === "War injuries") {
        if (death.deathCause === "Died of disease") {
            deathEvents.push({
                date: death.deathDate,
                event: death.deathCircumstances,
                title: death.deathCause,
                image: null,
            });
        }
    };

    return deathEvents;
};

const getGroupedEventsByDate = (events: any) => {
    return events.reduce((acc: any, current: any) => {
        let existingEntry = acc.find((entry: any) => entry.date.year === current.date.year && entry.date.dayMonth === current.date.dayMonth);
        
        if (existingEntry) {
            existingEntry.event.push({
                event: current.event,
                title: current.title,
                image: current.image
            });
        } else {
            acc.push({
                date: {
                    year: current.date.year,
                    dayMonth: current.date.dayMonth,
                },
                event: [{
                    event: current.event,
                    title: current.title,
                    image: current.image
                }],
            });
        }
        
        return acc;
    }, [])
};

const getGroupedEventsByYear = (events: any) => {
    return events.reduce((acc: any, current: any) => {
        let year = current.date.year;
        
        if (!acc[year]) {
            acc[year] = [];
        }
        
        acc[year].push({
            date: {
                year: current.date.year,
                dayMonth: current.date.dayMonth,
            },
            event: current.event,
            title: current.title,
            image: current.image
        });
        
        return acc;
    }, {});
};

const getFrontEvents = (
    companyEvents: SingleEvent[],
    tunnellerEvents: SingleEvent[],
    enlistmentEvents: SingleEvent[],
    postedEvents: SingleEvent[],
) => {
    const fullTunnellerEvents = tunnellerEvents
        .concat(enlistmentEvents, postedEvents, companyEvents)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((event: any) => ({
            ...event,
            date: {
                year: getYear(event.date),
                dayMonth: getDayMonth(event.date),
            }
        }));

    const groupEventsByDate = getGroupedEventsByDate(fullTunnellerEvents);

    const groupEventsByYear = getGroupedEventsByYear(groupEventsByDate);

    return groupEventsByYear;
};

const isDeserter = (isDeserter: number | null) => {
    return isDeserter === 1 ? true : false;
};

const isDeathWar = (isDeathWar: string | null) => {
    return isDeathWar === "War" ? true : false;
};

const getTransport = (reference: string | null, vessel: string | null, departureDate: string | null) => {
    return reference && vessel && departureDate ? { reference, vessel, departureDate } : null
};

const getDemobilization = (date: string | null, country: string | null) => {
    return date && country ? { date, country } : null;
};

const getDischargedCountry = (isDischargedUk: number | null) => {
    return isDischargedUk ? "United Kingdom" : "New Zealand";
};

const getMedals = (medals: Medal[]) => {
    return medals.map((medal: Medal) => ({
        name: medal.name,
        country: medal.country,
        image: medal.image,
        citation: medal.citation,
    }));
};

const getDeathPlace = (location: string | null, town: string | null, country: string | null) => {
    return location && town && country ? { location, town, country } : null;
};

const getDeathCause = (cause: string | null, circumstances: string | null) => {
    return cause ? { cause, circumstances } : null;
};

const getCemetery = (name: string | null, location: string | null, country: string | null, grave: string | null) => {
    return name ? { name, location, country, grave } : null;
};

const isWarInjuriesDeathAfterWar = (type: string | null) => {
    return type === "War injuries" ? true : false; 
};

const getDeath = (
    warInjuriesDeathAfterWar: boolean,
    deathType: string | null,
    date: Date | null,
    place: DeathPlace | null,
    cause: DeathCause | null,
    cemetery: Cemetery | null,
    ageAtDeath: number | null,
) => {
    const validDeathTypes = ["War", "War injuries", "After war"];
    if ((deathType && validDeathTypes.includes(deathType)) || (!deathType && date)) {
        return {
            warInjuriesDeathAfterWar,
            date,
            place,
            cause,
            cemetery,
            ageAtDeath,
        };
    }
    return null;
};

const getNzArchives = (nzArchives: NzArchive[]) => {
    return nzArchives.map((nzArchive: NzArchive) => ({
        reference: nzArchive.reference,
        url: `https://collections.archives.govt.nz/web/arena/search#/item/aims-archive/R${nzArchive.url}`,
    }));
};

const getAwmm = (awmm: string | null) => {
    return awmm ? `https://www.aucklandmuseum.com/war-memorial/online-cenotaph/record/${awmm}` : null;
};

const getNominalRoll = (volume: string | null, number: string | null, page: string | null) => {
    return volume && number ?
        {
            title: 'Nominal Rolls of New Zealand Expeditionary Force',
            town: "Wellington",
            publisher: "Government Printer",
            date: "1914-1919",
            page: `p.${page}`,
            volume: `Vol.${volume}`,
            number: `Roll No.${number}`,
        } :
        {
            title: 'Nominal Roll of New Zealand Expeditionary Force, 1915. New Zealand Engineers Tunnelling Company',
            town: "Wellington",
            publisher: "Government Printer",
            date: "1916",
            page: `p.${page}`,
        }

};

const getLondonGazette = (londonGazetteList: LondonGazette[]) => {
    return londonGazetteList.map((londonGazette: LondonGazette) => ({
        page: londonGazette.page,
        date: getDate(londonGazette.date),
    }));
};

const getImageSourceAucklandLibraries = (reference: string | null) => {
    return reference ? `https://digitalnz.org/records?text=${reference}&tab=Images#` : null;
};

const getImageSourceArchives = (location: string | null, reference: string | null) => {
    return location && reference ? { location, reference } : null;
};

const getImageSourceFamily = (name: string | null) => {
    return name ? `Courtesy of ${name} family` : null;
};

const getImageSourceNewspaper = (name: string | null, date: Date | null) => {
    return name && date ? { date, name } : null;
};

const getImageSourceBookPage = (poo: string | null) => {
    return poo ? `p.${poo}` : null;
};

const getImageSourceBookAuthors = (authors: Author[]) => {
    return authors.map((author: Author) => ({
        forename: author.forename,
        surname: author.surname,
    }));
};

const getImageSourceBook = (
    authors: Author[] | null,
    title: string | null,
    town: string | null,
    publisher: string | null,
    year: string | null,
    page: string | null,
) => {
    if (title && town && publisher && year) {
        return {
            authors,
            title,
            town,
            publisher,
            year,
            page
        }
    }
    return null;
};

const getImageSource = (
    aucklandLibraries: string | null, 
    archives: ImageArchives | null,
    family: string | null,
    newspaper: ImageNewspaper | null,
    book: ImageBook | null,
) => {
    return { aucklandLibraries, archives, family, newspaper, book }
};

const getImage = (url: string | null, source: ImageSource | null) => {
    return url ? { url, source } : null;
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const connection = await mysqlConnection();

    try {
        const profile: any = await tunnellerQuery(params.id, connection);
        const armyExperience = await armyExperienceQuery(params.id, connection);
        const companyEvents: SingleEvent[] = await companyEventsQuery(connection);
        const tunnellerEvents: SingleEvent[] = await tunnellerEventsQuery(params.id, connection);
        const medals = await medalsQuery(params.id, connection);
        const nzArchives = await nzArchivesQuery(params.id, connection);
        const londonGazette = await londonGazetteQuery(params.id, connection);
        const bookAuthors = await imageSourceBookAuthorsQuery(params.id, connection);

        const transportUk: SingleEvent = {
            date: profile.transport_uk_start,
            event: `${profile.transport_uk_ref} ${profile.transport_uk_vessel}`,
            title: "Transfer to England",
            image: null,
        };
        
        const transportNz: SingleEvent = {
            date: profile.transport_nz_start,
            event: `${profile.transport_nz_ref} ${profile.transport_nz_vessel}`,
            title: "Transfer to New Zealand",
            image: null,
        };
    
        const transferred: SingleEvent = {
            date: profile.transferred_to_date,
            event: profile.transferred_to_unit,
            title: "Transferred",
            image: null,
        };
            
        const dischargeUk: SingleEvent | null = profile.discharge_uk === 1 ? {
            date: profile.demobilization_date,
            event: "End of Service in the United Kingdom",
            title: "Demobilization",
            image: null,
        } : null;
                
        const deserter: SingleEvent | null = profile.isDeserter === 1 ? {
            date: profile.demobilization_date,
            event: "End of Service as deserter",
            title: "Demobilization",
            image: null,
        } : null;
                    
        const demobilization: SingleEvent | null = profile.discharge_uk !== 1 || profile.isDeserter !== 1 ? {
            date: profile.demobilization_date,
            event: "Demobilization",
            title: "End of Service",
            image: null,
        } : null;

        const enlistment: JoinEvent = {
            enlistmentDate: profile.enlistment_date,
            trainingStart: profile.training_start,
            trainingLocation: profile.training_location,
            embarkationUnit: profile.embarkation_unit,
        };

        const posted: JoinEvent = {
            enlistmentDate: profile.posted_date,
            trainingStart: profile.training_start,
            trainingLocation: profile.training_location,
            embarkationUnit: profile.embarkation_unit,
        };

        const death = {
            deathType: profile.death_type,
            deathDate: profile.death_date,
            deathLocation: profile.death_location,
            deathTown: profile.death_town,
            deathCountry: profile.death_country,
            deathCause: profile.death_cause,
            deathCircumstances: profile.death_circumstances,
            cemetery: profile.cemetery,
            cemteryTown: profile.cemetery_town,
            cemeteryCountry: profile.cemetery_country,
            grave: profile.grave,
        }

        const additionalTunnellerEvents: SingleEvent[] = [transportUk, transportNz, transferred, dischargeUk, deserter, demobilization]
            .concat(tunnellerEvents, getWarDeathEvents(death))
            .filter((event): event is SingleEvent => { return event !== null && event.date !== null});

        const selectedCompanyEvents: SingleEvent[] = companyEvents.filter(event => {
            if (
                event.event !== "Marched in to the Company Training Camp, Falmouth" &&
                getEventStartDate(additionalTunnellerEvents) <= event.date &&
                event.date <= getEventEndDate(additionalTunnellerEvents)
            ) {
                return true;
            }
        
            if (
                event.event === "Marched in to the Company Training Camp, Falmouth" &&
                (profile.embarkation_unit === "Main Body" || profile.embarkation_unit === "1st Reinforcements")
            ) {
                return true;
            }
        
            return false;
        });

        const tunneller =
            {
                id: profile.id,
                summary: {
                    name: {
                        forename: profile.forename,
                        surname: profile.surname,
                    },
                    birthDate: getYear(profile.birth_date),
                    deathDate: getYear(profile.death_date),
                },
                origin: {
                    birth: {
                        date: getDate(profile.birth_date),
                        country: profile.birth_country,
                    },
                    parents : {
                        mother: getParent(profile.mother_name, profile.mother_origin),
                        father: getParent(profile.father_name, profile.father_origin),
                    },
                    inNzLength: getNzResident(profile.nz_resident_in_month, profile.enlistment_date, profile.posted_date),
                },
                preWar: {
                    armyExperience: getArmyExperience(armyExperience),
                    employment: {
                        occupation: profile.occupation,
                        employer: profile.employer,
                    },
                    residence: profile.residence,
                    maritalStatus: profile.marital_status,
                    wife: profile.wife_name,
                },
                militaryYears: {
                    enlistment: {
                        serial: profile.serial,
                        rank: profile.rank,
                        date: getDate(profile.enlistment_date),
                        district: profile.district,
                        alias: profile.aka,
                        transferredToTunnellers: getTransferred(profile.posted_date, profile.posted_from_corps),
                        ageAtEnlistment: getAgeAtEnlistment(profile.enlistment_date, profile.posted_date, profile.birth_date),
                    },
                    embarkationUnit: {
                        detachement: profile.embarkation_unit,
                        training: {
                            date: getDate(profile.training_start),
                            location: profile.training_location,
                            locationType: profile.training_location_type,
                        },
                        section: profile.section,
                        attachedCorps: profile.attached_corps,
                        },
                    transportUk: getTransport(profile.transport_uk_ref, profile.transport_uk_vessel, profile.transport_uk_start),
                    frontEvents: getFrontEvents(
                        selectedCompanyEvents, 
                        additionalTunnellerEvents,
                        getJoinEvents(enlistment),
                        getJoinEvents(posted),
                    ),
                    endOfService: {
                        deserter: isDeserter(profile.has_deserted),
                        transferred: getTransferred(profile.transferred_to_date, profile.transferred_to_unit),
                        deathWar: isDeathWar(profile.death_type),
                        transportNz: getTransport(profile.transport_nz_ref, profile.transport_nz_vessel, profile.transport_nz_start),
                        demobilization: getDemobilization(profile.demobilization_date, getDischargedCountry(profile.discharge_uk)),
                    },
                    medals: getMedals(medals),
                },
                death: getDeath(
                    isWarInjuriesDeathAfterWar(profile.death_type),
                    profile.death_type,
                    getDate(profile.death_date),
                    getDeathPlace(profile.death_location, profile.death_town, profile.death_country),
                    getDeathCause(profile.death_cause, profile.death_circumstances),
                    getCemetery(profile.cemetery, profile.cemetery_town, profile.cemetery_country, profile.grave),
                    getAge(profile.birth_date, profile.death_date),
                ),
                sources: {
                    nzArchives: getNzArchives(nzArchives),
                    awwm: getAwmm(profile.awmm_cenotaph),
                    nominalRoll: getNominalRoll(profile.nominal_roll_volume, profile.nominal_roll_number, profile.nominal_roll_page),
                    londonGazette: getLondonGazette(londonGazette),
                },
                image: getImage(
                    profile.image,
                    getImageSource(
                        getImageSourceAucklandLibraries(profile.image_source_auckland_libraries),
                        getImageSourceArchives(profile.archives_name, profile.archives_ref),
                        getImageSourceFamily(profile.family_name),
                        getImageSourceNewspaper(profile.newspaper_name, getDate(profile.newspaper_date)),
                        getImageSourceBook(
                            getImageSourceBookAuthors(bookAuthors),
                            profile.book_title,
                            profile.book_town,
                            profile.book_publisher,
                            profile.book_year,
                            getImageSourceBookPage(profile.book_page),
                        ),
                    ),
                ),
            };
    
        return NextResponse.json(tunneller)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
