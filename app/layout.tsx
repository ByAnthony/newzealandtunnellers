import type { Metadata } from "next";
import "@/app/globals.scss";

export const metadata: Metadata = {
  title: "New Zealand Tunnellers",
  description: "Discover the history of the New Zealand Tunnellers from the formation of their company to the underground warfare during the First World War",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
