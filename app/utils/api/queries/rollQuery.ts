export const rollQuery = async (connection: any) => {
    const query = `SELECT t.id
        , t.surname
        , t.forename
        , DATE_FORMAT(t.birth_date, '%Y') AS birthDate
        , DATE_FORMAT(t.death_date, '%Y') AS deathDate 
        
        FROM tunneller t ORDER BY t.surname, t.forename ASC`;

    const [results]: Array<any> = await connection.query(query);
    return results;
};
