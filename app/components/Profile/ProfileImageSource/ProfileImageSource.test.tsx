import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { findElementWithText } from '../../../utils/test';
import {
  mockImageArchives,
  mockImageAucklandLibraries,
  mockImageBook,
  mockImageFamily,
  mockImageNewspaper,
  mockImageSource,
} from '../../../utils/mocks/mockImage';

import { ProfileImageSource } from './ProfileImageSource';

describe('Snapshot', () => {
  test('renders the component correctly with the Auckland Library information', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        aucklandLibraries: mockImageAucklandLibraries,
      }}
      />
    );
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the component correctly with the Archives information', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        archives: mockImageArchives,
      }}
      />
    );
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the component correctly with the family information', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        family: mockImageFamily,
      }}
      />
    );
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the component correctly with the newspaper information', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        newspaper: mockImageNewspaper,
      }}
      />
    );
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the component correctly with the book information', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        book: mockImageBook,
      }}
      />
    );
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Auckland Library', () => {
  test('renders Auckland Library information correctly', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        aucklandLibraries: mockImageAucklandLibraries,
      }}
      />
    );
    render(component);

    const element = findElementWithText('Auckland Libraries Ngā Pātaka Kōrero o Tāmaki Makaurau, Sir George Grey Special Collections:');

    expect(element).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '31-B2671' }))
      .toHaveAttribute('href', 'https://digitalnz.org/records?text=31-B2671&tab=Images#');
    expect(screen.queryByText('Auckland War Memorial Museum, MS-93/157')).not.toBeInTheDocument();
    expect(screen.queryByText('Courtesy of John Doe family')).not.toBeInTheDocument();
    expect(screen.queryByText('Auckland Star')).not.toBeInTheDocument();
    expect(screen.queryByText('My Mock Title')).not.toBeInTheDocument();
  });
});

describe('Archives', () => {
  test('renders archives information correctly', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        archives: mockImageArchives,
      }}
      />
    );
    render(component);

    const element = findElementWithText('Auckland War Memorial Museum, MS-93/157');

    expect(element).toBeInTheDocument();
    expect(screen.queryByText('Auckland Libraries Ngā Pātaka Kōrero o Tāmaki Makaurau, Sir George Grey Special Collections:')).not.toBeInTheDocument();
    expect(screen.queryByText('Courtesy of John Doe family')).not.toBeInTheDocument();
    expect(screen.queryByText('Auckland Star')).not.toBeInTheDocument();
    expect(screen.queryByText('My Mock Title')).not.toBeInTheDocument();
  });
});

describe('Family', () => {
  test('renders family information correctly', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        family: mockImageFamily,
      }}
      />
    );
    render(component);

    const element = findElementWithText('Courtesy of John Doe family');

    expect(element).toBeInTheDocument();
    expect(screen.queryByText('Auckland Libraries Ngā Pātaka Kōrero o Tāmaki Makaurau, Sir George Grey Special Collections:')).not.toBeInTheDocument();
    expect(screen.queryByText('Auckland War Memorial Museum, MS-93/157')).not.toBeInTheDocument();
    expect(screen.queryByText('Auckland Star')).not.toBeInTheDocument();
    expect(screen.queryByText('My Mock Title')).not.toBeInTheDocument();
  });
});

describe('Newspaper', () => {
  test('renders newspaper information correctly', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        newspaper: mockImageNewspaper,
      }}
      />
    );
    render(component);

    const title = findElementWithText('Auckland Star');
    const extraInfo = findElementWithText(', 12 July 1898.');

    expect(title).toBeInTheDocument();
    expect(extraInfo).toBeInTheDocument();
    expect(screen.queryByText('Auckland Libraries Ngā Pātaka Kōrero o Tāmaki Makaurau, Sir George Grey Special Collections:')).not.toBeInTheDocument();
    expect(screen.queryByText('Auckland War Memorial Museum, MS-93/157')).not.toBeInTheDocument();
    expect(screen.queryByText('Courtesy of John Doe family')).not.toBeInTheDocument();
    expect(screen.queryByText('My Mock Title')).not.toBeInTheDocument();
  });
});

describe('Book', () => {
  test('renders book information correctly', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        book: mockImageBook,
      }}
      />
    );
    render(component);

    const author = findElementWithText('Jane Doe,');
    const title = findElementWithText('My Mock Title');
    const extraInfo = findElementWithText(', Bethune, Publisher and Co., 1925, p. 89.');

    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(extraInfo).toBeInTheDocument();
    expect(screen.queryByText('Auckland Libraries Ngā Pātaka Kōrero o Tāmaki Makaurau, Sir George Grey Special Collections:')).not.toBeInTheDocument();
    expect(screen.queryByText('Auckland War Memorial Museum, MS-93/157')).not.toBeInTheDocument();
    expect(screen.queryByText('Courtesy of John Doe family')).not.toBeInTheDocument();
    expect(screen.queryByText('Auckland Star')).not.toBeInTheDocument();
  });

  test('renders authors correctly', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        book: {
          ...mockImageBook,
          authors: [{
            forename: 'Jane',
            surname: 'Doe',
          },
          {
            forename: 'John',
            surname: 'Doe',
          }],
        },
      }}
      />
    );
    render(component);

    const authors = findElementWithText('Jane Doe and John Doe,');

    expect(authors).toBeInTheDocument();
  });

  test('does not render page when unknown', () => {
    const component = (
      <ProfileImageSource source={{
        ...mockImageSource,
        book: {
          ...mockImageBook,
          page: null,
        },
      }}
      />
    );
    render(component);

    expect(screen.queryByText('p. 89')).not.toBeInTheDocument();
  });
});

test('does not render component when unknown', () => {
  const { container } = render(
    <ProfileImageSource source={undefined} />,
  );

  expect(container).toBeEmptyDOMElement();
});
