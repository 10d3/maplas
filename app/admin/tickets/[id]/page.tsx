import { prisma } from '@/db/prisma'
import Image from 'next/image'
import React from 'react'


interface UpdateEventProps {
  params: {
    id: string
  }
}
export default async function page({ params: { id } }: UpdateEventProps) {

  const ticket = await prisma.ticket.findUnique({ where: { id } })
  const imageB = ticket?.qrCodePath as string
  const imageE = ticket?.eventImage as string
  console.log(ticket)
  const event = await prisma.event.findUnique({where:{id: ticket?.eventId}})

  return (
    <section>
      <div className="bg-purple-600 text-white p-8">
      <Image className='w-auto max-h-[16rem] rounded-lg' src={imageE} width={1000} height={1000} alt={`qrcode of ${ticket?.eventName}`}/>
      <div className="bg-black p-4">
        <h1 className="text-3xl font-bold">{ticket?.eventName} 🎃</h1>
        <p>{ticket?.isVIPticket}</p>
      </div>
      <div className="p-4">
        <p> {ticket?.price} </p>
        <p>{ticket?.status}</p>
      </div>
      <div className="p-4">
        <Image className='w-[42px] h-[42px]' src={imageB} width={1000} height={1000} alt={`qrcode of ${ticket?.eventName}`}/>
      </div>
    </div>
    </section>
  )
}
