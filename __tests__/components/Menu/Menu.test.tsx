// import '@testing-library/jest-dom';
// import { fireEvent, render, screen } from '@testing-library/react';

// import { Menu } from '../../../app/components/Menu/Menu';

// test('should render menu', () => {
//   render(<Menu />);

//   expect(screen.getByLabelText('Go to the Homepage')).toBeInTheDocument();
//   expect(screen.getByRole('button')).toBeInTheDocument();
// });

// describe('Menu', () => {
//   test('becomes invisible on scrolling down', () => {
//     render(<Menu />);
//     expect(screen.getByTestId('menu')).toHaveClass('menu');

//     fireEvent.scroll(window, { target: { scrollY: 100 } });
//     expect(screen.getByTestId('menu')).toHaveClass('menu hidden');
//   });

//   test('becomes visible on scrolling up', () => {
//     render(<Menu />);
//     expect(screen.getByTestId('menu')).toHaveClass('menu');

//     fireEvent.scroll(window, { target: { scrollY: 100 } });
//     expect(screen.getByTestId('menu')).toHaveClass('menu hidden');

//     fireEvent.scroll(window, { target: { scrollY: 75 } });
//     expect(screen.getByTestId('menu')).toHaveClass('menu');
//   });
// });
