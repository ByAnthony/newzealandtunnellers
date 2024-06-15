import { NextResponse } from "next/server";
import { armyExperienceQuery } from "../../../utils/api/queries/armyExperienceQuery";
import { companyEventsQuery } from "../../../../app/utils/api/queries/companyEventsQuery";
import { imageSourceBookAuthorsQuery } from "../../../../app/utils/api/queries/imageSourceBookAuthorsQuery";
import { londonGazetteQuery } from "../../../../app/utils/api/queries/londonGazetteQuery";
import { medalsQuery } from "../../../utils/api/queries/medalsQuery";
import { mysqlConnection } from "../../../utils/api/mysqlConnection";
import { nzArchivesQuery } from "../../../../app/utils/api/queries/nzArchivesQuery";
import { tunnellerEventsQuery } from "../../../../app/utils/api/queries/tunnellerEventsQuery";
import { tunnellerQuery } from "../../../utils/api/queries/tunnellerQuery";
import { ArmyExperience, Author, Cemetery, DateObj, DeathCause, DeathData, DeathPlace, Event, EventData, EventDetail, ImageArchives, ImageBook, ImageNewspaper, ImageSource, JoinEventData, LondonGazette, LondonGazetteData, Medal, NzArchives, Profile, ProfileData, SingleEventData } from "../../../../app/types/tunneller";

const getYear = (date: string) => {
    return date.slice(0, 4);
}

const getDayMonth = (date: string) => {
    const datetime = new Date(date);
    const day = datetime.getDate();
    const month = datetime.toLocaleString('default', { month: 'long' });

    return `${day} ${month}`;
}

const getDate = (date: string) => {
    const dateObj: DateObj = { year: getYear(date), dayMonth: getDayMonth(date)};
    return dateObj;
}

const getParent = (name: string | null, origin: string | null) => {
    return name ? { name, origin } : null
}

