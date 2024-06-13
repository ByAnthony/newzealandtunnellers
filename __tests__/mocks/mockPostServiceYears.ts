import { PostServiceYears, PostWarDeath } from '../../types/tunneller';
import { mockDeath } from './mockMilitaryYears';

export const mockAfterWarDeath: PostWarDeath = {
  deathWarInjury: false,
  ...mockDeath,
};

export const mockPostServiceYears: PostServiceYears = {
  death: mockAfterWarDeath,
};
