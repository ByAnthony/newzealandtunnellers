// Database extract
export type SectionData = {
  title: string;
  text: string;
};

export type ImageData = {
  file: string;
  title: string | null;
  photographer: string | null;
  reference: string | null;
  alt: string;
};

export type ArticleReferenceData = {
  id: string;
  chapter: number;
  title: string;
};

export type AboutUsData = {
  id: string;
  title: string;
};

export type ArticleData = AboutUsData & {
  chapter: number;
  notes: string;
};

// Shaped data
export type Section = {
  title: string;
  text: string;
};

export type ImageArticle = {
  file: string;
  title: string | null;
  photographer: string | null;
  reference: string | null;
  alt: string;
};

export type Next = {
  url: string;
  chapter: number;
  title: string;
};

export type AboutUsArticle = {
  id: string;
  title: string;
  section: Section[];
  image: ImageArticle[];
};

export type Chapter = AboutUsArticle & {
  chapter: number;
  title: string;
  next: Next | null;
  notes: string;
};
