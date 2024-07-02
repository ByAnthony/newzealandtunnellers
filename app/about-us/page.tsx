import {
  AboutUsArticle,
  AboutUsData,
  ImageData,
  SectionData,
} from "@/types/article";
import { AboutUs } from "@/components/AboutUs/AboutUs";
import { mysqlConnection } from "@/utils/database/mysqlConnection";
import {
  aboutUsImage,
  aboutUsSections,
  aboutUsTitle,
} from "@/utils/database/queries/aboutUsQuery";

async function fetchPage() {
  const connection = mysqlConnection();

  const data: AboutUsData = await aboutUsTitle(connection);
  const sections: SectionData[] = await aboutUsSections(connection);
  const images: ImageData[] = await aboutUsImage(connection);

  const article: AboutUsArticle = {
    id: data.id,
    title: data.title,
    section: sections,
    image: images,
  };

  connection.end();
  return article;
}

export default async function About() {
  const article = await fetchPage();

  return <AboutUs article={article} />;
}
