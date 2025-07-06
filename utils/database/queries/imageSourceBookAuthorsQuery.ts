import { PoolConnection, RowDataPacket } from "mysql2/promise";

import { Author } from "@/types/tunneller";

export const imageSourceBookAuthorsQuery = async (
  id: string,
  connection: PoolConnection,
) => {
  const query = `SELECT
    book.book_id
    , author.author_forename AS forename
    , author.author_surname AS surname
    FROM author_book_join
    LEFT JOIN author ON author.author_id=author_book_join.author_book_a_id
    LEFT JOIN book ON author_book_join.author_book_b_id=book.book_id
    LEFT JOIN tunneller ON book.book_id=tunneller.image_source_book_fk
    WHERE tunneller.id=${id}`;

  const [results] = await connection.execute<(Author & RowDataPacket)[]>(
    query,
    [id],
  );
  return results;
};
