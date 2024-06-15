"use client";

import { Content } from "./Content/Content";
import { HowToCite } from "../HowToCite/HowToCite";
import { ArticleNextChapterButton } from "./ArticleNextChapterButton/ArticleNextChapterButton";
import { ArticleNotes } from "./ArticleNotes/ArticleNotes";
import { Title } from "../Title/Title";
import { TopImage } from "./TopImage/TopImage";
import { Chapter } from "../../types/article";
import { today } from "../../utils/helpers/date";

import STYLES from "./Article.module.scss";

type Props = {
  article: Chapter;
};

export function Article({ article }: Props) {
  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <div className={STYLES.link}>
          <a href="/#history">History</a>
        </div>
        <Title title={article.title} subTitle={article.chapter} />
      </div>
      <TopImage image={article.image[0]} />
      <Content
        imageList={article.image.slice(1)}
        sectionList={article.section}
      />
      <ArticleNextChapterButton chapter={article.next} />
      <ArticleNotes notes={article.notes} />
      <HowToCite title={article.title} today={today} />
    </div>
  );
}
