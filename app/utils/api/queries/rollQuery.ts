export const rollQuery = async (connection: any) => {
    const query = `SELECT t.id
        , t.surname
        , t.forename
        , DATE_FORMAT(t.birth_date, '%Y') AS birthYear
        , DATE_FORMAT(t.death_date, '%Y') AS deathYear
        
        FROM tunneller t ORDER BY t.surname, t.forename ASC`;

    const [results] = await connection.query(query);
    return results;
}
