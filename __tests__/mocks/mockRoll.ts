import { Tunneller } from '@/app/types/roll';
import { mockId } from './mockProfile';

const johnDoe = {
  forename: 'John',
  surname: 'Doe',
};

const alexanderDriscott = {
  forename: 'Alexander',
  surname: 'Driscott',
};

const williamRight = {
  forename: 'William',
  surname: 'Right',
};

const robertLang = {
  forename: 'Robert',
  surname: 'Lang',
};

export const mockDetails: Tunneller = {
  id: mockId,
  name: johnDoe,
  birthDate: '1886',
  deathDate: '1952',
};

export const mockDetailsList: Tunneller[] = [
  mockDetails,
  {
    ...mockDetails,
    id: 1,
    name: alexanderDriscott,
  },
];

export const mockRoll: Record<string, Tunneller[]> = {
  D: [
    mockDetails,
    {
      ...mockDetails,
      id: 1,
      name: alexanderDriscott,
    },
  ],
  L: [
    {
      ...mockDetails,
      id: 2,
      name: robertLang,
    },
  ],
  R: [
    {
      ...mockDetails,
      id: 3,
      name: williamRight,
    },
  ],
};
