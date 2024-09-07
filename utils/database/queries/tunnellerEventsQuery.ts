export const tunnellerEventsQuery = async (id: string, connection: any) => {
  const result = await connection.sql`SELECT
    TO_CHAR(event_join.event_date, 'YYYY-MM-DD') AS date
    , event_join.event_en AS event
    , event_join.event_title AS title
    , event_join.event_img AS image

    FROM event_join

    WHERE event_join.event_t_id=${id} ORDER BY date ASC, event_join.event_sequence`;

  return result.rows;
};
