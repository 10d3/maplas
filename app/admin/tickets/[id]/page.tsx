import { prisma } from '@/db/prisma'
import React from 'react'


interface UpdateEventProps {
    params: {
        id: string
    }
}
export default async function page({ params: { id } }: UpdateEventProps) {

    const ticket = await prisma.ticket.findUnique({where:{id}})

  return (
    <div>{ticket?.id}</div>
  )
}
