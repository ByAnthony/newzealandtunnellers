import { NextResponse } from "next/server";
import { mysqlConnection } from "../../utils/api/mysqlConnection";
import {
  aboutUsImage,
  aboutUsSections,
  aboutUsTitle,
} from "../../utils/api/queries/aboutUsQuery";
import {
  AboutUsArticle,
  AboutUsData,
  ImageData,
  SectionData,
} from "../../types/article";

const getSections = (sections: SectionData[]) => {
  return sections.map((section: SectionData) => ({
    title: section.title,
    text: section.text,
  }));
};

const getImages = (images: ImageData[]) => {
  return images.map((image: ImageData) => ({
    file: image.file,
    title: image.title,
    photographer: image.photographer,
    reference: image.reference,
    alt: image.alt,
  }));
};

export async function GET() {
  const connection = await mysqlConnection();

  try {
    const article: AboutUsData = await aboutUsTitle(connection);
    const sections: SectionData[] = await aboutUsSections(connection);
    const images: ImageData[] = await aboutUsImage(connection);

    const data: AboutUsArticle = {
      id: article.id,
      title: article.title,
      section: getSections(sections),
      image: getImages(images),
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    );
  }
}
