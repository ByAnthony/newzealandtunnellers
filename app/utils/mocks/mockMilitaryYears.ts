import {
  Date,
  DeathPlace,
  Death,
  DeathCause,
  Cemetery,
  Medal,
  MilitaryYears,
  Enlistment,
  EmbarkationUnit,
  Training,
  Transport,
  EndOfService,
  Demobilization,
} from '../../types/tunneller';
import { mockFrontEvents } from './mockFrontEvents';

export const mockBritishWarMedal: Medal = {
  name: 'British War Medal',
  country: 'United Kingdom',
  image: 'british-war-medal.png',
  citation: null,
};

export const mockVictoryMedal: Medal = {
  name: 'Victory Medal',
  country: 'United Kingdom',
  image: 'victory-medal.png',
  citation: null,
};

export const mockMedals: Medal[] = [
  mockBritishWarMedal,
  mockVictoryMedal,
];

export const mockDate: Date = {
  year: '1926',
  dayMonth: '13 October',
};

const mockPlace: DeathPlace = {
  location: 'Telegraph Hill',
  town: 'Arras',
  country: 'France',
};

const mockCause: DeathCause = {
  type: 'Killed in action',
  circumstances: 'Dead wounded by shell fire',
};

const mockCemetery: Cemetery = {
  name: 'Faubourg d\'Amiens',
  location: 'Arras',
  country: 'France',
  graveReference: 'IE 18',
};

export const mockDeath: Death = {
  date: mockDate,
  place: mockPlace,
  cause: mockCause,
  cemetery: mockCemetery,
  ageAtDeath: 89,
};

export const mockEnlistment: Enlistment = {
  serial: '1/1000',
  rank: 'Sapper',
  date: mockDate,
  district: 'Canterbury',
  alias: null,
  transferredToTunnellers: null,
  ageAtEnlistment: null,
};

const mockTraining: Training = {
  date: mockDate,
  location: 'Auckland',
  locationType: 'Military Camp',
};

export const mockEmbarkationUnit: EmbarkationUnit = {
  detachment: 'Main Body',
  training: mockTraining,
  section: 'Section No.2',
  attachedCorps: null,
};

export const mockTransport: Transport = {
  reference: 'HMNZT 56',
  vessel: 'Beata',
  departureDate: mockDate,
  departurePort: 'Auckland',
  arrivalDate: mockDate,
  arrivalPort: 'Plymouth',
};

const mockDemobilization: Demobilization = {
  date: mockDate,
  country: 'New Zealand',
};

const mockEndOfService: EndOfService = {
  deserter: false,
  transferred: null,
  deathWar: null,
  transportNz: mockTransport,
  demobilization: mockDemobilization,
};

export const mockMilitaryYears: MilitaryYears = {
  enlistment: mockEnlistment,
  embarkationUnit: mockEmbarkationUnit,
  transportUk: mockTransport,
  frontEvents: mockFrontEvents,
  endOfService: mockEndOfService,
  medals: mockMedals,
};
