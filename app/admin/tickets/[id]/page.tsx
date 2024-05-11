import { auth } from '@/auth/auth'
import { prisma } from '@/db/prisma'
import { formatDateTime } from '@/lib/utils'
import { Check, CheckCheckIcon, MapPinIcon, ShareIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


interface UpdateEventProps {
  params: {
    id: string
  }
}
export default async function page({ params: { id } }: UpdateEventProps) {

  const ticket = await prisma.ticket.findUnique({ where: { id }})
  const imageB = ticket?.qrCodePath as string
  const imageE = ticket?.eventImage as string
  console.log(ticket)
  const event = await prisma.event.findUnique({
    where: { id: ticket?.eventId }, include: { createdBy: true }
  },)
  const dateS = event?.startDate as Date
  const session = await auth()

  return (
    <section className='flex items-center justify-center h-[90dvh]'>
      <div className="bg-[#6c47b8] text-white w-80 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6">
          <Image
            alt="Halloween Party"
            className=" bg-cover rounded-lg w-[320px] h-[120px]"
            height={1000}
            src={imageE}
            // style={{
            //   aspectRatio: "320/120",
            //   objectFit: "cover",
            // }}
            width={1000}
          />
          <h2 className="text-2xl font-bold mt-4 flex items-center justify-between">
            {ticket?.eventName}
            {ticket?.isVIPticket ? <span aria-label="Pumpkin" role="img">
              <CheckCheckIcon className='size-6'/>
            </span> : null}
            <ShareIcon className="size-6" />
          </h2>
          <p className="text-sm opacity-70">{event?.createdBy.name}</p>
        </div>
        <div className="bg-[#8f7ad3] p-6">
          <div className="flex justify-between items-center border-b border-dashed border-white pb-4">
            <div>
              <p className="text-xs opacity-70">Location</p>
              <p>{event?.location}</p>
            </div>
            <MapPinIcon className=' size-6' />
          </div>
          <div className="flex justify-between items-center border-b border-dashed border-white py-4">
            <div>
              <p className="text-xs opacity-70">Name</p>
              <p>{session?.user?.name}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">Date</p>
              <p>{formatDateTime(dateS).dateOnly}</p>
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div>
              <p className="text-xs opacity-70">Time</p>
              <p>{formatDateTime(dateS).timeOnly}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">Dresscode</p>
              <p>Halloween</p>
            </div>
          </div>
        </div>
        <div className="bg-[#6c47b8] p-4 flex flex-col gap-2">
          <p className="text-xs text-center opacity-70">SCAN BARCODE</p>
          <Image
            alt="Barcode"
            className=" bg-cover mx-auto w-[60px] h-[60px]"
            height={1000}
            src={imageB}
            // style={{
            //   aspectRatio: "240/60",
            //   objectFit: "cover",
            // }}
            width={1000}
          />
        </div>
      </div>
    </section>
  )
}
