export const getParent = (name: string | null, origin: string | null) => {
  return name ? { name, origin } : null;
};

export const getNzResident = (
  month: number | null,
  enlistment: string | null,
  posted: string | null,
) => {
  if (month) {
    const calculateResidentSince = (year: string, month: number) => {
      if (month < 12) {
        return year;
      }
      const residenceInYear = month / 12;
      const residentSince = Number(year) - residenceInYear;
      return residentSince.toString();
    };

    if (enlistment) {
      const enlistmentYear = enlistment.slice(0, 4);
      return calculateResidentSince(enlistmentYear, month);
    }

    if (posted) {
      const postedYear = posted.slice(0, 4);
      return calculateResidentSince(postedYear, month);
    }
  }
  return null;
};
