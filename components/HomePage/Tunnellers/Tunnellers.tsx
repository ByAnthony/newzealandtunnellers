import Link from "next/link";

import STYLES from "./Tunnellers.module.scss";

export function Tunnellers() {
  return (
    <>
      <div className={STYLES.intro}>
        <h1>The Kiwis who fought beneath the no man&rsquo;s land</h1>
      </div>
      <div className={STYLES["roll-wrapper"]}>
        <div className={STYLES["roll-container"]}>
          <Link href="/tunnellers/" className={STYLES.roll}>
            <p className={STYLES.discover}>Discover</p>
            The New Zealand Tunnellers
          </Link>
        </div>
      </div>
    </>
  );
}
