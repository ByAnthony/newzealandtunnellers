"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Transition({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="fade-in">
      {children}
    </div>
  );
}
