import { auth } from '@/auth/auth'
import { EventForm } from '@/components/shared/EventForm'
import React from 'react'

export default async function CreateEvent() {

    const session = await auth();

    const userIdT = session?.user?.id

    const userId = userIdT ? userIdT : ""

    return (
        <>
            <section className=' bg-primary-50 bg-cover bg-center py-5 md:py-10'>
                <h3 className=' text-2xl text-center sm:text-left '>
                    Create Event
                </h3>
            </section>
            <div className=' my-8'>
                <EventForm userId={userId} type="Create" />
            </div>
        </>
    )
}