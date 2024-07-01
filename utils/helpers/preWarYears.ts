import { ArmyExperience } from "../../app/types/tunneller";

export const getArmyExperience = (experiences: ArmyExperience[]) => {
  const convertMonthToYear = (duration: string | null) => {
    if (duration) {
      const durationAsNumber = Number(duration);
      if (durationAsNumber < 12) {
        return durationAsNumber === 1
          ? `${duration} month`
          : `${duration} months`;
      }
      const year = durationAsNumber / 12;
      return year === 1 ? `${year} year` : `${year} years`;
    }
    return null;
  };

  return experiences.map((experience: ArmyExperience) => ({
    unit: experience.unit,
    country: experience.country,
    conflict: experience.conflict,
    duration: convertMonthToYear(experience.duration),
  }));
};
