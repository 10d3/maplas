
import { auth } from "@/auth/auth";
import CardEvent from "@/components/shared/CardEvent";
import { prisma } from "@/db/prisma";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import ButtonAction from "@/components/shared/ButtonAction";
import { getOrdersByUser } from "@/lib/actions/orderAction";

export default async function AdminPage({ searchParams }: any) {
    const session = await auth();

    const userId = session?.user?.id as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;

    // const orders = await getOrdersByUser({ userId, page: ordersPage })

    // const orderedEvents = orders?.data.map((order: any) => order.event) || [];
    //   const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

    const tickets = await prisma.ticket.findMany({
        where: { userId, },
    })

    console.log(tickets[0].qrCodePath)

    if (!userId) {
        return (<h1>va la bas</h1>)
    }

    if (tickets.length == 0) {
        return (
            <section className="flex items-center justify-center">
                <h1>No ticket Yet</h1>
            </section>
        )
    }

    return (
        <main className="m-auto my-10 max-w-[40rem] md:min-w-full space-y-10 px-3 flex flex-col justify-center items-center">
            <h1 className="text-center"> Tickets </h1>
            <h1>Liste de mes Tickets</h1>
            <section>
                <Table>
                    {/* <TableCaption>A list of your Events.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Full Detaild</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell className="font-medium">
                                    <Avatar className='rounded'>
                                        <AvatarFallback>
                                            {event.eventName[0]}
                                        </AvatarFallback>
                                        {event.qrCodePath && <AvatarImage src={event.qrCodePath} alt={event.eventName} />}
                                    </Avatar>
                                </TableCell>
                                <TableCell>{event.eventName}</TableCell>
                                <TableCell><Link href={`/admin/tickets/${event.id}`}>See More</Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </section>
        </main>
    );
}