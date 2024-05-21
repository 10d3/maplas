
import EventLoad from "@/components/shared/EventLoad";
import Hero from "@/components/shared/Hero";
import CategorySection from "@/components/shared/multiCategorySection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PageProps {
  searchParams: {
    q?: string | undefined,
    eventtype?: string | undefined,
    location?: string | undefined,
    page?:string
  }
}

export default function Home({searchParams:{q, eventtype, location, page}}:PageProps) {

  const filterValues = {
    q,
    eventtype,
    location,
    page
}
  const data = "Top Events"
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pl-10 mr-10 md:pl-24 md:pr-24 ">
      <Hero/>
      <CategorySection />
      <EventLoad title={data} filterValues={filterValues} />
    </main>
  );
}
