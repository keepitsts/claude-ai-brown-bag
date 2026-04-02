import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Sidebar } from "@/components/sidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trailhead — Federal Lands Daily Briefing",
  description: "Daily briefing tool for federal lands across the United States",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex h-full font-sans">
        <Providers>
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-muted/30">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
