import { getAboutUs } from "../utils/api/getEndpoint";
import { AboutUsArticle } from "../types/article";
import { AboutUs } from "../components/AboutUs/AboutUs";

export default async function About() {
  const article: AboutUsArticle = await getAboutUs();
  console.log(article);

  return <AboutUs article={article} />;
}
