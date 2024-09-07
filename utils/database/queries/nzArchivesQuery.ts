export const nzArchivesQuery = async (id: string, connection: any) => {
  const result = await connection.sql`SELECT
    nz_archives.nz_archives_ref AS reference
    , nz_archives.nz_archives_url AS url

    FROM nz_archives
    LEFT JOIN tunneller ON tunneller.id=nz_archives.nz_archives_t_id
    WHERE tunneller.id=${id}`;

  return result.rows;
};
