import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { useGetTunnellerByIdQuery } from '../../redux/slices/rollSlice';

import { mockProfile } from '../../utils/mocks/mockProfile';

import { Profile } from './Profile';

jest.mock('../../redux/slices/rollSlice', () => ({
  useGetTunnellerByIdQuery: jest.fn(),
}));

jest.mock('../../utils/date', () => ({
  today: new Date('2023-05-04'),
}));

test('renders profile when data is available', () => {
  (useGetTunnellerByIdQuery as jest.Mock).mockReturnValue({
    data: mockProfile,
    error: null,
    isLoading: false,
    isSuccess: true,
  });

  const { asFragment } = render(<Profile />);

  expect(asFragment()).toMatchSnapshot();
});

test('does not render profile when data is undefined', () => {
  (useGetTunnellerByIdQuery as jest.Mock).mockReturnValue({
    data: undefined,
    error: null,
    isLoading: false,
    isSuccess: true,
  });

  const { container } = render(<Profile />);

  expect(container).toBeEmptyDOMElement();
});

test('should render error page when error', () => {
  (useGetTunnellerByIdQuery as jest.Mock).mockReturnValue({
    data: {},
    error: true,
    isLoading: false,
    isSuccess: false,
  });

  render(<Profile />);
  const error = screen.getByText('An error occured');

  expect(error).toBeInTheDocument();
});
