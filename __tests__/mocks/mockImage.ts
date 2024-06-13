import {
  Image, ImageSource, ImageNewspaper, ImageArchives, ImageBook,
} from '../../types/tunneller';

export const mockImageAucklandLibraries: string = 'https://digitalnz.org/records?text=31-B2671&tab=Images#';

export const mockImageArchives: ImageArchives = {
  location: 'Auckland War Memorial Museum',
  reference: 'MS-93/157',
};

export const mockImageFamily: string = 'Courtesy of John Doe family';

export const mockImageNewspaper: ImageNewspaper = {
  name: 'Auckland Star',
  date: '12 July 1898',
};

export const mockImageBook: ImageBook = {
  title: 'My Mock Title',
  town: 'Bethune',
  publisher: 'Publisher and Co.',
  authors: [
    {
      forename: 'Jane',
      surname: 'Doe',
    },
  ],
  year: '1925',
  page: 'p. 89',
};

export const mockImageSource: ImageSource = {
  aucklandLibraries: null,
  archives: null,
  family: null,
  newspaper: null,
  book: null,
};

export const mockImage: Image = {
  url: '1/1234.jpg',
  source: mockImageSource,
};
