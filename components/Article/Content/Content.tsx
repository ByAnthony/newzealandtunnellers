"use client";

import Image from "next/image";

import { Paragraph } from "@/components/Article/Paragraph/Paragraph";
import { ImageArticle, Section } from "@/types/article";

import STYLES from "./Content.module.scss";

type Props = {
  imageList: ImageArticle[];
  sectionList: Section[];
};

export function Content({ imageList, sectionList }: Props) {
  return (
    <>
      {sectionList.map((text, index) => (
        <div key={sectionList.indexOf(text)}>
          <Paragraph section={text} />
          {index < imageList.length && (
            <>
              <div className={STYLES["image-container"]}>
                <Image
                  src={`/images/history/${imageList[index].file}`}
                  alt={imageList[index].alt}
                  width={800}
                  height={575}
                  className={STYLES.image}
                  placeholder="empty"
                />
              </div>
              <div className={STYLES["image-legend"]}>
                <div className={STYLES.title}>{imageList[index].title}</div>
                <div className={STYLES.captions}>
                  {imageList[index].photographer}
                </div>
                <div className={STYLES.reference}>
                  {imageList[index].reference}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}
