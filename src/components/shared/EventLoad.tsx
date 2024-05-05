import React from 'react';
import CardEvent from './CardEvent';
import { Skeleton } from '../ui/skeleton';
import EventFilterSidebar from './EventFilterSidebar';
import { eventFilterValues } from '@/lib/validation';
import { prisma } from '@/db/prisma';


// interface EventResultProps {
//     filterValues: eventFilterValues,
//     location? : string,
//     q? : string,
//     eventtype? : string,
// }
interface searchParams {
      q: string | undefined,
      eventtype: string | undefined,
      location: string | undefined,
  }

export default async function EventLoad({ title, filterValues }: { title: string, filterValues: searchParams }) {

    const { q, eventtype, location } = filterValues;
    const searchString = q?.split(" ").filter((word) => word.length > 0).join(" & ")
    const searchFilter = searchString ? {
        OR: [
            { name: { search: searchString } },
            { eventType: { search: searchString } },
            { location: { search: searchString } },
        ]
    } : {};

    const where = {
        AND: [
            searchFilter,
            eventtype ? { eventType : eventtype } : {},
            location ? { location } : {},
            { approved: true }
        ]
    }

    const events = await prisma.event.findMany({
        where,
        orderBy: {
            startDate: "desc",
        }
    });

    if (events?.length === 0) {
        return <div className="flex flex-col space-y-3 pb-6 items-center justify-center">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>;
    }

    return (
        <section className='mb-8'>
            <div className=' mb-4 flex items-center justify-center'>
                <h1 className='text-4xl' >{title}</h1>
            </div>
            <EventFilterSidebar />
            <div className='flex flex-col mt-6 justify-center items-center gap-6'>
                <div className='flex flex-col md:flex-wrap md:flex-row gap-4'>
                    {events?.map((event) => (
                        <CardEvent key={event.id} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
}
