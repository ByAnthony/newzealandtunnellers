export const getParent = (name: string | null, origin: string | null) => {
  return name ? { name, origin } : null;
};

export const getNzResident = (
  month: number | null,
  enlistment: string | null,
  posted: string | null,
) => {
  if (month) {
    const calculateResidentSince = (date: string, month: number) => {
      const startDate = new Date(date);
      startDate.setMonth(startDate.getMonth() - month);
      return startDate.getFullYear().toString();
    };

    if (enlistment) {
      return calculateResidentSince(enlistment, month);
    }

    if (posted) {
      return calculateResidentSince(posted, month);
    }
  }
  return null;
};
