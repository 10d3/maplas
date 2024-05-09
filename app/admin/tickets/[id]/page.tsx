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
  const event = await prisma.event.findUnique({where:{id: ticket?.eventId}})

  return (
    <section>
      <div>{ticket?.ticketId}</div>
    </section>
  )
}
