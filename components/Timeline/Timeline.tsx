"use client";

import Link from "next/link";

import { today } from "@/utils/helpers/date";

import { Title } from "../Title/Title";
import { HowToCite } from "../HowToCite/HowToCite";
import { TimelineEvents } from "./TimelineEvents/TimelineEvents";
import { TunnellerProfile } from "@/types/tunneller";

import STYLES from "./Timeline.module.scss";

type Props = {
  tunneller: TunnellerProfile;
};

export function Timeline({ tunneller }: Props) {
  return (
    <div className={STYLES.timeline}>
      <div className={STYLES.header}>
        <div className={STYLES.link}>
          <Link href="/tunnellers">Tunnellers</Link>
          <span>/</span>
          <a
            href={`/tunnellers/${tunneller.id}`}
          >{`${tunneller.summary.name.forename} ${tunneller.summary.name.surname}`}</a>
        </div>
        <div className={STYLES["main-title"]}>
          <Title title={"World War I\\Timeline"} />
        </div>
      </div>
      <div className={STYLES.events}>
        <div className={STYLES.line}>
          <TimelineEvents
            militaryYears={tunneller.militaryYears}
            death={tunneller.death}
          />
        </div>
      </div>
      <HowToCite
        id={tunneller.id}
        summary={tunneller.summary}
        today={today}
        timeline
      />
    </div>
  );
}
