"use client";

import Link from "next/link";

import { Tunneller } from "@/types/tunnellers";
import { displayBiographyDates } from "@/utils/helpers/roll";

import STYLES from "./RollDetails.module.scss";

type Props = {
  listOfTunnellers: Tunneller[];
  isLoaded: boolean;
};

export function AttachedCorpsBadge({
  attachedCorps,
}: {
  attachedCorps: string;
}) {
  return <span className={STYLES.badge}>{attachedCorps}</span>;
}

export function RollDetails({ listOfTunnellers, isLoaded }: Props) {
  return (
    <>
      {listOfTunnellers.map((tunneller: Tunneller) => (
        <Link href={`/tunnellers/${tunneller.id}`} key={tunneller.id}>
          {isLoaded && (
            <div className={STYLES.tunneller}>
              <div>
                <p className={STYLES.rank}>
                  {tunneller.rank}
                  {tunneller.attachedCorps ? (
                    <AttachedCorpsBadge
                      attachedCorps={tunneller.attachedCorps}
                    />
                  ) : null}
                </p>
                <p className={STYLES.forename}>{tunneller.name.forename}</p>
                <p className={STYLES.surname}>{tunneller.name.surname}</p>
                <p className={STYLES.detachment}>{tunneller.detachment}</p>
                <p className={STYLES.dates}>
                  {displayBiographyDates(
                    tunneller.birthYear,
                    tunneller.deathYear,
                  )}
                </p>
              </div>
              <div className={STYLES.arrow}>&rarr;</div>
            </div>
          )}
        </Link>
      ))}
    </>
  );
}
