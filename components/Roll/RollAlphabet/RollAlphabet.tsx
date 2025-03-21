"use client";

import { useEffect, useRef, useState } from "react";

import { RollDetails } from "@/components/Roll/RollDetails/RollDetails";
import { Tunneller } from "@/types/tunnellers";

import STYLES from "./RollAlphabet.module.scss";

type Props = {
  tunnellers: [string, Tunneller[]][];
  isLoaded: boolean;
};

export function RollAlphabet({ tunnellers, isLoaded }: Props) {
  const [visibleTunnellers, setVisibleTunnellers] = useState<
    [string, Tunneller[]][]
  >([]);
  const [count, setCount] = useState(5);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const newVisibleTunnellers: [string, Tunneller[]][] = [];
    let remainingCount = count;

    for (const [key, list] of tunnellers) {
      if (remainingCount <= 0) break;

      if (list.length <= remainingCount) {
        newVisibleTunnellers.push([key, list]);
        remainingCount -= list.length;
      } else {
        newVisibleTunnellers.push([key, list.slice(0, remainingCount)]);
        remainingCount = 0;
      }
    }

    setVisibleTunnellers(newVisibleTunnellers);
  }, [tunnellers, count]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setCount((prevCount) => prevCount + 5);
          }, 500);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className={STYLES.roll}>
      {visibleTunnellers.map(([key, listOfTunnellers]) => (
        <div id={`letter-${key}`} key={key}>
          {isLoaded && (
            <div className={STYLES["letter-container"]}>
              <h2
                className={STYLES.title}
                key={key}
                aria-label={`Letter ${key}`}
              >
                {key}
              </h2>
            </div>
          )}
          <div className={STYLES["tunnellers-container"]}>
            <RollDetails
              listOfTunnellers={listOfTunnellers}
              isLoaded={isLoaded}
            />
          </div>
        </div>
      ))}
      <div ref={loadMoreRef} className={STYLES["load-more"]}></div>
    </div>
  );
}
