'use client'

import { useEffect, useState } from 'react';

import STYLES from './Menu.module.scss';
import { Tunneller } from '../../../app/types/tunnellers';

type Props = {
  tunnellers: Tunneller[];
};

export function Menu({tunnellers}: Props) {
  const [filteredTunnellers, setFilteredTunnellers] = useState<Tunneller[]>([]);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [menuVisible, setMenuVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (prevScrollPosition > currentScrollPosition) {
        setMenuVisible(true);
      } else {
        setMenuVisible(false);
      }

      setPrevScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPosition]);

  const handleSearch = (search: string) => {
    const searchParts = search.toLowerCase().split(' ');

    setFilteredTunnellers(tunnellers.filter((tunneller: Tunneller) => {
      const fullName = tunneller.fullName?.toLowerCase() || '';
      return searchParts.every(part => fullName.includes(part));
    }));  
  };

  const capitalizeName = (name: string) => {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <>
      <div data-testid="menu" className={`${STYLES.menu} ${menuVisible ? '' : STYLES.hidden}`}>
        <a href="/" className={STYLES.logo} aria-label="Go to the Homepage"><img src="/nzt_logo.png" alt="" /></a>
        <div className={STYLES['search-form']}>
          <form>
            <input type="text" id="search" name="search" placeholder="Search for a Tunneller" onChange={(event) => handleSearch(event.target.value)} />
          </form>
            <img src="/searching_hover.png" className={STYLES['search-form-button']} alt="" height={18} />
        </div>
      </div>
      <div className={STYLES['drop-down']}>
        <ul>
          {filteredTunnellers.map((tunneller, index) => (
            <li key={index}><a href={`/tunnellers/${tunneller.id}`}>{capitalizeName(tunneller.fullName)}</a></li>
          ))}
        </ul>
      </div>
    </>
  );
}
