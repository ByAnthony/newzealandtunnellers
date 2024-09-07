export const companyEventsQuery = async (connection: any) => {
  const result = await connection.sql`SELECT
    TO_CHAR(company_events.company_events_date, 'YYYY-MM-DD') AS date
    , company_events.company_events_event AS event
    , company_events.company_events_title AS title
    , company_events.company_events_img AS image

    FROM company_events

    ORDER BY date ASC`;

  return result.rows;
};
