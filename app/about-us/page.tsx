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

async function getData() {
  try {
    const connection = await mysqlConnection.getConnection();

    const data: AboutUsData = await aboutUsTitle(connection);
    const sections: SectionData[] = await aboutUsSections(connection);
    const images: ImageData[] = await aboutUsImage(connection);

    const article: AboutUsArticle = {
      id: data.id,
      title: data.title,
      section: sections,
      image: images,
    };

    connection.release();
    return article;
  } catch (error) {
    throw new Error("Failed to fecth about us data");
  }
}

export default async function Page() {
  const article: AboutUsArticle = await getData();

  return <AboutUs article={article} />;
}
