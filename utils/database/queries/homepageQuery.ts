export const historyChaptersQuery = async (connection: any) => {
  const query = `SELECT
    article.string_id AS id
    , article.id AS chapter
    , article.title AS title

    FROM article`;

  const [results] = await connection.execute(query);
  return results;
};

export const historyImageChaptersQuery = async (connection: any) => {
  const query = `SELECT
    article_image.file

    FROM article_image
    JOIN article_image_join ON article_image_join.image_id=article_image.id
    WHERE title IS NULL`;

  const [results] = await connection.execute(query);
  return results;
};
