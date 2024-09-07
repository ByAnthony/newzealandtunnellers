export const medalsQuery = async (id: string, connection: any) => {
  const result = await connection.sql`SELECT
    medal.medal_name_en AS name
    , country.country_en AS country
    , medal_citation.medal_citation_en AS citation
    , medal_image AS image

    FROM medal

    JOIN medal_join ON medal_join.medal_m_id=medal.medal_id
    LEFT JOIN medal_citation ON medal_citation.medal_citation_id=medal_c_id
    LEFT JOIN country ON country.country_id=medal_m_c_id

    WHERE medal_join.medal_t_id=${id}`;

  return result.rows;
};
