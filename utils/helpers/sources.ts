import { LondonGazette, NzArchives } from "@/types/tunneller";
import { getDayMonth, getYear } from "./date";

export const getNzArchives = (nzArchives: NzArchives[]) => {
  return nzArchives.map((nzArchive: NzArchives) => ({
    reference: nzArchive.reference,
    url: `https://collections.archives.govt.nz/web/arena/search#/entity/aims-archive/R${nzArchive.url}`,
  }));
};

export const getAwmm = (awmm: string | null) => {
  return awmm
    ? `https://www.aucklandmuseum.com/war-memorial/online-cenotaph/record/${awmm}`
    : null;
};

export const getNominalRoll = (
  volume: string | null,
  roll: string | null,
  page: string | null,
) => {
  return volume && roll
    ? {
        title: "Nominal Rolls of New Zealand Expeditionary Force",
        town: "Wellington",
        publisher: "Government Printer",
        date: "1914-1919",
        page: `p.\u00A0${page}`,
        volume: `Vol.${volume}`,
        roll: `Roll No.${roll}`,
      }
    : {
        title:
          "Nominal Roll of New Zealand Expeditionary Force, 1915. New Zealand Engineers Tunnelling Company",
        town: "Wellington",
        publisher: "Government Printer",
        date: "1916",
        page: `p.\u00A0${page}`,
      };
};

export const getLondonGazette = (londonGazetteList: LondonGazette[]) => {
  return londonGazetteList.map((londonGazette: LondonGazette) => ({
    page: londonGazette.page,
    date: `${getDayMonth(londonGazette.date)} ${getYear(londonGazette.date)}`,
  }));
};
