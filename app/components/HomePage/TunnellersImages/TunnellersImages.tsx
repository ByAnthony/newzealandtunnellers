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
          <img src={`/images/roll/tunnellers/${image.image}`} alt="tba" />
        </div>
      ))}
    </div>
  );
}
