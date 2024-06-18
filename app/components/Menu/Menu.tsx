"use client";

import { useEffect, useState } from "react";

import STYLES from "./Menu.module.scss";
import { TunnellerWithFullNameData } from "../../../app/types/tunnellers";
import { displayBiographyDates } from "../../../app/utils/helpers/roll";
import { getBaseUrl } from "app/utils/database/getBaseUrl";
import Image from "next/image";

type Props = {
  tunnellers: TunnellerWithFullNameData[];
};

export function Menu({ tunnellers }: Props) {
  const [filteredTunnellers, setFilteredTunnellers] = useState<
    TunnellerWithFullNameData[]
  >([]);
  // const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  // const [menuVisible, setMenuVisible] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPosition = window.scrollY;

  //     if (prevScrollPosition > currentScrollPosition) {
  //       setMenuVisible(true);
  //     } else {
  //       setMenuVisible(false);
  //     }

  //     setPrevScrollPosition(currentScrollPosition);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [prevScrollPosition]);

  const handleSearch = (search: string) => {
    const searchParts = search.toLowerCase().split(" ");

    setFilteredTunnellers(
      tunnellers.filter((tunneller: TunnellerWithFullNameData) => {
        const fullName = tunneller.fullName?.toLowerCase();
        return searchParts.every((part) => fullName.includes(part));
      }),
    );

    setDropdownVisible(search.length > 0 ? true : false);
  };

  return (
    <div data-testid="menu" className={STYLES.menu}>
      <a href="/" className={STYLES.logo} aria-label="Go to the Homepage">
        <img src="/nzt_logo.png" alt="" />
      </a>
      <div className={STYLES["search-form-container"]}>
        <div className={STYLES["search-form"]}>
          <form>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search for a Tunneller"
              onChange={(event) => handleSearch(event.target.value)}
            />
          </form>
          <Image
            src="/searching_hover.png"
            className={STYLES["search-form-button"]}
            width={20}
            height={20}
            alt=""
          />
        </div>
        <ul
          className={`${STYLES.dropdown}
            ${dropdownVisible ? "" : STYLES.hidden}`}
        >
          {filteredTunnellers.map((tunneller, index) => (
            <li key={index}>
              <a href={`/tunnellers/${tunneller.id}`}>
                <p>
                  {tunneller.forename}
                  <span className={STYLES.surname}>{tunneller.surname}</span>
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
      </div>
    </div>
  );
}
