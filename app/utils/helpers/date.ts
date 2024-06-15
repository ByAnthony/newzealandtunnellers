import { DateObj } from "../../types/tunneller";

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
