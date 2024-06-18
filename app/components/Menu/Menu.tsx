"use client";

import { useEffect, useRef, useState } from "react";

import STYLES from "./Menu.module.scss";
import { TunnellerWithFullNameData } from "../../../app/types/tunnellers";
import { displayBiographyDates } from "../../../app/utils/helpers/roll";
import Image from "next/image";

type Props = {
  tunnellers: TunnellerWithFullNameData[];
};

export function Menu({ tunnellers }: Props) {
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
    <div data-testid="menu" className={STYLES.menu}>
      <a href="/" className={STYLES.logo} aria-label="Go to the Homepage">
        <img src="/nzt_logo.png" alt="" />
      </a>
      <div className={STYLES["search-form-container"]}>
        <div className={STYLES["search-form"]} onClick={showDropdown}>
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
            src="/search.png"
            className={STYLES["search-form-button"]}
            width={20}
            height={20}
            alt=""
          />
        </div>
        {dropdownVisible && (
          <ul className={STYLES.dropdown} ref={divRef}>
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
        )}
      </div>
    </div>
  );
}
