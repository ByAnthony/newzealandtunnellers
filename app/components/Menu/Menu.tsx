'use client'

import { useEffect, useState } from 'react';

import STYLES from './Menu.module.scss';

export function Menu() {
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

  return (
    <div data-testid="menu" className={`${STYLES.menu} ${menuVisible ? '' : STYLES.hidden}`}>
      <a href="/" className={STYLES.logo} aria-label="Go to the Homepage"><img src="/nzt_logo.png" alt="" /></a>
      <div className={STYLES['search-form']}>
        <form>
          <input type="text" id="search" name="search" placeholder="Search for a Tunneller" />
        </form>
        <button type="submit" aria-label="Search" className={STYLES['search-form-button']}>
          <img src="/searching_hover.png" alt="" height={18} />
        </button>
      </div>
    </div>
  );
}
