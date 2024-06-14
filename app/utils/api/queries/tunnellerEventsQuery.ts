export const tunnellerEventsQuery = async (id: string, connection: any) => {
    const query = `SELECT
        DATE_FORMAT(event_join.event_date, '%Y-%m-%d') AS date
        , event_join.event_en AS event
        , event_join.event_title AS title
        , event_join.event_img AS image

        FROM event_join

        WHERE event_join.event_t_id=${id} ORDER BY date ASC, event_join.event_sequence`;

    const [results] = await connection.query(query);
    return results;
};
