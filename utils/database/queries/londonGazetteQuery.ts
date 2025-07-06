import { PoolConnection, RowDataPacket } from "mysql2/promise";

import { LondonGazette } from "@/types/tunneller";

export const londonGazetteQuery = async (
  id: string,
  connection: PoolConnection,
) => {
  const query = `SELECT
    london_gazette.london_gazette_page AS page
    , DATE_FORMAT(london_gazette.london_gazette_date, '%Y-%m-%d') AS date
    FROM london_gazette
    JOIN london_gazette_join ON london_gazette_join.london_gazette_lg_id=london_gazette.london_gazette_id
    WHERE london_gazette_join.london_gazette_t_id=${id}`;

  const [results] = await connection.execute<(LondonGazette & RowDataPacket)[]>(
    query,
    [id],
  );
  return results;
};
