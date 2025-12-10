// src/app/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

// 1. Define the props type for RootLayout
interface RootLayoutProps {
  // children is the content rendered inside the layout (e.g., page.tsx, dashboard/layout.tsx)
  children: React.ReactNode;
}

// 2. Apply the type to the component props
export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  return (
    <html lang="en">
      {/* This is a common pattern for App Router layouts where 
        you conditionally render based on the path. 
      */}
      <body>
        {/* Render children prop */}
        {children}
      </body>
    </html>
  );
}
