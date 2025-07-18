import { PoolConnection, RowDataPacket } from "mysql2/promise";

import {
  ArticleData,
  ArticleReferenceData,
  ImageData,
  SectionData,
} from "@/types/article";

export const chapterQuery = async (id: string, connection: PoolConnection) => {
  const query = `SELECT
    article.string_id AS id
    , article.id AS chapter
    , article.title AS title
    , article.notes AS notes
    FROM article
    WHERE article.string_id="${id}"`;

  const [results] = await connection.execute<(ArticleData & RowDataPacket)[]>(
    query,
    [id],
  );
  return results[0];
};

export const sectionsQuery = async (id: string, connection: PoolConnection) => {
  const query = `SELECT
    article_section.title AS title
    , article_section.text AS text
    FROM article_section
    JOIN article_section_join ON article_section_join.section_id=article_section.id
    WHERE article_section_join.article_id="${id}"`;

  const [results] = await connection.execute<(SectionData & RowDataPacket)[]>(
    query,
    [id],
  );
  return results;
};

export const imagesQuery = async (id: string, connection: PoolConnection) => {
  const query = `SELECT
    article_image.file AS file
    , article_image.title AS title
    , article_image.photographer AS photographer
    , article_image.reference AS reference
    , article_image.alt AS alt
    FROM article_image
    JOIN article_image_join ON article_image_join.image_id=article_image.id
    WHERE article_image_join.article_id="${id}"`;

  const [results] = await connection.execute<(ImageData & RowDataPacket)[]>(
    query,
    [id],
  );
  return results;
};

export const nextArticleQuery = async (connection: PoolConnection) => {
  const query = `SELECT
    article.string_id AS id
    , article.id AS chapter
    , article.title AS title
    FROM article`;

  const [results] =
    await connection.execute<(ArticleReferenceData & RowDataPacket)[]>(query);
  return results;
};
