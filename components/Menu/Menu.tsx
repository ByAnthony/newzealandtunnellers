"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { TunnellerWithFullNameData } from "@/types/tunnellers";
import { displayBiographyDates } from "@/utils/helpers/roll";

import STYLES from "./Menu.module.scss";

type Props = {
  tunnellers: TunnellerWithFullNameData[];
};

export function Menu({ tunnellers }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [menuVisible, setMenuVisible] = useState(true);
  const [filteredTunnellers, setFilteredTunnellers] = useState<
    TunnellerWithFullNameData[]
  >([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      divRef.current &&
      inputRef.current &&
      !divRef.current.contains(event.target as Node) &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  const handleNavigation = () => {
    setDropdownVisible(false);
    router.refresh();
  };

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

  const isDropdownVisible = () => {
    if (dropdownVisible === false) {
      setDropdownVisible(filteredTunnellers.length > 0 ? true : false);
    }
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
        <div
          className={STYLES["search-form"]}
          onClick={isDropdownVisible}
          ref={inputRef}
        >
          <input
            disabled={menuVisible ? false : true}
            id="search"
            onChange={(event) => handleSearch(event.target.value)}
            type="text"
            placeholder="Search for a Tunneller"
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
          <div className={STYLES.dropdown} ref={divRef}>
            <ul>
              {filteredTunnellers.map((tunneller, index) => (
                <li key={index}>
                  <Link
                    href={`/tunnellers/${tunneller.id}`}
                    aria-label={`See ${tunneller.forename} ${tunneller.surname} profile`}
                    onClick={() => handleNavigation()}
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
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/tunnellers"
              className={STYLES["tunnellers-link"]}
              onClick={() => handleNavigation()}
            >
              <div className={STYLES["tunnellers-link-display"]}>
                <div>See all Tunnellers</div>
                <div className={STYLES.arrow}>&rarr;</div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
