"use client"

import { usePathname } from "next/navigation";

export default function Transition({children}: Readonly<{
    children: React.ReactNode;
  }>) {
    const pathname = usePathname();
    
    return (
        <div key={pathname} className="fade-in">{children}</div>
    )
}