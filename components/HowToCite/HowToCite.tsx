"use client";

import { useEffect, useState } from "react";

import type { Summary } from "@/types/tunneller";
import { displayBiographyDates } from "@/utils/helpers/roll";

import STYLES from "./HowToCite.module.scss";

type Props = {
  id?: number;
  summary?: Summary;
  title?: string;
  timeline?: boolean;
};

type HowToCiteUrlProps = {
  id?: number;
  title?: string;
  timeline?: boolean;
};

type HowToCiteTitleProps = {
  tunneller?: Summary;
  title?: string;
  timeline?: boolean;
};

export function HowToCiteUrl({ id, title, timeline }: HowToCiteUrlProps) {
  if (id && !timeline) {
    return (
      <span>
        URL: www.
        <wbr />
        nztunnellers
        <wbr />
        .com/
        <wbr />
        tunnellers/
        <wbr />
        {id}.
      </span>
    );
  }
  if (id && timeline) {
    return (
      <span>
        URL: www.
        <wbr />
        nztunnellers
        <wbr />
        .com/
        <wbr />
        tunnellers/
        <wbr />
        {id}
        /
        <wbr />
        wwi-
        <wbr />
        timeline.
      </span>
    );
  }
  const articleTitle = title
    ?.replace(/\s+|\\/g, "-")
    .replace(/&/g, "and")
    .toLowerCase();
  return (
    <span>
      URL: www.
      <wbr />
      nztunnellers
      <wbr />
      .com/
      <wbr />
      history/
      <wbr />
      {articleTitle}.
    </span>
  );
}

function HowToCiteTitle({ tunneller, title, timeline }: HowToCiteTitleProps) {
  if (tunneller && !timeline) {
    return (
      <>
        {`${tunneller.name.forename} ${tunneller.name.surname} `}
        {`(${displayBiographyDates(tunneller.birth, tunneller.death)})`}
      </>
    );
  }
  if (tunneller && timeline) {
    return (
      <>
        World War I Timeline of
        {` ${tunneller.name.forename} ${tunneller.name.surname}`}
      </>
    );
  }
  const articleTitle = title?.replace(/\\/g, " ");
  return <span>{articleTitle}</span>;
}

export function HowToCite({ id, summary, title, timeline }: Props) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(date);
  }, []);

  return (
    <div className={STYLES.howtocite}>
      <h3>How to cite this page</h3>
      <p>
        Anthony Byledbal, &ldquo;
        <HowToCiteTitle tunneller={summary} title={title} timeline={timeline} />
        &ldquo;,
        <em> New Zealand Tunnellers Website</em>
        {`, ${new Date(currentDate).getFullYear()} (2009), Accessed: `}
        {`${currentDate}. `}
        <HowToCiteUrl id={id} title={title} timeline={timeline} />
      </p>
    </div>
  );
}
