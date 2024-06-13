import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { mockChapter, mockTitle } from '../../mocks/mockArticle';

import { Title } from '../../../app/components/Title/Title';

describe('Article Title', () => {
  const component = (
    <Title title={mockTitle} subTitle={mockChapter} />
  );

  test('renders the component correctly', () => {
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders chapter title and subtitle correctly', () => {
    render(component);

    expect(screen.getByText(/My Awesome/)).toBeInTheDocument();
    expect(screen.getByText(/Article Title/)).toBeInTheDocument();
    expect(screen.getByText(/Chapter 1/)).toBeInTheDocument();
  });

  test('renders title without subtitle correctly', () => {
    render(<Title title={mockTitle} />);

    expect(screen.getByText(/My Awesome/)).toBeInTheDocument();
    expect(screen.getByText(/Article Title/)).toBeInTheDocument();
  });
});
