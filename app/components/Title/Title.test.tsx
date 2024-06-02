import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { mockChapter, mockTitle } from '../../utils/mocks/mockArticle';

import { Title } from './Title';

describe('Article Title', () => {
  const component = (
    <Title title={mockTitle} subTitle={mockChapter} />
  );

  test('renders the component correctly', () => {
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders title correctly', () => {
    render(component);

    expect(screen.getByText(/My Awesome/)).toBeInTheDocument();
    expect(screen.getByText(/Article Title/)).toBeInTheDocument();
    expect(screen.getByText(/Chapter 1/)).toBeInTheDocument();
  });
});
