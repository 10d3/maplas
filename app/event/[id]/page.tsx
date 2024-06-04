
import { auth } from '@/auth/auth'
import CardEvent from '@/components/shared/CardEvent'
import CheckOutButton from '@/components/shared/CheckOutButton'
import Map from '@/components/shared/Map'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/db/prisma'
import SignInButton from '@/features/auth/SignInButton'
import { getEventById, getRelatedEvents } from '@/lib/actions/eventAction'
import { formatDateTime } from '@/lib/utils'
import { SearchParamProps } from '@/types/next'
import { BadgeCheck, Calendar, LocateIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function EventDetail({ params: { id } }: SearchParamProps) {


    const session = await auth();
    const user = session?.user?.id as string;


    const event = await getEventById(id)
    const imagebla = event?.image as string
    const title = event?.name as string
    const priceStandard = Number(event?.standardTicketPrice)
    const dateS = event?.startDate as Date
    const dateE = event?.endDate as Date
    const eventTypeOf = event?.eventType as string

    const Tickets = await prisma.ticket.findMany({ where: { eventId: event?.id, status: 'available' } });
    const vipTickets = Tickets.filter(ticket => ticket.isVIPticket === true);
    const standardTickets = Tickets.filter(ticket => ticket.isVIPticket === false);
    const eventRelated = await getRelatedEvents(eventTypeOf)
    const filteredEvents = eventRelated?.filter(event => event.slug !== id);
    console.log(filteredEvents)

    const closedEvent = event?.startDate && new Date(event?.startDate) < new Date();
    const soldOut = Tickets.length == 0;
    return (
        <section className='flex flex-col min-h-auto'>
            <section className='flex justify-center bg-contain w-auto'>
                <div className=' grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
                    <Image
                        className='h-full min-h-[300px] object-cover object-center'
                        src={imagebla} alt={title} width={1000} height={1000} priority />
                    <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
                        <div className='flex flex-col gap-6'>
                            <h2 className=' font-bold text-2xl'>{event?.name}</h2>
                            <div className='flex flex-col gap-3 sm:flex-col'>
                                <div className='flex flex-row gap-1'>
                                    <div className='flex gap-2 px-auto'>
                                        <Badge className='text-[0.9rem] font-bold' variant='destructive'>
                                            {priceStandard === 0 ? "FREE" : `${event?.standardTicketPrice} Gdes`}
                                        </Badge>
                                        <Badge className='text-[0.9rem] font-bold' variant='secondary'>
                                            {event?.eventType}
                                        </Badge>
                                        {(event?.vipTicketPrice && Number(event?.vipTicketPrice) != 0) && (
                                            <Badge className='text-[0.9rem] p-2 font-bold bg-green-500 '>
                                                <BadgeCheck className='mr-2' size={15} /> {event?.vipTicketPrice} Gdes
                                            </Badge>)}
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <Badge className='text-[0.9rem] font-bold' variant='secondary'>
                                            Standard Tickets Left: {standardTickets.length}
                                        </Badge>
                                        <Badge className='text-[0.9rem] font-bold' variant='secondary'>
                                            VIP Tickets Left: {vipTickets.length}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <Link href={`/organizer/${event?.createdById}`}>
                                        <p className='ml-2 mt-2 sm:mt-0 text-[1rem] font-semibold'>
                                            Organizer :{" "} <span className=' text-primary font-bold text-[1rem]'>{event?.createdBy.name}</span>
                                        </p>
                                    </Link>
                                    {/* <Avatar>
                                        {event?.createdBy.image && (<AvatarImage src={event?.createdBy.image} alt={event?.createdBy.name?.[0]} />)}
                                        <AvatarFallback>{event?.createdBy.name?.[0]}</AvatarFallback>
                                    </Avatar> */}
                                </div>
                            </div>
                        </div>
                        {closedEvent ? (
                            <div>
                                <Button disabled>Event Close</Button>
                            </div>) : (<div>{user ? <CheckOutButton event={event} userId={user} Tickets={Tickets} /> : <div className='flex flex-col '><h1>You need to login first before you make purshase</h1><SignInButton /></div>}</div>)}
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-2 sm:gap-3'>
                                <Calendar size={25} />
                                <div className=' flex flex-wrap items-center'>
                                    <p>{formatDateTime(dateS).dateOnly} - {formatDateTime(dateS).timeOnly}</p>
                                    {/* {dateE && (<p className='ml-1'>{formatDateTime(dateE).dateOnly} -
                                        {' '} {formatDateTime(dateE).timeOnly}
                                    </p>)} */}
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <LocateIcon size={25} />
                                <p>{event?.location}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className=' font-bold text-gray-600'>Description</p>
                            <p className=''>{event?.description}</p>
                        </div>
                        <Separator />
                        <div className='w-full flex-col'>
                            <h1 className='font-semibold text-xl'>About the location:</h1>
                            <Map />
                        </div>
                    </div>
                </div>
            </section>
            <Separator className='my-4 w-full' />
            {filteredEvents?.length == 0 ? null : (
                <section className='flex flex-col gap-4 my-4 items-center w-full'>
                    <h1 className='font-bold text-2xl'>Related Events</h1>
                    <div className='flex flex-col md:flex-row items-center gap-4'>
                        {filteredEvents?.map((event) => (
                            <CardEvent key={event.id} {...event} />
                        ))}
                    </div>
                </section>)}
        </section>
    )
}
