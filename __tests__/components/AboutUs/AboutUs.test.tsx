import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { useGetAboutUsQuery } from '../../redux/slices/aboutUsSlice';
import { mockAboutUs } from '../../utils/mocks/mockArticle';

import { AboutUs } from './AboutUs';

jest.mock('../../redux/slices/aboutUsSlice', () => ({
  useGetAboutUsQuery: jest.fn(),
}));

test('renders profile when data is available', () => {
  (useGetAboutUsQuery as jest.Mock).mockReturnValue({
    data: mockAboutUs,
    error: null,
    isLoading: false,
    isSuccess: true,
  });

  const { asFragment } = render(<AboutUs />);

  expect(asFragment()).toMatchSnapshot();
});

test('does not render profile when data is undefined', () => {
  (useGetAboutUsQuery as jest.Mock).mockReturnValue({
    data: undefined,
    error: null,
    isLoading: false,
    isSuccess: true,
  });

  const { container } = render(<AboutUs />);

  expect(container).toBeEmptyDOMElement();
});

test('should render error page when error', () => {
  (useGetAboutUsQuery as jest.Mock).mockReturnValue({
    data: {},
    error: true,
    isLoading: false,
    isSuccess: false,
  });

  render(<AboutUs />);
  const error = screen.getByText('An error occured');

  expect(error).toBeInTheDocument();
});
