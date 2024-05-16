import { Card, CardContent } from '@/components/ui/card'
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { prisma } from '@/db/prisma'
import React from 'react'

export default async function page() {
  const orders = await prisma.purchase.findMany({include:{buyer:true, event:true}})
  console.log(orders)
  return (
    <div className='w-[100%] md:w-auto flex items-center flex-col justify-center gap-4'>
        <h1>Orders Details</h1>
      <Card className='w-full md:w-[80%]'>
            <CardContent>
            <Table>
                    {/* <TableCaption>A list of your Events.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Buyer Name</TableHead>
                            <TableHead>Buyer Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>{event.event.name}</TableCell>
                                <TableCell>{event?.buyer.name}</TableCell>
                                <TableCell>{event?.buyer.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}
