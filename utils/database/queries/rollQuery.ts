export const rollQuery = async (connection: any) => {
  const result = await connection.sql`SELECT t.id
    , t.surname
    , t.forename
    , TO_CHAR(t.birth_date, 'YYYY') AS "birthYear"
    , TO_CHAR(t.death_date, 'YYYY') AS "deathYear"
    
    FROM tunneller t ORDER BY t.surname, t.forename ASC`;

  return result.rows;
};
