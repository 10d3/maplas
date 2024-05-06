
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { auth } from '@/auth/auth';
import { SignOutButton } from '@/features/auth/SignOutButton';
import { prisma } from '@/db/prisma';
import { LayoutDashboard, LockKeyhole, Settings2, SquareGanttChart } from 'lucide-react';

export default async function AccountPage() {
    const session = await auth();
    const user = session?.user;
    console.log(user)


    const userPri = await prisma.user.findUnique({
        where: { id: user?.id },
        select: { superAdmin: true }
    })

    const isSuperAdmin: boolean | undefined = userPri?.superAdmin

    const events = await prisma.event.findMany({
        where: {
            createdById: user?.id
        }
    })

    const tickets = await prisma.ticket.findMany({
        where: {
            userId: user?.id
        }
    })


    if (!session) {
        throw new Error("no session found");
    }

    return (
        <main className='md:flex md:justify-center'>
            <Card className='mx-5 md:mx-24 min-w-lg mt-20 md:w-[450px]  '>
                <CardHeader className='flex flex-row gap-4'>
                    <Avatar>
                        <AvatarFallback>
                            {session.user?.name?.[0]}
                        </AvatarFallback>
                        {session.user?.image && (<AvatarImage src={session.user.image} alt={session.user.name ?? "user image"} />)}
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                        <CardTitle>{session?.user?.name}</CardTitle>
                        <CardDescription>{session?.user?.email}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className='flex flex-col gap-2'>
                    <Link href='/admin/setting' className={buttonVariants({ variant: "outline", size: "lg" })}>
                        <Settings2 className='mr-2' size={15} />Setting</Link>
                    <Link href='admin/createdEvent' className={buttonVariants({ variant: "outline", size: 'lg' })}>
                        <SquareGanttChart className='mr-2' size={15} /> Created Event
                    </Link>
                    {isSuperAdmin != false && <Link href='admin/superAdmin' className={buttonVariants({ variant: "outline", size: 'lg' })}>
                        <LockKeyhole size={15} className='mr-2' /> Super Admin</Link>}
                    {<Link href='admin/dashboard' className={buttonVariants({ variant: "outline", size: 'lg' })}>
                        <LayoutDashboard className='mr-2' size={15} />DashBoard
                    </Link>}
                    {tickets.length != 0 && <Link href='/tickets' className={buttonVariants({ variant: "outline", size: 'lg' })}>Mes Tickets</Link>}
                </CardContent>
                <CardFooter className='flex flex-row-reverse'>
                    <SignOutButton />
                </CardFooter>
            </Card>
        </main>
    )
}