import Image from "next/image";
import { TunnellerImages } from "../../../types/homepage";

import STYLES from "./TunnellersImages.module.scss";

type Props = {
  images: TunnellerImages[];
};

export function TunnellersImages({ images }: Props) {
  return (
    <div className={STYLES["grid-container"]}>
      {images.map((image) => (
        <div className={STYLES["grid-item"]} key={image.id}>
          <a href={`/tunnellers/${image.id}`}>
            <Image
              src={`/images/roll/tunnellers/${image.image}`}
              alt="tba"
              width={100}
              height={475}
              className={STYLES["grid-item-image"]}
            />
          </a>
        </div>
      ))}
    </div>
  );
}
