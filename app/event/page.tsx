import EventLoad from '@/components/shared/EventLoad'
import React from 'react'

interface PageProps {
    searchParams: {
      q?: string | undefined,
      eventtype?: string | undefined,
      location?: string | undefined,
      page?:string
    }
  }

export default function page({searchParams:{q, eventtype, location, page}}:PageProps) {

    const filterValues = {
        q,
        eventtype,
        location,
        page
    }

    const data = "Featured Events"
    return (
        <section className="flex min-h-screen w-full flex-col items-center justify-between px-4 md:space-x-4 mt-20 mb-10 ">
            <EventLoad title={data} filterValues={filterValues} />
        </section>
    )
}
