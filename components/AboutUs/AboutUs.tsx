"use client";

import Image from "next/image";

import { Paragraph } from "@/components/Article/Paragraph/Paragraph";
import { Title } from "@/components/Title/Title";
import { AboutUsArticle } from "@/types/article";

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
        <Image
          src={`/images/about-us/${article.image[0].file}`}
          alt={article.image[0].alt}
          width={800}
          height={575}
          className={STYLES.image}
          priority={true}
        />
      </div>
      <Paragraph section={article.section[1]} />
    </div>
  );
}
