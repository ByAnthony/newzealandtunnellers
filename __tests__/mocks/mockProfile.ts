import { Profile } from '../../types/tunneller';
import { mockImage } from './mockImage';
import { mockMilitaryYears } from './mockMilitaryYears';
import { mockOrigins } from './mockOrigins';
import { mockPostServiceYears } from './mockPostServiceYears';
import { mockPreWarYears } from './mockPreWarYears';
import { mockSources } from './mockSources';
import { mockSummary } from './mockSummary';

export const mockId: number = 26;

export const mockProfile: Profile = {
  id: mockId,
  summary: mockSummary,
  origins: mockOrigins,
  preWarYears: mockPreWarYears,
  militaryYears: mockMilitaryYears,
  postServiceYears: mockPostServiceYears,
  sources: mockSources,
  image: mockImage,
};
