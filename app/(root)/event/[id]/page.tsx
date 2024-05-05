
import { getEventById } from '@/lib/actions/eventAction'
import { formatDateTime } from '@/lib/utils'
import { SearchParamProps } from '@/types/next'
import Image from 'next/image'
import React from 'react'

export default async function EventDetail({ params: { id } }: SearchParamProps) {

    const event = await getEventById(id)
    const imagebla = event?.image as string
    const title = event?.name as string
    const priceStandard = Number(event?.standardTicketPrice)
    const dateS = event?.startDate as Date
    const dateE = event?.endDate as Date

    console.log(event)
    return (
        <section className='flex justify-center bg-contain'>
            <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
                <Image
                    className='h-full min-h-[300px] object-cover object-center'
                    src={imagebla} alt={title} width={1000} height={1000} />
                <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
                    <div className='flex flex-col gap-6'>
                        <h2 className=' font-bold'>{event?.name}</h2>
                        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                            <div className='flex gap-3 '>
                                <p className='font-bold rounded-full bg-green-500/10 text-green-700 px-5 py-2'>
                                    {priceStandard === 0 ? "FREE" : `${event?.standardTicketPrice} Gdes`}
                                </p>
                                <p className=' rounded-full px-4 py-2.5 bg-gray-500/10 text-gray-500'>{event?.eventType}</p>
                            </div>
                            <p className='ml-2 mt-2 sm:mt-0'>by{" "} <span className=' text-primary'>{event?.createdBy.name}</span></p>
                        </div>
                    </div>
                    {/* checkout button */}
                    <div className='flex flex-col gap-5'>
                        <div className='flex gap-2 sm:gap-3'>
                            <Image src='/assets/icons/calendar.svg' alt='calendar' width={32} height={32} />
                            <div className=' flex flex-wrap items-center'>
                                <p>{formatDateTime(dateS).dateOnly} - {' '}
                                    {formatDateTime(dateS).timeOnly}
                                </p>
                                {dateE && (<p className='ml-1'>{formatDateTime(dateE).dateOnly} -
                                    {' '} {formatDateTime(dateE).timeOnly}
                                </p>) }
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Image src='/assets/icons/location-grey.svg' alt='location' width={32} height={32} />
                            <p>{event?.location}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className=' font-bold text-gray-600'>Description</p>
                        <p className=''>{event?.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
