"use client";

import { Image } from "../../../types/article";

import STYLES from "../Content/Content.module.scss";

type Props = {
  image: Image;
};

export function TopImage({ image }: Props) {
  return (
    <div className={STYLES["image-container"]}>
      <img
        className={STYLES.image}
        src={`/images/history/${image.file}`}
        alt={image.alt}
      />
    </div>
  );
}
