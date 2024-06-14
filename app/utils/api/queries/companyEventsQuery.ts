export const companyEventsQuery = async (connection: any) => {
    const query = `SELECT
        DATE_FORMAT(company_events.company_events_date, '%Y-%m-%d') AS date
        , company_events.company_events_event AS event
        , company_events.company_events_title AS title
        , company_events.company_events_img AS image

        FROM company_events

        ORDER BY date ASC`;

    const [results] = await connection.query(query);
    return results;
};
