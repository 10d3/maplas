import { auth } from "@/auth/auth";
import CardEvent from "@/components/shared/CardEvent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/db/prisma";
import { followUser } from "@/lib/actions/following-actions";
import Image from "next/image";

interface UpdateEventProps {
    params: {
        id: string;
    };
}
export default async function page({ params: { id } }: UpdateEventProps) {

    const session = await auth();
    const user = session?.user

    const organizer = await prisma.user.findUnique({
        where: { id },
        include: {
            events: true,
            _count: true
        }
    })

    const followers = await prisma.follower.aggregate({
        where: {
            followingId: id
        },
        _count: true
    })

    async function follow() {
        'use server'
        const followerId = user?.id;
        const followingId = id;

        try {
            const result = await followUser(followerId as string, followingId);
            console.log('Successfully followed the user:', result);
        } catch (error) {
            console.error('Error following the user:', error);
        }
    }

    const hContent = `Events by ${organizer?.name}`

    return (
        <section className=" my-16 w-full items-center flex flex-col gap-6">
            <div className="w-full md:w-2/4 flex flex-col items-center">
                <div className=" w-full flex flex-col items-center gap-2">
                    <div className="rounded-full">
                        <Image
                            src={organizer?.image as string}
                            width={100} height={100}
                            className="rounded-full"
                            alt={`image of ${organizer?.organizerName}`} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold">{organizer?.name}</h1>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-row gap-6 items-center">
                        <p className="text-xl">{organizer?._count.events} Events</p>
                        <p className="text-xl">{followers._count}{followers._count ? ' Followers' : ' Follower'}</p>

                    </div>
                    <form action={follow}>
                        <Button type="submit">Follow</Button>
                    </form>
                </div>
            </div>
            <Separator className="w-3/4 md:w-full bg-gray-400" />
            {organizer?.events?.length == 0 ? null : (
                <div className='w-full flex flex-col gap-4 my-4 items-center'>
                    <h1 className='text-2xl'>{hContent}</h1>
                    <div className='w-full flex flex-col md:flex-row flex-wrap items-center gap-4'>
                        {organizer?.events.map((event) => (
                            <CardEvent key={event.id} {...event} />
                        ))}
                    </div>
                </div>)}
        </section>
    )
}
