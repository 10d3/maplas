import { auth } from '@/auth/auth'
import { EventForm } from '@/components/shared/EventForm'
import React from 'react'

export default async function CreateEvent() {

    const session = await auth();

    const userId = session?.user?.id as string


    return (
        <>
            <section className=' bg-primary-50 bg-cover bg-center py-5 md:py-10'>
                <h3 className=' text-2xl text-center '>
                    Create Event
                </h3>
            </section>
            <div className=' my-8'>
                <EventForm eventId='' userId={userId} type="Create" />
            </div>
        </>
    )
}
