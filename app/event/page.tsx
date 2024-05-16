import EventLoad from '@/components/shared/EventLoad'
import React from 'react'

interface PageProps {
    searchParams: {
      q?: string | undefined,
      eventtype?: string | undefined,
      location?: string | undefined,
    }
  }

export default function page({searchParams:{q, eventtype, location}}:PageProps) {

    const filterValues = {
        q,
        eventtype,
        location,
    }

    const data = "Featured Events"
    return (
        <section className="flex min-h-screen flex-col items-center justify-between pl-10 mr-10 md:pl-24 md:pr-24 ">
            <EventLoad title={data} filterValues={filterValues} />
        </section>
    )
}
