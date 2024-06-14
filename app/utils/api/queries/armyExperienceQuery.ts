export const armyExperienceQuery = async (id: string, connection: any) => {
    const query = `SELECT
        army_experience.army_experience_name AS unit
        , country.country_en AS country
        , country.country_en AS conflict
        , CONVERT(army_experience_join.army_experience_in_month, char) AS duration

        FROM army_experience

        LEFT JOIN army_experience_join ON army_experience_join.army_experience_c_id=army_experience.army_experience_id
        LEFT JOIN country ON country.country_id=army_experience_join.army_experience_c_c_id
        LEFT JOIN conflict ON conflict.conflict_id=army_experience_join.army_experience_w_id

        WHERE army_experience_join.army_experience_t_id=${id}`;

    const [results] = await connection.query(query);
    return results;
};
