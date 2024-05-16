import React from 'react';
import CardEvent from './CardEvent';
import { Skeleton } from '../ui/skeleton';
import EventFilterSidebar from './EventFilterSidebar';
import { eventFilterValues } from '@/lib/validation';
import { prisma } from '@/db/prisma';
import Pagination from './pagination';

interface searchParams {
    q: string | undefined,
    eventtype: string | undefined,
    location: string | undefined,
    page?: string
}

export default async function EventLoad({ title, filterValues }: { title: string, filterValues: searchParams }) {

    const { q, eventtype, location, page } = filterValues;
    const pageN = page ? parseInt(page) : 1 ;
    // const pageN = page ? pageA : 1;
    console.log(pageN)
    const eventPerPage = 2
    const skip = (pageN - 1) * eventPerPage
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
            eventtype ? { eventType: eventtype } : {},
            location ? { location } : {},
            { approved: true }
        ]
    }

    const totalEventPrommise = prisma.event.count({ where })

    const eventsPromise = prisma.event.findMany({
        where,
        orderBy: {
            startDate: "desc",
        },
        take: eventPerPage,
        skip,
    });

    const [events, totalEvent] = await Promise.all([eventsPromise, totalEventPrommise])

    if (events?.length === 0 && title != "Top Events") {
        return (
            <div className="flex flex-col space-y-3 pb-6 items-center justify-center">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        )
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
                {
                    title !== "Top Events" && events.length > 0 && <Pagination currentPage={pageN} totalPage={Math.ceil(totalEvent / eventPerPage)} filterValues={filterValues} />
                }
            </div>
        </section>
    );
}
