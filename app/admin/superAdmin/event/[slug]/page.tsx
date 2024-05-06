import React from 'react'
import { auth } from '@/auth/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { prisma } from '@/db/prisma';
import { FilePenLine, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


interface UpdateEventProps {
    params: {
        slug: string
    }
}

export default async function adminSidebar({ params: { slug } }: UpdateEventProps) {

    console.log(slug)
    const event = await prisma.event.findUnique({
        where:{
            slug,
        }
    })
    return (
        <section>
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
                        <TableRow key={event?.id}>
                            <TableCell className="font-medium">
                                <Avatar className='rounded'>
                                    <AvatarFallback>
                                        {event?.name[0]}
                                    </AvatarFallback>
                                    {event?.image && <AvatarImage src={event.image} alt={event.name} />}
                                </Avatar>
                            </TableCell>
                            <TableCell>{event?.name}</TableCell>
                            <TableCell>{event?.approved ? "Approved" : "Pending"}</TableCell>
                            <TableCell className="text-right">
                                <Link href={`/admin/createdEvent/${event?.id}/update`} >Edit<Pencil size={15} className='ml-2' /></Link>
                            </TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </section>
    )
}
