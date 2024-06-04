import { Birth, Origins, Parents } from '../../types/tunneller';

export const mockBirth: Birth = {
  date: {
    year: '1886',
    dayMonth: '18 December',
  },
  country: 'New Zealand',
};

export const mockParents: Parents = {
  mother: {
    name: 'Jane Doe',
    origin: 'New Zealand',
  },
  father: {
    name: 'John Doe',
    origin: 'Scotland',
  },
};

export const mockOrigins: Origins = {
  birth: mockBirth,
  parents: mockParents,
  inNzLength: null,
};
