"use client";

import Link from "next/link";

import type {
  LondonGazette,
  NominalRoll,
  NzArchives,
  Sources,
} from "@/types/tunneller";

import STYLES from "./ProfileSources.module.scss";

type Props = {
  sources: Sources;
};

type RecordWithIbid<T> = T & { ibid: string };

function addIbid<T extends Record<string, string>>(
  array: T[],
  index: number,
  ibid: string,
): RecordWithIbid<T>[] {
  return array.slice(index).map((obj) => ({ ...obj, ibid }));
}

function AwmmSource({ awmmCenotaph }: { awmmCenotaph: string | null }) {
  if (awmmCenotaph) {
    return (
      <p>
        {"Auckland War Memorial Museum Tāmaki Paenga Hira: "}
        <Link href={awmmCenotaph}>Online Cenotaph He Toa Taumata Rau</Link>.
      </p>
    );
  }
  return null;
}

function NzArchivesSource({ nzArchives }: { nzArchives: NzArchives[] }) {
  const nzArchivesList = [
    ...addIbid(
      [nzArchives[0]],
      0,
      "New Zealand Archives Te Rua Mahara o te Kāwanatanga, ",
    ),
    ...addIbid(nzArchives, 1, "Ibid., "),
  ];
  const italicIbid = (ibid: string) =>
    ibid === "Ibid., " ? <em>{ibid}</em> : ibid;
  return (
    <>
      {nzArchivesList.map((archives) => (
        <p key={archives.reference}>
          {italicIbid(archives.ibid)}
          {`${archives.reference}, `}
          <Link href={archives.url}>Military Personnel File</Link>.
        </p>
      ))}
    </>
  );
}

function LondonGazetteSource({
  londonGazette,
}: {
  londonGazette: LondonGazette[];
}) {
  if (londonGazette.length !== 0) {
    const LondonGazetteList = [
      ...addIbid([londonGazette[0]], 0, "London Gazette, "),
      ...addIbid(londonGazette, 1, "Ibid., "),
    ];
    return (
      <>
        {LondonGazetteList.map((gazette) => (
          <p key={gazette.page}>
            <em>{gazette.ibid}</em>
            {`${gazette.date}, p. ${gazette.page}`}.
          </p>
        ))}
      </>
    );
  }
  return null;
}

function NominalRollSource({ nominalRoll }: { nominalRoll: NominalRoll }) {
  const title = `${nominalRoll.title}`;
  const volumeRoll = `, ${nominalRoll.volume}, ${nominalRoll.roll}`;
  const reference = `, ${nominalRoll.publisher}, ${nominalRoll.town}, ${nominalRoll.date}, ${nominalRoll.page}.`;
  if (nominalRoll.volume && nominalRoll.roll) {
    return (
      <p>
        <em>{title}</em>
        {`${volumeRoll}${reference}`}
      </p>
    );
  }
  return (
    <p>
      <em>{title}</em>
      {reference}
    </p>
  );
}

export function ProfileSources({ sources }: Props) {
  return (
    <div className={STYLES.sources}>
      <h3>Sources</h3>
      <AwmmSource awmmCenotaph={sources.awmmCenotaph} />
      <NzArchivesSource nzArchives={sources.nzArchives} />
      <LondonGazetteSource londonGazette={sources.londonGazette} />
      <NominalRollSource nominalRoll={sources.nominalRoll} />
    </div>
  );
}
