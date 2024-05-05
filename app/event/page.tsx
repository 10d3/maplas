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
        <section>
            <h1>work</h1>
            <EventLoad title={data} filterValues={filterValues} />
        </section>
    )
}
