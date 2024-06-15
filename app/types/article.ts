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

export type ArticleData = {
  id: string;
  chapter: number;
  title: string;
  notes: string;
};

// Shaped data
export type Section = {
  title: string;
  text: string;
};

export type Image = {
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

export type Chapter = {
  id: string;
  chapter: number;
  title: string;
  section: Section[];
  image: Image[];
  next: Next | null;
  notes: string;
};
