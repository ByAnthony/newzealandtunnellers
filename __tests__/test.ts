// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { ReactElement } from 'react';
// import { BrowserRouter } from 'react-router-dom';

// export const findElementWithText = (text: string) => {
//   const elements = screen.getAllByText((content) => content.includes(text));

//   if (elements.length === 0) {
//     throw new Error(`Unable to find an element with the text: ${text}`);
//   }

//   return elements[0];
// };

// const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
//   window.history.pushState({}, 'Test page', route);
//   const user = userEvent.setup();

//   return {
//     user,
//     ...render(ui, { wrapper: BrowserRouter }),
//   };
// };

// export * from '@testing-library/react';
// export { renderWithRouter as render };
