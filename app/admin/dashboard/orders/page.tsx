import { auth } from '@/auth/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { prisma } from '@/db/prisma'
import React from 'react'

export default async function page() {
    const session = await auth();
    const userId = session?.user?.id
    const orders = await prisma.purchase.findMany({ include: { buyer: true, event: true } })
    const ordersFilter = orders.filter((order)=> order.event.createdById === userId)

    return (
        <div className='w-[100%] md:w-auto flex items-center flex-col justify-center gap-4'>
            <h1>Orders Details</h1>
            <Card className='w-full md:w-[80%]'>
                <CardContent>
                    <Table>
                        <TableCaption>A list of your orders.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Buyer Name</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Buyer Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ordersFilter.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.event.name}</TableCell>
                                    <TableCell>{order?.buyer.name}</TableCell>
                                    <TableCell>{order?.method}</TableCell>
                                    <TableCell>{order?.buyer.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
