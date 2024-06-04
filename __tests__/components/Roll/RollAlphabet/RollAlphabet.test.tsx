import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { mockRoll } from '../../../../app/utils/mocks/mockRoll';

import { RollAlphabet } from '../../../../app/components/Roll/RollAlphabet/RollAlphabet';

const component = <RollAlphabet tunnellers={mockRoll} filterByLetter="" />;

test('renders the component correctly', () => {
  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();
});

test('should filter by name', () => {
  render(<RollAlphabet tunnellers={mockRoll} filterByLetter="D" />);

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
