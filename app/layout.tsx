import type { Metadata } from "next";
import { Suspense } from "react";

import { Footer } from "@/components/Footer/Footer";
import { MenuContainer } from "@/components/Menu/MenuContainer";

import "./globals.scss";
import "./transition.css";
import Transition from "@/components/Transition";

export const metadata: Metadata = {
  title: "New Zealand Tunnellers",
  description:
    "Discover the history of the New Zealand Tunnellers from the formation of their company to the underground warfare during the First World War",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<p>Loading...</p>}>
          <Transition>
            <MenuContainer />
            {children}
            <Footer />
          </Transition>
        </Suspense>
      </body>
    </html>
  );
}
