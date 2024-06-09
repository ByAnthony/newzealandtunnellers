import { NextResponse } from "next/server";
import { mysqlConnection } from "../../../utils/mysqlConnection";

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

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const connection = await mysqlConnection();

    try {
        const query = `SELECT t.id
        , t.surname
        , t.forename
        , DATE_FORMAT(t.birth_date, '%Y-%m-%d') AS birth_date
        , DATE_FORMAT(t.death_date, '%Y-%m-%d') AS death_date
        , birth_country.country_en AS birth_country
        , t.mother_name
        , mother_origin.country_en AS mother_origin
        , t.father_name
        , father_origin.country_en AS father_origin
        , CONVERT(t.nz_resident_in_month, char) AS nz_resident_in_month
        , DATE_FORMAT(t.enlistment_date, '%Y-%m-%d') AS enlistment_date
        , DATE_FORMAT(t.posted_date, '%Y-%m-%d') AS posted_date
        
        FROM tunneller t 

        LEFT JOIN country birth_country ON t.birth_country_fk=birth_country.country_id
        LEFT JOIN country mother_origin ON t.mother_origin_fk=mother_origin.country_id
        LEFT JOIN country father_origin ON t.father_origin_fk=father_origin.country_id
        
        WHERE t.id=${params.id}`;

        const [results]: Array<any> = await connection.query(query);
        const data = results[0];

        const tunneller =
            {
                id: data.id,
                summary: {
                    name: {
                        forename: data.forename,
                        surname: data.surname,
                    },
                    birthDate: getYear(data.birth_date),
                    deathDate: getYear(data.death_date),
                },
                origin: {
                    birth: {
                        date: {
                            year: data.birth_date.slice(0, 4),
                            day_month: getDayMonth(data.birth_date),
                        },
                        country: data.birth_country,
                    },
                    parents : {
                        mother: getParent(data.mother_name, data.mother_origin),
                        father: getParent(data.father_name, data.father_origin),
                    },
                    inNzLength: getNzResident(data.nz_resident_in_month, data.enlistment_date, data.posted_date),
                }
            };
    
        return NextResponse.json(tunneller)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
