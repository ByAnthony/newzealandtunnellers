export const tunnellerQuery = async (id: string, connection: any) => {
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
    , occupation.occupation_en AS occupation
    , employer.last_employer_name AS employer
    , residence.town_name AS residence
    , marital_status.marital_status_en AS marital_status
    , t.wife_name
    
    FROM tunneller t 

    LEFT JOIN country birth_country ON t.birth_country_fk=birth_country.country_id
    LEFT JOIN country mother_origin ON t.mother_origin_fk=mother_origin.country_id
    LEFT JOIN country father_origin ON t.father_origin_fk=father_origin.country_id
    LEFT JOIN occupation ON t.occupation_fk=occupation.occupation_id
    LEFT JOIN last_employer employer ON t.last_employer_fk=employer.last_employer_id
    LEFT JOIN town residence ON t.town_fk=residence.town_id
    LEFT JOIN marital_status ON t.marital_status_fk=marital_status.marital_status_id
    
    WHERE t.id=${id}`;

    const [results]: Array<any> = await connection.query(query);
    return results[0];
};
