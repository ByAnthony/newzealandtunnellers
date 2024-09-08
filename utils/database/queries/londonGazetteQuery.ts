export const londonGazetteQuery = async (id: string, connection: any) => {
  const result = await connection.sql`SELECT
    london_gazette.london_gazette_page AS page
    , TO_CHAR(london_gazette.london_gazette_date, 'YYYY-MM-DD') AS date

    FROM london_gazette
    JOIN london_gazette_join ON london_gazette_join.london_gazette_lg_id=london_gazette.london_gazette_id

    WHERE london_gazette_join.london_gazette_t_id=${id}`;

  return result.rows;
};
