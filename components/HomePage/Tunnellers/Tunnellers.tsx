import Link from "next/link";
import { useState, useEffect } from "react";

import STYLES from "./Tunnellers.module.scss";

export function Tunnellers() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 512);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 512);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const svgElement = (height: number, isMobile: boolean) => {
    return (
      <svg viewBox={`0 0 100 ${height}`}>
        <defs>
          <mask id="mask" x="0" y="0" width="100" height={height}>
            <rect x="0" y="0" width="100" height={height} fill="white" />
            <text x="0" y="10">
              {isMobile ? (
                <>
                  <tspan x="0" dy="0.8em">
                    The Kiwis
                  </tspan>
                  <tspan x="0" dy="0.8em">
                    who
                  </tspan>
                  <tspan x="0" dy="0.8em">
                    fought
                  </tspan>
                  <tspan x="0" dy="0.8em">
                    beneath
                  </tspan>
                  <tspan x="0" dy="0.8em">
                    the no
                  </tspan>
                  <tspan x="0" dy="0.8em">
                    man’s
                  </tspan>
                  <tspan x="0" dy="0.8em">
                    land
                  </tspan>
                </>
              ) : (
                <>
                  <tspan x="0" dy="0.8em">
                    The Kiwis
                  </tspan>
                  <tspan x="0" dy="0.8em">
                    who fought
                  </tspan>
                  <tspan x="0" dy="0.8em">
                    beneath the
                  </tspan>
                  <tspan x="0" dy="0.8em">
                    no man’s land
                  </tspan>
                </>
              )}
            </text>
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100"
          height={height}
          fill="rgb(24, 26, 27)"
          mask="url(#mask)"
        />
      </svg>
    );
  };

  return (
    <>
      <div className={STYLES.intro}>
        {svgElement(isMobile ? 130 : 60, isMobile)}
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
