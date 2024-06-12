import { NextResponse } from "next/server";
import { mysqlConnection } from "../../../utils/api/mysqlConnection";
import { tunnellerQuery } from "../../../utils/api/queries/tunnellerQuery";
import { armyExperienceQuery } from "../../../utils/api/queries/armyExperienceQuery";
import { medalsQuery } from "../../../utils/api/queries/medalsQuery";
import { nzArchivesQuery } from "app/utils/api/queries/nzArchivesQuery";
import { londonGazetteQuery } from "app/utils/api/queries/londonGazetteQuery";

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

const getImage = () => {};

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const connection = await mysqlConnection();

    try {
        const profile = await tunnellerQuery(params.id, connection);
        const armyExperience = await armyExperienceQuery(params.id, connection);
        const medals = await medalsQuery(params.id, connection);
        const nzArchives = await nzArchivesQuery(params.id, connection);
        const londonGazette = await londonGazetteQuery(params.id, connection);

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
                        transportUk: getTransport(profile.transport_uk_ref, profile.transport_uk_vessel, profile.transport_uk_start),
                    },
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
                    awwm: `https://www.aucklandmuseum.com/war-memorial/online-cenotaph/record/${profile.awmm_cenotaph}`,
                    nominalRoll: getNominalRoll(profile.nominal_roll_volume, profile.nominal_roll_number, profile.nominal_roll_page),
                    londonGazette: getLondonGazette(londonGazette),
                },
                image: getImage(),
            };
    
        return NextResponse.json(tunneller)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
