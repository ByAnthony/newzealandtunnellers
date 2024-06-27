"use client";

import Image from "next/image";

import type {
  EmbarkationUnit,
  Enlistment,
  ImageTunneller,
  Summary,
} from "../../../types/tunneller";

import STYLES from "./ProfileSummary.module.scss";

type Props = {
  summary: Summary;
  embarkationUnit: EmbarkationUnit;
  enlistment: Enlistment;
  image: ImageTunneller | null;
};

function RenderImage({
  imageUrl,
  tunneller,
}: {
  imageUrl: string | undefined;
  tunneller: Summary;
}) {
  return imageUrl ? (
    <div className={STYLES["image-card"]}>
      <Image
        src={`/images/roll/tunnellers/${imageUrl}`}
        alt={`Portrait of ${tunneller.name.forename} ${tunneller.name.surname}`}
        width={320}
        height={475}
        className={STYLES["tunneller-image"]}
      />
    </div>
  ) : null;
}

function RenderUnit({
  unit,
  section,
}: {
  unit: string;
  section: string | null;
}) {
  if (unit === "Main Body" && section) {
    return (
      <>
        <div className={STYLES["fullwidth-main-card"]}>
          <p>Unit</p>
          <span>{unit}</span>
        </div>
        <div className={STYLES["fullwidth-main-card"]}>
          <p>Section</p>
          <span>{section}</span>
        </div>
      </>
    );
  }
  return (
    <div className={STYLES["fullwidth-main-card"]}>
      <p>Unit</p>
      <span>{unit}</span>
    </div>
  );
}

export function ProfileSummary({
  summary,
  embarkationUnit,
  enlistment,
  image,
}: Props) {
  return (
    <div className={STYLES.overview}>
      <RenderImage imageUrl={image?.url} tunneller={summary} />
      <RenderUnit
        unit={embarkationUnit.detachment}
        section={embarkationUnit.section}
      />
      <div className={STYLES["halfwidth-cards-container"]}>
        <div className={STYLES["halfwidth-secondary-card"]}>
          <p>Rank</p>
          <span>{enlistment.rank}</span>
        </div>
        <div className={STYLES["halfwidth-secondary-card"]}>
          <p>Serial</p>
          <span>{enlistment.serial}</span>
        </div>
      </div>
    </div>
  );
}
