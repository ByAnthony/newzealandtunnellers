import { ArmyExperience, Employment, PreWayYears } from "../../types/tunneller";

export const mockArmyExperience: ArmyExperience = {
  unit: "NZ Infantry",
  country: "New Zealand",
  conflict: null,
  duration: "12 months",
};

export const mockArmyExperienceList: ArmyExperience[] = [mockArmyExperience];

export const mockEmployment: Employment = {
  occupation: "Goldminer",
  employer: "Goldmining Company",
};

export const mockPreWarYears: PreWayYears = {
  armyExperience: mockArmyExperienceList,
  employment: mockEmployment,
  residence: null,
  maritalStatus: null,
  wife: null,
  religion: null,
};
