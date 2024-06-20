import { AboutUs } from "../../types/about-us";
import { Article, Image, Next, Section } from "../../types/article";

export const mockTitle: string = "My Awesome\\Article Title";

export const mockChapter: number = 1;

export const mockTopImage: Image = {
  file: "img-123.png",
  alt: "Accessible alt text",
};

export const mockArticleImage: Image = {
  ...mockTopImage,
  title: "An Amazing Photo",
  photographer: "The French Photographer Doisneau",
  reference: "Where the photo is preserved",
};

export const mockSectionOne: Section = {
  title: "Section Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea *commodo consequat*. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat[1](#footnote_1). Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\\n\\n(6--July 2023)",
};

export const mockSectionTwo: Section = {
  title: "Section Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea *commodo consequat*. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat[1](#footnote_1). Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\\n\\n(6--July 2023)",
};

export const mockSectionThree: Section = {
  title: "Section Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor [incididunt](http://www.loremipsum.com) ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea *commodo consequat*. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat[1](#footnote_1). Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\\n\\n(6--July 2023)",
};

export const mockNextButton: Next = {
  url: "my-path-to-next-chapter/",
  title: "Next\\Chapter",
  chapter: 3,
};

export const mockNotes: string =
  "[1.](#reference_1) Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\\n\\n[2.](#reference_2) Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const mockArticle: Article = {
  id: "my-awesome-article",
  chapter: mockChapter,
  title: mockTitle,
  section: [mockSectionOne, mockSectionTwo],
  image: [mockTopImage, mockArticleImage],
  next: mockNextButton,
  notes: mockNotes,
};

export const mockAboutUs: AboutUs = {
  id: "my-awesome-article",
  title: mockTitle,
  section: [mockSectionOne, mockSectionThree],
  image: [mockTopImage],
};
