import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import { useGetAllTunnellersQuery } from '../../redux/slices/rollSlice';

import { mockRoll } from '../../utils/mocks/mockRoll';

import { Roll } from './Roll';

jest.mock('../../redux/slices/rollSlice', () => ({
  useGetAllTunnellersQuery: jest.fn(),
}));

const component = <Roll />;

test('renders roll when data is available', () => {
  (useGetAllTunnellersQuery as jest.Mock).mockReturnValue({
    data: mockRoll,
    error: null,
    isLoading: false,
    isSuccess: true,
  });

  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();

  const buttonD = screen.getByLabelText('Filter names by the letter D');
  const buttonL = screen.getByLabelText('Filter names by the letter L');
  const buttonR = screen.getByLabelText('Filter names by the letter R');
  expect(buttonD).toBeInTheDocument();
  expect(buttonD).toHaveTextContent('D');
  expect(buttonL).toBeInTheDocument();
  expect(buttonL).toHaveTextContent('L');
  expect(buttonR).toBeInTheDocument();
  expect(buttonR).toHaveTextContent('R');

  const buttonAll = screen.getByLabelText('Remove the filter by name');
  expect(buttonAll).toBeInTheDocument();
  expect(buttonAll).toHaveTextContent('All');

  const titleD = screen.getByLabelText('Letter D');
  const titleL = screen.getByLabelText('Letter L');
  const titleR = screen.getByLabelText('Letter R');
  expect(titleD).toHaveClass('title');
  expect(titleD).toHaveTextContent('D');
  expect(titleD).toBeInTheDocument();
  expect(titleL).toHaveClass('title');
  expect(titleL).toHaveTextContent('L');
  expect(titleL).toBeInTheDocument();
  expect(titleR).toHaveClass('title');
  expect(titleR).toHaveTextContent('R');
  expect(titleR).toBeInTheDocument();

  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('Doe')).toBeInTheDocument();

  expect(screen.getByText('Alexander')).toBeInTheDocument();
  expect(screen.getByText('Driscott')).toBeInTheDocument();

  expect(screen.getByText('Robert')).toBeInTheDocument();
  expect(screen.getByText('Lang')).toBeInTheDocument();

  expect(screen.getByText('William')).toBeInTheDocument();
  expect(screen.getByText('Right')).toBeInTheDocument();
});

describe('Filter', () => {
  test('should filter by name', () => {
    (useGetAllTunnellersQuery as jest.Mock).mockReturnValue({
      data: mockRoll,
      error: null,
      isLoading: false,
      isSuccess: true,
    });

    render(component);

    const buttonD = screen.getByLabelText('Filter names by the letter D');
    fireEvent.click(buttonD);
    expect(screen.getByLabelText('Letter D')).toBeInTheDocument();
    expect(screen.queryByLabelText('Letter L')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Letter R')).not.toBeInTheDocument();

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();

    expect(screen.getByText('Alexander')).toBeInTheDocument();
    expect(screen.getByText('Driscott')).toBeInTheDocument();

    expect(screen.queryByText('Robert')).not.toBeInTheDocument();
    expect(screen.queryByText('Lang')).not.toBeInTheDocument();

    expect(screen.queryByText('William')).not.toBeInTheDocument();
    expect(screen.queryByText('Right')).not.toBeInTheDocument();
  });

  test('should remove filter by name', () => {
    (useGetAllTunnellersQuery as jest.Mock).mockReturnValue({
      data: mockRoll,
      error: null,
      isLoading: false,
      isSuccess: true,
    });

    render(component);

    const buttonD = screen.getByLabelText('Filter names by the letter D');
    const buttonAll = screen.getByLabelText('Remove the filter by name');

    fireEvent.click(buttonD);

    expect(screen.getByLabelText('Letter D')).toBeInTheDocument();
    expect(screen.queryByLabelText('Letter L')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Letter R')).not.toBeInTheDocument();

    fireEvent.click(buttonAll);

    expect(screen.getByLabelText('Letter D')).toBeInTheDocument();
    expect(screen.getByLabelText('Letter L')).toBeInTheDocument();
    expect(screen.getByLabelText('Letter R')).toBeInTheDocument();
  });
});

test('does not render roll when data is undefined', () => {
  (useGetAllTunnellersQuery as jest.Mock).mockReturnValue({
    data: undefined,
    error: null,
    isLoading: false,
    isSuccess: true,
  });

  const { container } = render(component);

  expect(container).toBeEmptyDOMElement();
});

test('should render error page when error', () => {
  (useGetAllTunnellersQuery as jest.Mock).mockReturnValue({
    data: {},
    error: true,
    isLoading: false,
    isSuccess: false,
  });

  render(component);
  const error = screen.getByText('An error occured');

  expect(error).toBeInTheDocument();
});
