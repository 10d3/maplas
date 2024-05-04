
import { getEventById } from '@/lib/actions/eventAction'
import { SearchParamProps } from '@/types/next'
import Image from 'next/image'
import React from 'react'

export default async function EventDetail({ params: { id } }: SearchParamProps) {

    const event = await getEventById(id)
    const imagebla = event?.image as string
    const title = event?.name as string

    console.log(event)
    return (
        <section className='flex justify-center bg-primary bg-contain'>
            <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
                <Image
                    className='h-full min-h-[300px] object-cover object-center'
                    src={imagebla} alt={title} width={1000} height={1000} />
            </div>
        </section>
    )
}
