"use client";

import { displayBiographyDates } from "../../utils/helpers/roll";

import type { Summary } from "../../types/tunneller";

import STYLES from "./HowToCite.module.scss";

type Props = {
  id?: number;
  summary?: Summary;
  title?: string;
  today: Date;
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

export function HowToCite({ id, summary, title, today, timeline }: Props) {
  return (
    <div className={STYLES.howtocite}>
      <h3>How to cite this page</h3>
      <p>
        Anthony Byledbal, &ldquo;
        <HowToCiteTitle tunneller={summary} title={title} timeline={timeline} />
        &ldquo;,
        <em> New Zealand Tunnellers Website</em>
        {`, ${today.getFullYear()} (2009), Accessed: `}
        {`${today.toLocaleDateString("en-NZ", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}. `}
        <HowToCiteUrl id={id} title={title} timeline={timeline} />
      </p>
    </div>
  );
}
