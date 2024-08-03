import { AboutUsArticle } from "@/types/article";

import {
  mockSectionOne,
  mockSectionTwo,
  mockTitle,
  mockTopImage,
} from "./mockArticle";

export const mockAboutUs: AboutUsArticle = {
  id: "my-awesome-article",
  title: mockTitle,
  section: [mockSectionOne, mockSectionTwo],
  image: [mockTopImage],
};
