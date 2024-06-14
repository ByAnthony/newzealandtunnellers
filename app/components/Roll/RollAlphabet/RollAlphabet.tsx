'use client'

import { RollDetails } from '../RollDetails/RollDetails';
import { Tunneller } from '../../../types/tunnellers';

import STYLES from './RollAlphabet.module.scss';

type Props = {
    tunnellers: Record<string, Tunneller[]>;
    filterByLetter: string;
};

export function RollAlphabet({ tunnellers, filterByLetter }: Props) {
  const tunnellersList = Object.entries(tunnellers);

  const isFilteredByLetter = (letter: string) => (letter === '' ? tunnellersList : tunnellersList.filter((key) => key.includes(letter)));

  return (
    <div className={STYLES.roll}>
      {isFilteredByLetter(filterByLetter)
        .map(([key, listOfTunnellers]) => (
          <div id={`letter-${key}`} key={key}>
            <div className={STYLES['letter-container']}>
              <h2 className={STYLES.title} key={key} aria-label={`Letter ${key}`}>{key}</h2>
            </div>
            <div className={STYLES['tunnellers-container']}>
              <RollDetails listOfTunnellers={listOfTunnellers} />
            </div>
          </div>
        ))}
    </div>
  );
}
