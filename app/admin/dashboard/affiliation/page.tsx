import { auth } from '@/auth/auth'
import AffFormC from '@/components/shared/AffFormC'
import Influencerpage from '@/components/shared/Influencerpage'
import { Button } from '@/components/ui/button'
import { prisma } from '@/db/prisma'
import React from 'react'

export default async function page() {

  const session = await auth()

  const influencers = await prisma.user.findMany({
    where: {
      isInfluencer: true
    }
  })
  const events = await prisma.event.findMany({
    where: {
      approved: true,
      createdById: session?.user?.id
    }
  })

  return (
    <section className='w-[100%] md:w-auto flex items-center flex-col md:flex-row justify-center gap-4'>
      <div className='flex md:flex-row flex-col justify-between w-full md:w-[80%] gap-4'>
        <div className='flex w-full md:w-1/2 h-1/2 md:h-full'>
          <Influencerpage />
        </div>
        <div className='flex w-full md:w-1/2 h-1/2 md:h-full'>
          <div className='flex'>
            <AffFormC influencers={influencers} events={events} />
          </div>
        </div>
      </div>
    </section>
  )
}
