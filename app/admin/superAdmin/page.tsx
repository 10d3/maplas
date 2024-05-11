
import { auth } from "@/auth/auth";
import CardEvent from "@/components/shared/CardEvent";
import { prisma } from "@/db/prisma";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import ButtonAction from "@/components/shared/ButtonAction";
import AdminSidebar from "./event/[slug]/AdminSidebar";

export default async function AdminPage() {
    const unapprovedEvents = await prisma.event.findMany({
        where: { approved: false },
        include: {
            createdBy: true,
        }
    });

    console.log(unapprovedEvents)
    const session = await auth();

    const user = session?.user?.id;

    const userPri = await prisma.user.findUnique({
        where: { id: user },
        select: { superAdmin: true }
    })


    if (!user || !userPri?.superAdmin) {
        return (<h1>va la bas</h1>)
    }

    return (
        <main className="m-auto my-10 max-w-[90%] md:max-w-[40rem] md:min-w-full space-y-10 px-3 flex flex-col justify-center items-center">
            <h1 className="text-center"> SuperAdmin Dashboard</h1>
            <h1>Liste d&apos;evennement en attente d&apos;etre approuver</h1>
            {/* <section className="flex flex-col gap-3">
                <h2 className="text-lg font-bold">Unapproved Events:</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    {unapprovedEvents.map((event) => (
                        <Link key={event.id} href={`/admin/superAdmin/event/${event.slug}`} className="block">
                            <CardEvent {...event} />
                        </Link>
                    ))}
                    {unapprovedEvents.length === 0 && (
                        <p className="text-muted-foreground">No unapproved Events</p>
                    )}
                </div>
            </section> */}
            <section>
                <Table>
                    {/* <TableCaption>A list of your Events.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Organizer Name</TableHead>
                            <TableHead>Full Detaild</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {unapprovedEvents.map((event) => (
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
                                <TableCell>{event.createdBy.name}</TableCell>
                                <TableCell><Link href={`/admin/superAdmin/event/${event.slug}`}>See More</Link></TableCell>
                                <TableCell className="text-right flex flex-col gap-2">
                                    {/* {/* <ButtonAction eventId={event.id} text="Approve" /> */}
                                    {/* <ButtonAction eventId={event.id} text="Delete" /> */}
                                    <AdminSidebar event={event}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </section>
        </main>
    );
}