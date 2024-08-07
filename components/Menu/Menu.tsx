"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { TunnellerWithFullNameData } from "@/types/tunnellers";
import { displayBiographyDates } from "@/utils/helpers/roll";

import STYLES from "./Menu.module.scss";

type Props = {
  tunnellers: TunnellerWithFullNameData[];
};

export function Menu({ tunnellers }: Props) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [menuVisible, setMenuVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        setMenuVisible(true);
      } else {
        setMenuVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const divRef = useRef<HTMLUListElement>(null);

  const [filteredTunnellers, setFilteredTunnellers] = useState<
    TunnellerWithFullNameData[]
  >([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (search: string) => {
    const searchParts = search.toLowerCase().split(" ");

    setFilteredTunnellers(
      search.length > 0
        ? tunnellers.filter((tunneller: TunnellerWithFullNameData) => {
            const fullName = tunneller.fullName?.toLowerCase();
            return searchParts.every((part) => fullName.includes(part));
          })
        : [],
    );
    setDropdownVisible(search.length > 0 ? true : false);
  };

  const showDropdown = () => {
    setDropdownVisible(true);
  };

  return (
    <div
      data-testid="menu"
      className={`${STYLES.menu} ${menuVisible ? "" : STYLES.hidden}`}
    >
      <Link href="/" className={STYLES.logo} aria-label="Go to the Homepage">
        <Image
          src="/nzt_logo.png"
          alt="New Zealand Tunnellers Wesbite - Home"
          width={30}
          height={30}
          priority={true}
        />
      </Link>
      <div className={STYLES["search-form-container"]}>
        <div className={STYLES["search-form"]} onClick={showDropdown}>
          <input
            type="text"
            id="search"
            placeholder="Search for a Tunneller"
            onChange={(event) => handleSearch(event.target.value)}
            disabled={menuVisible ? false : true}
          />
          <Image
            src="/search.png"
            alt="Type a name to search for a Tunneller"
            width={20}
            height={20}
            className={STYLES["search-form-button"]}
          />
        </div>
        {dropdownVisible && (
          <ul className={STYLES.dropdown} ref={divRef}>
            {filteredTunnellers.map((tunneller, index) => (
              <li key={index}>
                <a
                  href={`/tunnellers/${tunneller.id}`}
                  aria-label={`See ${tunneller.forename} ${tunneller.surname} profile`}
                >
                  <p>
                    {tunneller.forename}
                    <span className={STYLES.surname}>
                      {` ${tunneller.surname} `}
                    </span>
                    <span className={STYLES.dates}>
                      (
                      {displayBiographyDates(
                        tunneller.birthYear,
                        tunneller.deathYear,
                      )}
                      )
                    </span>
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
