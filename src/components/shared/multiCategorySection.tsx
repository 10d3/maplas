import React from 'react'
import { eventTypes } from "@/lib/eventTypes";
import Link from 'next/link';

export default function CategorySection() {
  return (
    <section className=' w-full grid grid-cols-6 md:grid-cols-12 gap-4'>
        {
            eventTypes.map((eventType, index) => (
                <Link key={index} className="" href={`/event?eventtype=${eventType}`}>
                    <div>
                        <h1>{eventType}</h1>
                    </div>
                </Link>
            ))
        }
    </section>
  )
}
