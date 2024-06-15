// import "@testing-library/jest-dom";
// import { render, screen } from "@testing-library/react";

// import { findElementWithText } from "../../utils/test";
// import { mockId } from "../../mocks/mockProfile";
// import { mockSummary } from "../../mocks/mockSummary";
// import { mockTitle } from "../../mocks/mockArticle";
// import { mockToday } from "../../mocks/mockToday";

// import { HowToCite } from "../../../app/components/HowToCite/HowToCite";

// describe("HowToCite for Profile", () => {
//   const component = (
//     <HowToCite id={mockId} summary={mockSummary} today={mockToday} />
//   );

//   test("renders the component correctly", () => {
//     const { asFragment } = render(component);

//     expect(asFragment()).toMatchSnapshot();
//   });

//   describe("Name", () => {
//     test("renders name correctly", () => {
//       render(component);

//       const element = findElementWithText("“John Doe (1888-1975)“");

//       expect(element).toBeInTheDocument();
//     });
//   });

//   describe("Dates", () => {
//     test("renders birth and death dates when known", () => {
//       render(component);

//       const element = findElementWithText("“John Doe (1888-1975)“");

//       expect(element).toBeInTheDocument();
//     });

//     test("renders only birth date when death date unknown", () => {
//       const mockComponent = (
//         <HowToCite
//           id={mockId}
//           summary={{ ...mockSummary, death: null }}
//           today={mockToday}
//         />
//       );
//       render(mockComponent);

//       const element = findElementWithText("“John Doe (1888-†?)“");

//       expect(element).toBeInTheDocument();
//     });
//   });

//   describe("URL", () => {
//     test("renders the url with correct id", () => {
//       render(component);

//       const element = findElementWithText("www.nztunnellers.com/tunnellers/26");

//       expect(element).toBeInTheDocument();
//     });
//   });
// });

// describe("HowToCite for Article", () => {
//   const component = <HowToCite title={mockTitle} today={mockToday} />;

//   test("renders the component correctly", () => {
//     const { asFragment } = render(component);

//     expect(asFragment()).toMatchSnapshot();
//     expect(screen.getByText(/How to cite this page/)).toBeInTheDocument();
//     expect(screen.getByText(/My Awesome Article Title/)).toBeInTheDocument();
//     expect(screen.getByText(/4 May 2023/)).toBeInTheDocument();
//     expect(
//       screen.getByText(
//         /www.nztunnellers.com\/history\/my-awesome-article-title./,
//       ),
//     ).toBeInTheDocument();
//   });
// });

// describe("HowToCite for Timeline", () => {
//   const component = (
//     <HowToCite id={mockId} summary={mockSummary} today={mockToday} timeline />
//   );

//   test("renders the component correctly", () => {
//     const { asFragment } = render(component);

//     expect(asFragment()).toMatchSnapshot();
//     expect(screen.getByText(/How to cite this page/)).toBeInTheDocument();
//     expect(screen.getByText(/World War I Timeline of/)).toBeInTheDocument();
//     expect(screen.getByText(/John Doe/)).toBeInTheDocument();
//     expect(screen.getByText(/4 May 2023/)).toBeInTheDocument();
//     expect(
//       screen.getByText(/www.nztunnellers.com\/tunnellers\/26\/wwi-timeline./),
//     ).toBeInTheDocument();
//   });
// });
