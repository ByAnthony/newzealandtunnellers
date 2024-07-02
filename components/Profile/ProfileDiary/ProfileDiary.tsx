"use client";

import { MilitaryYears, Origins, Death, PreWayYears } from "@/types/tunneller";

import { DiaryArmyExperience } from "./DiaryArmyExperience/DiaryArmyExperience";
import { DiaryArrivedInNz } from "./DiaryArrivedInNz/DiaryArrivedInNz";
import { DiaryBirth } from "./DiaryBirthInfo/DiaryBirthInfo";
import { DiaryDied } from "./DiaryDied/DiaryDied";
import { DiaryHometown } from "./DiaryHometown/DiaryHometown";
import { DiaryLife } from "./DiaryLife/DiaryLife";
import { DiaryMedal } from "./DiaryMedal/DiaryMedal";
import { DiaryParents } from "./DiaryParents/DiaryParents";
import { DiaryWork } from "./DiaryWork/DiaryWork";

import STYLES from "./ProfileDiary.module.scss";

type Props = {
  tunnellerId: number;
  origins: Origins;
  preWarYears: PreWayYears;
  militaryYears: MilitaryYears;
  death: Death | null;
};

export function ProfileDiary({
  tunnellerId,
  origins,
  preWarYears,
  militaryYears,
  death,
}: Props) {
  return (
    <div className={STYLES.diary}>
      <h2>About</h2>
      <DiaryBirth birth={origins.birth} />
      <DiaryParents parents={origins.parents} />
      <DiaryArrivedInNz inNzLength={origins.inNzLength} />
      <DiaryHometown residence={preWarYears.residence} />
      <DiaryWork employment={preWarYears.employment} />
      <DiaryLife
        maritalStatus={preWarYears.maritalStatus}
        wife={preWarYears.wife}
      />
      <DiaryArmyExperience
        tunnellerId={tunnellerId}
        armyExperience={preWarYears.armyExperience}
      />
      <DiaryMedal medals={militaryYears.medals} />
      <DiaryDied death={death} />
    </div>
  );
}
