export const rollQuery = async (connection: any) => {
  const query = `SELECT t.id
    , t.surname
    , t.forename
    , DATE_FORMAT(t.birth_date, '%Y') AS birthYear
    , DATE_FORMAT(t.death_date, '%Y') AS deathYear
    , embarkation_unit.embarkation_unit_en AS detachment
    , rank.rank_en AS rank
    
    FROM tunneller t

    LEFT JOIN embarkation_unit ON t.embarkation_unit_fk=embarkation_unit.embarkation_unit_id
    LEFT JOIN rank ON t.rank_fk=rank.rank_id
    
    ORDER BY t.surname, t.forename ASC`;

  const [results] = await connection.execute(query);
  return results;
};
