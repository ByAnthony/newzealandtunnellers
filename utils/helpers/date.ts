import { DateObj } from "../../app/types/tunneller";

export const today = new Date();

export const getYear = (date: string) => {
  return date.slice(0, 4);
};

export const getDayMonth = (date: string) => {
  const datetime = new Date(date);
  const day = datetime.getDate();
  const month = datetime.toLocaleString("default", { month: "long" });

  return `${day} ${month}`;
};

export const getDate = (date: string) => {
  const dateObj: DateObj = { year: getYear(date), dayMonth: getDayMonth(date) };
  return dateObj;
};

export const getAge = (
  birthDate: string | null,
  currentDate: string | null,
) => {
  if (birthDate && currentDate) {
    const birth = new Date(birthDate);
    const current = new Date(currentDate);
    let age = current.getFullYear() - birth.getFullYear();
    const monthDiff = current.getMonth() - birth.getMonth();
    const dayDiff = current.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }
  return null;
};
