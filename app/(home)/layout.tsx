import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import 'react-datepicker/dist/react-datepicker.css'
import { cn } from "@/lib/utils";
import Header from "@/features/layout/Header";
import Footer from "@/features/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maplas || Home",
  description: "Find unique event & Buy your ticket",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={cn('relative flex min-h-screen flex-col px-0', inter.className)}>
        <Header />
        <div className="flex">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
