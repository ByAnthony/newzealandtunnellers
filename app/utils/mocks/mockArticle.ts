import { AboutUsArticle } from "../../types/article";

export const mockArticle: AboutUsArticle = {
  id: "about-us",
  title: "Our Story",
  section: [
    { title: "Title 1", text: "This is the first paragraph of our story." },
    { title: "Title 2", text: "This is the second paragraph of our story." },
  ],
  image: [
    {
      file: "our-story.jpg",
      title: null,
      photographer: null,
      reference: null,
      alt: "A picture of our team",
    },
  ],
};
