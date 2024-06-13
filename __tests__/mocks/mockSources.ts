import {
  NzArchives, NominalRoll, LondonGazette, Sources,
} from '../../types/tunneller';

const mockNzArchives: NzArchives[] = [{
  reference: 'AABK 18805 W5530 39/0022386',
  url: 'https://www.mockurl.co.nz/nzarchives/B2874930',
}];

const mockAwmmCenotaph: string = 'https://www.mockurl.co.nz/online-cenotaph/B2874930';

const mockNominalRoll: NominalRoll = {
  title: 'Nominal Roll of New Zealand Expeditionary Force, 1915. New Zealand Engineers Tunnelling Company',
  town: 'Wellington',
  publisher: 'Government Printer',
  date: '1916',
  page: '37',
  volume: null,
  roll: null,
};

const mockLondonGazette: LondonGazette[] = [{
  page: '1675',
  date: '23 May 1917',
}];

export const mockSources: Sources = {
  nzArchives: mockNzArchives,
  awmmCenotaph: mockAwmmCenotaph,
  nominalRoll: mockNominalRoll,
  londonGazette: mockLondonGazette,
};
