import { auth } from '@/auth/auth'
import AreaChartComponent from '@/components/shared/areaChart';
import AreaChart from '@/components/shared/areaChart';
import EventCard from '@/components/shared/eventCard';
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { prisma } from '@/db/prisma';
import React from 'react'

export default async function DashBoard() {
  const session = await auth();
  const user = session?.user

  const events = await prisma.event.findMany({where:{createdById : user?.id}})
  const data = [
    { date: "2023-04-01", cashIn: 1926, cashOut: 1450 },
    { date: "2023-04-02", cashIn: 2994, cashOut: 2235 },
    { date: "2023-04-03", cashIn: 5000, cashOut: 3668 },
    { date: "2023-04-04", cashIn: 8000, cashOut: 4959 },
    { date: "2023-04-05", cashIn: 12000, cashOut: 6277 },
    { date: "2023-04-06", cashIn: 11000, cashOut: 6876 },
    { date: "2023-04-07", cashIn: 4000, cashOut: 7410 },
    { date: "2023-04-08", cashIn: 7000, cashOut: 8624 },
    { date: "2023-04-09", cashIn: 12000, cashOut: 9890 },
    { date: "2023-04-10", cashIn: 16000, cashOut: 10955 },
    { date: "2023-04-11", cashIn: 17000, cashOut: 11712 },
    { date: "2023-04-12", cashIn: 18000, cashOut: 12811 },
  ];
  return (
    <div className='w-[100%] md:w-auto h-auto flex items-center flex-col justify-center gap-4 mb-6'>
      <section className='flex md:flex-row flex-col justify-between w-full md:w-[80%] gap-4'>
        <div className='flex justify-center items-center'>
          <h1>Welcome back {user?.name} </h1>
        </div>
        <div className='flex flex-row gap-2'>
          <Button className='w-[50%]'>Create new Event</Button>
          <Button className='w-[50%]'>Virement</Button>
        </div>
      </section>
      <section className='flex flex-col w-full md:w-[80%] justify-between items-center md:flex-row gap-4'>
        {/* {cardData.map((d, i) => (
          <CartData
            key={i}
            body={d.amount}
            footer={d.discription}
            icon={d.icon}
            title={d.label}
          />
        ))} */}
      </section>
      <section className='flex flex-col md:flex-row w-full justify-between items-center md:w-[80%] gap-4'>
        <Card className='w-full md:w-1/2 h-[27rem] p-0 m-0'>
            <p className="p-4 font-semibold">Overview</p>
          <CardContent className='w-full m-0 p-0 h-full'>
            <AreaChartComponent data={data} />
          </CardContent>
        </Card>
        <Card className='w-full md:w-1/2 h-[27rem]'>
          <CardContent className="flex flex-col justify-between gap-2">
            <p className="p-4 font-semibold">Recent Events list</p>
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
