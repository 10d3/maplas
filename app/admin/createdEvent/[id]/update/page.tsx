import { auth } from '@/auth/auth'
import { EventForm } from '@/components/shared/EventForm'
import { prisma } from '@/db/prisma';
import { UpdateEventParams } from '@/types/next';
import React from 'react'


interface UpdateEventProps {
    params: {
        id: string
    }
}
export default async function page({ params: { id } }: UpdateEventProps) {

    console.log(id);
    const session = await auth();

    const userId = session?.user?.id as string

    const event = await prisma.event.findUnique({
        where: {
            id: id,
        }
    })

    const EventB = {
        id: event?.id as string,
        name: event?.name as string,
        description: event?.description as string,
        eventType: event?.eventType as string,
        startDate: event?.startDate as Date,
        endDate: event?.endDate as Date,
        location: event?.location as string,
        image: event?.image as string,
        vipTicketPrice: event?.vipTicketPrice ? event.vipTicketPrice : "0" as string,
        standardTicketPrice: event?.standardTicketPrice ? event.standardTicketPrice : '0' as string,
        vipTicketCapacity: event?.vipTicketCapacity ? event.vipTicketCapacity : '0' as string,
        standardTicketCapacity: event?.standardTicketCapacity ? event.standardTicketCapacity : '0' as string,
    }

    return (
        <>
            <section className=' bg-primary-50 bg-cover bg-center py-5 md:py-10'>
                <h3 className=' text-2xl text-center sm:text-left '>
                    Update Event
                </h3>
            </section>
            <div className=' my-8'>
                <EventForm userId={userId} type="Update" eventId={event?.id} event={EventB} />
            </div>
        </>
    )
}
