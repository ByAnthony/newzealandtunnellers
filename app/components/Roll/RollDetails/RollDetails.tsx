'use client'

import { displayBiographyDates } from '@/app/utils/displayBiographyDates';
import { Tunneller } from '@/app/types/rollTypes';

import STYLES from '@/app/components/Roll/RollDetails/RollDetails.module.scss';

type Props = {
  listOfTunnellers: Tunneller[];
}

export function RollDetails({ listOfTunnellers }: Props) {
  return (
    <>
      {listOfTunnellers.map((tunneller: any) => (
        <a href={`/tunnellers/${tunneller.id}`} key={tunneller.id}>
          <div className={STYLES.tunneller}>
            <div>
              <p className={STYLES.forename}>{tunneller.name.forename}</p>
              <p className={STYLES.surname}>{tunneller.name.surname}</p>
              <p className={STYLES.dates}>
                { displayBiographyDates(tunneller.birthDate, tunneller.deathDate) }
              </p>
            </div>
            <div className={STYLES.arrow}>&rarr;</div>
          </div>
        </a>
      ))}
    </>
  );
}