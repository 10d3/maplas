
import LogoCarousel from "@/components/shared/CardCaroussel";
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
    page?: string
  }
}

export default function Home({ searchParams: { q, eventtype, location, page } }: PageProps) {

  const filterValues = {
    q,
    eventtype,
    location,
    page
  }
  const data = "Top Events"
  return (
    <main className="flex w-full min-h-screen my-0 py-0 flex-col items-center justify-between px-4 ">
      <Hero />
      <LogoCarousel />
      <CategorySection />
      <EventLoad title={data} filterValues={filterValues} />
    </main>
  );
}
