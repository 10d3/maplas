import { auth } from '@/auth/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { prisma } from '@/db/prisma';
import { FilePenLine, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function page() {


    const session = await auth();

    const events = await prisma.event.findMany({
        where: {
            createdById: session?.user?.id
        }
    })

    console.log(events)

    if (events.length === 0) {
        return (<section className='flex flex-col items-center h-[90dvh] justify-center gap-2'>
            <div className=' flex flex-col items-center'>
                <h1 className=' text-2xl font-semibold'>Not event created yet</h1>
                <h1 className=' text-3xlfont-bold'>Do you wanna create an event?</h1>
                <p className=' font-light'>Click the button bellow</p>
            </div>
            <Link href='/event/create' className={buttonVariants({ variant: 'default', size: 'lg' })} >Create Event</Link>
        </section>)
    }

    return (
        <section className='m-auto my-10 max-w-[40rem] md:min-w-full space-y-10 px-3 flex flex-col justify-center items-center'>
            <Table>
                <TableCaption>A list of your Events.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Approval</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events.map((event) => (
                        <TableRow key={event.id}>
                            <TableCell className="font-medium">
                                <Avatar className='rounded'>
                                    <AvatarFallback>
                                        {event.name[0]}
                                    </AvatarFallback>
                                    {event.image && <AvatarImage src={event.image} alt={event.name} />}
                                </Avatar>
                            </TableCell>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{event.approved ? "Approved" : "Pending"}</TableCell>
                            <TableCell className="text-right">
                                <Link href={`/admin/createdEvent/${event.id}/update`} >Edit<Pencil size={15} className='ml-2' /></Link>
                                </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </section>
    )
}
