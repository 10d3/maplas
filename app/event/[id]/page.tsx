
import CardEvent from '@/components/shared/CardEvent'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getEventById, getRelatedEvents } from '@/lib/actions/eventAction'
import { formatDateTime } from '@/lib/utils'
import { SearchParamProps } from '@/types/next'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default async function EventDetail({ params: { id } }: SearchParamProps) {

    const event = await getEventById(id)
    const imagebla = event?.image as string
    const title = event?.name as string
    const priceStandard = Number(event?.standardTicketPrice)
    const dateS = event?.startDate as Date
    const dateE = event?.endDate as Date
    const eventTypeOf = event?.eventType as string

    const eventRelated = await getRelatedEvents(eventTypeOf)

    console.log(event)
    return (
        <>
            <section className='flex justify-center bg-contain w-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
                    <Image
                        className='h-full min-h-[300px] object-cover object-center'
                        src={imagebla} alt={title} width={1000} height={1000} />
                    <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
                        <div className='flex flex-col gap-6'>
                            <h2 className=' font-bold text-2xl'>{event?.name}</h2>
                            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                                <div className='flex gap-3 '>
                                    <Badge className='text-[0.9rem] font-bold' variant='destructive'>
                                        {priceStandard === 0 ? "FREE" : `${event?.standardTicketPrice} Gdes`}
                                    </Badge>
                                    <Badge className='text-[0.9rem] font-bold' variant='secondary'>
                                        {event?.eventType}
                                    </Badge>
                                    {event?.vipTicketPrice && (
                                        <Badge className='text-[0.9rem] p-2 font-bold bg-green-500 '>
                                            <BadgeCheck className='mr-2' size={15} /> {event?.vipTicketPrice} Gdes
                                        </Badge>)}
                                </div>
                                <div>
                                    <p className='ml-2 mt-2 sm:mt-0 text-[1rem] font-semibold'>Organizer :{" "} <span className=' text-primary font-bold text-[1rem]'>{event?.createdBy.name}</span></p>
                                    {/* <Avatar>
                                        {event?.createdBy.image && (<AvatarImage src={event?.createdBy.image} alt={event?.createdBy.name?.[0]} />)}
                                        <AvatarFallback>{event?.createdBy.name?.[0]}</AvatarFallback>
                                    </Avatar> */}
                                </div>
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
                                    </p>)}
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
            <Separator className='my-4 w-full' />
            <section className='flex flex-col md:flex-row gap-4 my-4 items-center w-full'>
                <h1 className='font-bold text-2xl'>Related Events</h1>
                <div className='flex flex-col md:flex-row items-center gap-4'>
                    {eventRelated?.map((event) => (
                        <CardEvent key={event.id} {...event} />
                    ))}
                </div>
            </section>
        </>
    )
}
