// import Link from "next/link";

import STYLES from "./Tunnellers.module.scss";

export function Tunnellers() {
  return (
    <>
      <div className={STYLES.intro}>
        <h1>The Kiwis who fought beneath the no man&rsquo;s land</h1>
      </div>
      {/* <Link href="/tunnellers/" className={STYLES["link-roll"]}>
        <div className={STYLES.roll}>
          <p>Discover</p>
          <span>The Tunnellers</span>
        </div>
      </Link> */}
    </>
  );
}