const getNzResident = (month: number | null, enlistment: string | null, posted: string | null) => {
    if (month) {
        const calculateResidentSince = (year: string, month: number) => {
            if (month < 12) {
                return year;
            }
            const residenceInYear = month / 12;
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
    return [];
}

const getTransferred = (date: string | null, unit: string | null) => {
    return date && unit ? { date: getDate(date), unit } : null
}

const getAge = (birthDate: string | null, currentDate: string | null) => {
    if (birthDate && currentDate) {
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
    return null;
}

const getAgeAtEnlistment = (enlistmentDate: string | null, postedDate: string | null, birthDate: string | null) => {
    if (enlistmentDate && birthDate) {
        return getAge(birthDate, enlistmentDate);
    }
    if (postedDate && birthDate) {
        return getAge(birthDate, postedDate);
    }
    return null;
}

const getEventStartDate = (tunnellerEvents: SingleEventData[]) => {
    return tunnellerEvents.reduce((minDate, event) => {
        return event.date < minDate ? event.date : minDate;
    }, tunnellerEvents[0].date);
}

const getEventEndDate = (tunnellerEvents: SingleEventData[]) => { 
    return tunnellerEvents.reduce((maxDate, event) => {
        return event.date > maxDate ? event.date : maxDate;
    }, tunnellerEvents[0].date);
}

const getJoinEvents = (join: JoinEventData | null) => {
    const joinEvents: SingleEventData[] = [];

    if (join && join.enlistmentDate && join.enlistmentDate < join.trainingStart) {
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
    }

    if (join && join.enlistmentDate && join.enlistmentDate >= join.trainingStart) {
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
    }

    return joinEvents;
}

const getWarDeathEvents = (death: any) => {
    const deathEvents: SingleEventData[] = [];

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
}

const getGroupedEventsByDate = (events: Event[]) => {
    return events.reduce((acc: Event[], current: Event) => {
        const existingEntry = acc.find((entry: Event) => entry.date.year === current.date.year && entry.date.dayMonth === current.date.dayMonth);
        
        if (existingEntry) {
            existingEntry.event.push(...current.event);
        } else {
            acc.push({
                date: {
                    year: current.date.year,
                    dayMonth: current.date.dayMonth,
                },
                event: [...current.event],
            });
        }
        
        return acc;
    }, [])
}

const getGroupedEventsByYear = (events: Event[]) => {
    return events.reduce((acc: { [year: string]: Event[] }, current: Event) => {
        const year = current.date.year;
        
        if (!acc[year]) {
            acc[year] = [];
        }
        
        acc[year].push({
            date: current.date,
            event: current.event,
        });
        
        return acc;
    }, {});
}

const getFrontEvents = (
    companyEvents: SingleEventData[],
    tunnellerEvents: SingleEventData[],
    enlistmentEvents: SingleEventData[],
    postedEvents: SingleEventData[],
) => {
    const fullTunnellerEvents: Event[] = tunnellerEvents
        .concat(enlistmentEvents, postedEvents, companyEvents)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((event: SingleEventData) => {
            const dateObj: DateObj = {
                year: getYear(event.date),
                dayMonth: getDayMonth(event.date),
            };

            const eventDetail: EventDetail = {
                description: event.event,
                title: event.title,
                image: event.image,
            };

            return { date: dateObj, event: [eventDetail] }
        });

    const groupEventsByDate = getGroupedEventsByDate(fullTunnellerEvents);

    const groupEventsByYear = getGroupedEventsByYear(groupEventsByDate);

    return groupEventsByYear;
}

const isDeserter = (isDeserter: number | null) => {
    return isDeserter === 1 ? true : false;
}

const isDeathWar = (isDeathWar: string | null) => {
    return isDeathWar === "War" ? true : false;
}

const getTransport = (reference: string | null, vessel: string | null, departureDate: DateObj | null) => {
    return reference && vessel && departureDate ? { reference, vessel, departureDate } : null
}

const getDemobilization = (date: DateObj | null, country: string | null) => {
    return date && country ? { date, country } : null;
}

const getDischargedCountry = (isDischargedUk: number | null) => {
    return isDischargedUk ? "United Kingdom" : "New Zealand";
}

const getMedals = (medals: Medal[]) => {
    return medals.map((medal: Medal) => ({
        name: medal.name,
        country: medal.country,
        image: medal.image,
        citation: medal.citation,
    }));
}

const getDeathPlace = (location: string | null, town: string | null, country: string | null) => {
    return location && town && country ? { location, town, country } : null;
}

const getDeathCause = (cause: string | null, circumstances: string | null) => {
    return cause ? { cause, circumstances } : null;
}

const getCemetery = (name: string | null, location: string | null, country: string | null, grave: string | null) => {
    return name ? { name, location, country, grave } : null;
}

const isWarInjuriesDeathAfterWar = (type: string | null) => {
    return type === "War injuries" ? true : false; 
}

const getDeath = (
    warInjuriesDeathAfterWar: boolean,
    deathType: string | null,
    date: DateObj | null,
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
}

const getNzArchives = (nzArchives: NzArchives[]) => {
    return nzArchives.map((nzArchive: NzArchives) => ({
        reference: nzArchive.reference,
        url: `https://collections.archives.govt.nz/web/arena/search#/item/aims-archive/R${nzArchive.url}`,
    }));
}

const getAwmm = (awmm: string | null) => {
    return awmm ? `https://www.aucklandmuseum.com/war-memorial/online-cenotaph/record/${awmm}` : null;
}

const getNominalRoll = (volume: string | null, roll: string | null, page: string | null) => {
    return volume && roll ?
        {
            title: 'Nominal Rolls of New Zealand Expeditionary Force',
            town: "Wellington",
            publisher: "Government Printer",
            date: "1914-1919",
            page: `p.${page}`,
            volume: `Vol.${volume}`,
            roll: `Roll No.${roll}`,
        } :
        {
            title: 'Nominal Roll of New Zealand Expeditionary Force, 1915. New Zealand Engineers Tunnelling Company',
            town: "Wellington",
            publisher: "Government Printer",
            date: "1916",
            page: `p.${page}`,
        }
}

const getLondonGazette = (londonGazetteList: LondonGazetteData[]) => {
    return londonGazetteList.map((londonGazette: LondonGazetteData) => ({
        page: londonGazette.page,
        date: getDate(londonGazette.date),
    }));
}

const getImageSourceAucklandLibraries = (reference: string | null) => {
    return reference ? `https://digitalnz.org/records?text=${reference}&tab=Images#` : null;
}

const getImageSourceArchives = (location: string | null, reference: string | null) => {
    return location && reference ? { location, reference } : null;
}

const getImageSourceFamily = (name: string | null) => {
    return name ? `Courtesy of ${name} family` : null;
}

const getImageSourceNewspaper = (name: string | null, date: DateObj | null) => {
    return name && date ? { date, name } : null;
}

const getImageSourceBookPage = (poo: string | null) => {
    return poo ? `p.${poo}` : null;
}

const getImageSourceBookAuthors = (authors: Author[]) => {
    return authors.map((author: Author) => ({
        forename: author.forename,
        surname: author.surname,
    }));
}

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
}

const getImageSource = (
    aucklandLibraries: string | null, 
    archives: ImageArchives | null,
    family: string | null,
    newspaper: ImageNewspaper | null,
    book: ImageBook | null,
) => {
    return { aucklandLibraries, archives, family, newspaper, book }
}

const getImage = (url: string | null, source: ImageSource) => {
    return url ? { url, source } : null;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const connection = await mysqlConnection();

    try {
        const profile: ProfileData = await tunnellerQuery(params.id, connection);
        const armyExperience: ArmyExperience[] = await armyExperienceQuery(params.id, connection);
        const companyEvents: SingleEventData[] = await companyEventsQuery(connection);
        const tunnellerEvents: SingleEventData[] = await tunnellerEventsQuery(params.id, connection);
        const medals: Medal[] = await medalsQuery(params.id, connection);
        const nzArchives: NzArchives[] = await nzArchivesQuery(params.id, connection);
        const londonGazette: LondonGazetteData[] = await londonGazetteQuery(params.id, connection);
        const bookAuthors: Author[] = await imageSourceBookAuthorsQuery(params.id, connection);

        const transportUk: SingleEventData | null = profile.transport_uk_start ? {
            date: profile.transport_uk_start,
            event: `${profile.transport_uk_ref} ${profile.transport_uk_vessel}`,
            title: "Transfer to England",
            image: null,
        } : null;
        
        const transportNz: SingleEventData | null = profile.transport_nz_start ? {
            date: profile.transport_nz_start,
            event: `${profile.transport_nz_ref} ${profile.transport_nz_vessel}`,
            title: "Transfer to New Zealand",
            image: null,
        } : null;
    
        const transferred: SingleEventData | null = profile.transferred_to_date && profile.transferred_to_unit ? {
            date: profile.transferred_to_date,
            event: profile.transferred_to_unit,
            title: "Transferred",
            image: null,
        } : null;
            
        const dischargeUk: SingleEventData | null = profile.demobilization_date && profile.discharge_uk === 1 ? {
            date: profile.demobilization_date,
            event: "End of Service in the United Kingdom",
            title: "Demobilization",
            image: null,
        } : null;
                
        const deserter: SingleEventData | null = profile.demobilization_date && profile.has_deserted === 1 ? {
            date: profile.demobilization_date,
            event: "End of Service as deserter",
            title: "Demobilization",
            image: null,
        } : null;
                    
        const demobilization: SingleEventData | null = profile.demobilization_date && (profile.discharge_uk !== 1 || profile.has_deserted !== 1) ? {
            date: profile.demobilization_date,
            event: "Demobilization",
            title: "End of Service",
            image: null,
        } : null;

        const enlistment: JoinEventData = {
            enlistmentDate: profile.enlistment_date,
            trainingStart: profile.training_start,
            trainingLocation: profile.training_location,
            embarkationUnit: profile.embarkation_unit,
        };

        const posted: JoinEventData = {
            enlistmentDate: profile.posted_date,
            trainingStart: profile.training_start,
            trainingLocation: profile.training_location,
            embarkationUnit: profile.embarkation_unit,
        };

        const death: DeathData = {
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

        const additionalTunnellerEvents: SingleEventData[] = [transportUk, transportNz, transferred, dischargeUk, deserter, demobilization]
            .concat(tunnellerEvents, getWarDeathEvents(death))
            .filter((event): event is SingleEventData => { return event !== null});

        const selectedCompanyEvents: SingleEventData[] = companyEvents.filter(event => {
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

        const tunneller: Profile =
            {
                id: profile.id,
                summary: {
                    serial: profile.serial,
                    name: {
                        forename: profile.forename,
                        surname: profile.surname,
                    },
                    birth: profile.birth_date ? getYear(profile.birth_date) : null,
                    death: profile.death_date ? getYear(profile.death_date) : null,
                },
                origins: {
                    birth: {
                        date: profile.birth_date ? getDate(profile.birth_date) : null,
                        country: profile.birth_country,
                    },
                    parents : {
                        mother: getParent(profile.mother_name, profile.mother_origin),
                        father: getParent(profile.father_name, profile.father_origin),
                    },
                    inNzLength: getNzResident(profile.nz_resident_in_month, profile.enlistment_date, profile.posted_date),
                },
                preWarYears: {
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
                        date: profile.enlistment_date ? getDate(profile.enlistment_date) : null,
                        district: profile.district,
                        alias: profile.aka,
                        transferredToTunnellers: getTransferred(profile.posted_date, profile.posted_from_corps),
                        ageAtEnlistment: getAgeAtEnlistment(profile.enlistment_date, profile.posted_date, profile.birth_date),
                    },
                    embarkationUnit: {
                        detachment: profile.embarkation_unit,
                        training: {
                            date: getDate(profile.training_start),
                            location: profile.training_location,
                            locationType: profile.training_location_type,
                        },
                        section: profile.section,
                        attachedCorps: profile.attached_corps,
                        },
                    transportUk: getTransport(profile.transport_uk_ref, profile.transport_uk_vessel, getDate(profile.transport_uk_start)),
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
                        transportNz: getTransport(profile.transport_nz_ref, profile.transport_nz_vessel, profile.transport_nz_start ? getDate(profile.transport_nz_start) : null),
                        demobilization: getDemobilization(profile.demobilization_date ? getDate(profile.demobilization_date) : null, getDischargedCountry(profile.discharge_uk)),
                    },
                    medals: getMedals(medals),
                },
                death: getDeath(
                    isWarInjuriesDeathAfterWar(profile.death_type),
                    profile.death_type,
                    profile.death_date ? getDate(profile.death_date) : null,
                    getDeathPlace(profile.death_location, profile.death_town, profile.death_country),
                    getDeathCause(profile.death_cause, profile.death_circumstances),
                    getCemetery(profile.cemetery, profile.cemetery_town, profile.cemetery_country, profile.grave),
                    getAge(profile.birth_date, profile.death_date),
                ),
                sources: {
                    nzArchives: getNzArchives(nzArchives),
                    awmmCenotaph: getAwmm(profile.awmm_cenotaph),
                    nominalRoll: getNominalRoll(profile.nominal_roll_volume, profile.nominal_roll_number, profile.nominal_roll_page),
                    londonGazette: getLondonGazette(londonGazette),
                },
                image: getImage(
                    profile.image,
                    getImageSource(
                        getImageSourceAucklandLibraries(profile.image_source_auckland_libraries),
                        getImageSourceArchives(profile.archives_name, profile.archives_ref),
                        getImageSourceFamily(profile.family_name),
                        getImageSourceNewspaper(profile.newspaper_name, profile.newspaper_date ? getDate(profile.newspaper_date) : null),
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
    
        return NextResponse.json(tunneller);
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 });
    }
}
