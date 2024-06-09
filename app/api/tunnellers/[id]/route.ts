import { NextResponse } from "next/server";
import { mysqlConnection } from "../../../utils/mysqlConnection";
import { tunnellerQuery } from "./tunnellerQuery";
import { armyExperienceQuery } from "./armyExperienceQuery";

const getYear = (date: string | null) => {
    return date ? date.slice(0, 4) : null;
};

const getDayMonth = (date: string) => {
    const datetime = new Date(date);
    const day = datetime.getDate();
    const month = datetime.toLocaleString('default', { month: 'long' });

    return `${day} ${month}`;
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

const getArmyExperience = (experiences: any) => {
    const convertMonthToYear = (duration: string) => {
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
        const listOfExperience = experiences.map((experience: any) => ({
            unit: experience.unit,
            country: experience.country,
            conflict: experience.conflict,
            duration: convertMonthToYear(experience.duration),
        }));
        return listOfExperience;
    }
    return null;
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const connection = await mysqlConnection();

    try {
        const profile = await tunnellerQuery(params.id, connection);
        const armyExperience = await armyExperienceQuery(params.id, connection);

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
                        date: {
                            year: profile.birth_date.slice(0, 4),
                            day_month: getDayMonth(profile.birth_date),
                        },
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
            };
    
        return NextResponse.json(tunneller)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
