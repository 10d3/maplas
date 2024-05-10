import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-datepicker/dist/react-datepicker.css'
import { cn } from "@/lib/utils";
import Header from "@/features/layout/Header";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maplas || Home",
  description: "Find unique event & Buy your ticket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'h-full bg-background font-sans antialiased',
            inter.className
          )}
        >
          <div className="relative flex min-h-screen flex-col px-0 md:px-52 ">
            <Header />
            <div className="flex-1">
              <Providers>
                {children}
              </Providers>
            </div>
          </div>
        </body>
      </html>
    </>
  );
}
