"use client";

import Image from "next/image";
import { ImageArticle } from "../../../types/article";

import STYLES from "../Content/Content.module.scss";

type Props = {
  image: ImageArticle;
};

export function TopImage({ image }: Props) {
  return (
    <div className={STYLES["image-container"]}>
      <Image
        src={`/images/history/${image.file}`}
        alt={image.alt}
        width={800}
        height={575}
        className={STYLES.image}
      />
    </div>
  );
}
