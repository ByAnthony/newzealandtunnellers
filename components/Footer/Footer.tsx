"use client";

import Image from "next/image";
import STYLES from "./Footer.module.scss";

const handleClick = () => {
  window.scrollTo(0, 0);
};

export function Footer() {
  return (
    <div className={STYLES.footer}>
      <div className={STYLES.map}>
        <div className={STYLES.links}>
          <div className={STYLES["map-link"]}>
            <a href="/#history">History</a>
          </div>
          <div className={STYLES["map-link"]}>
            <a href="/tunnellers">Tunnellers</a>
          </div>
          <div className={STYLES["map-link"]}>
            <a href="/about-us">About Us</a>
          </div>
        </div>
        <button
          type="button"
          className={STYLES["scroll-top"]}
          onClick={handleClick}
          aria-label="Go back to the top of the page"
        >
          &uarr;
        </button>
      </div>
      <div className={STYLES.support}>
        <div>
          <a
            href="https://www.univ-artois.fr/artois-university"
            aria-label="Go to The Artois University website"
          >
            <Image
              src="/images/support/logo-univ-artois-blanc_0.png"
              alt="Artois University homepage"
              width={125}
              height={67}
              className={STYLES["support-logo"]}
            />
          </a>
        </div>
        <div>
          <a
            href="https://www.irsem.fr/en/"
            aria-label="Go to The Institute for Strategic Research website"
          >
            <Image
              src="/images/support/irsem-white.png"
              alt="Institute for Strategic Research homepage"
              width={125}
              height={81}
              className={STYLES["support-logo"]}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
