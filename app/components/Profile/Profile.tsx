"use client";

import { displayBiographyDates } from "../../utils/helpers/roll";
import { today } from "../../utils/helpers/date";

import { HowToCite } from "../HowToCite/HowToCite";
import { ProfileDiary } from "./ProfileDiary/ProfileDiary";
import { ProfileImageSource } from "./ProfileImageSource/ProfileImageSource";
import { ProfileSources } from "./ProfileSources/ProfileSources";
import { ProfileSummary } from "./ProfileSummary/ProfileSummary";
import { Title } from "../Title/Title";
import { TunnellerProfile } from "../../types/tunneller";

import STYLES from "./Profile.module.scss";

type Props = {
  tunneller: TunnellerProfile;
};

export function Profile({ tunneller }: Props) {
  return (
    <>
      <div className={STYLES.container}>
        <div className={STYLES.header}>
          <div className={STYLES.link}>
            <a href="/tunnellers">Tunnellers</a>
          </div>
          <Title
            name={tunneller.summary.name}
            subTitle={displayBiographyDates(
              tunneller.summary.birth,
              tunneller.summary.death,
            )}
          />
        </div>
      </div>
      <div className={STYLES.profile}>
        <div className={STYLES["flex-summary"]}>
          <div className={STYLES.summary}>
            <ProfileSummary
              summary={tunneller.summary}
              embarkationUnit={tunneller.militaryYears.embarkationUnit}
              enlistment={tunneller.militaryYears.enlistment}
              image={tunneller.image}
            />
          </div>
        </div>
        <div className={STYLES["flex-diary"]}>
          <ProfileDiary
            tunnellerId={tunneller.id}
            origins={tunneller.origins}
            preWarYears={tunneller.preWarYears}
            militaryYears={tunneller.militaryYears}
            death={tunneller.death}
          />
          <ProfileSources sources={tunneller.sources} />
          <ProfileImageSource source={tunneller.image?.source} />
          <HowToCite
            id={tunneller.id}
            summary={tunneller.summary}
            today={today}
          />
        </div>
      </div>
    </>
  );
}
