import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aeris Renewables - DevRev Revenue Protection Agent",
  description: "Interactive 5-Step Live Flow Demonstration of the Revenue Protection Agent for Aeris Renewables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
