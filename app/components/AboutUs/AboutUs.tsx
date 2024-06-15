"use client";

import { AboutUsArticle } from "../../types/article";
import { Paragraph } from "../Article/Paragraph/Paragraph";
import { Title } from "../Title/Title";

import STYLES from "./AboutUs.module.scss";

type Props = {
  article: AboutUsArticle;
};

export function AboutUs({ article }: Props) {
  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <Title title={article.title} />
      </div>
      <Paragraph section={article.section[0]} />
      <div className={STYLES["image-container"]}>
        <img
          className={STYLES.image}
          src={`/images/about-us/${article.image[0].file}`}
          alt={article.image[0].alt}
        />
      </div>
      <Paragraph section={article.section[1]} />
    </div>
  );
}
