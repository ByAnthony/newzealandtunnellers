import {
  AboutUsArticle,
  AboutUsData,
  ImageData,
  SectionData,
} from "../types/article";
import { AboutUs } from "../components/AboutUs/AboutUs";
import { mysqlConnection } from "../utils/database/mysqlConnection";
import {
  aboutUsImage,
  aboutUsSections,
  aboutUsTitle,
} from "../utils/database/queries/aboutUsQuery";
import { getSections, getImages } from "../utils/helpers/article";

export default async function About() {
  const connection = await mysqlConnection();

  try {
    const data: AboutUsData = await aboutUsTitle(connection);
    const sections: SectionData[] = await aboutUsSections(connection);
    const images: ImageData[] = await aboutUsImage(connection);

    const article: AboutUsArticle = {
      id: data.id,
      title: data.title,
      section: getSections(sections),
      image: getImages(images),
    };

    return <AboutUs article={article} />;
  } catch (error) {
    return { error: error };
  }
}
