
import Hero from "@/components/shared/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pl-10 mr-10 md:pl-24 md:pr-24 ">
      <Hero/>
    </main>
  );
}
