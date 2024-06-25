import { Separator } from "@/components/ui/separator"
import { prisma } from "@/db/prisma"
import Image from "next/image"

interface paramsProps {
    params:{
        influencerName: string
    }
}
export default async function page({params: {influencerName}}:paramsProps) {
    const influencer = await prisma.user.findUnique({
        where: {
            id: influencerName
        },
        include: {
            events: true,
            _count: true
        }
    })

    console.log(influencerName)

    // const followers = await prisma.follower.aggregate({
    //     where: {
    //         followingId: id
    //     },
    //     _count: true
    // })

    // const existingFollower = await prisma.follower.findUnique({
    //     where: {
    //         followerId_followingId: {
    //             followerId: user?.id as string,
    //             followingId: id,
    //         },
    //     },
    // });

    return (
        <section className=" my-16 w-full items-center flex flex-col gap-6 min-h-screen">
            <div className="w-full md:w-2/4 flex flex-col items-center">
                <div className=" w-full flex flex-col items-center gap-2">
                    <div className="rounded-full">
                        <Image
                            src={influencer?.image as string}
                            width={100} height={100}
                            className="rounded-full"
                            alt={`image of ${influencer?.influencerName}`} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold">{influencer?.influencerName}</h1>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-row gap-6 items-center">
                        {/* {influencer?._count.events &&
                            <p className="text-xl">
                                {influencer?._count.events}{influencer?._count.events <= 1 ? ' Event' : ' Events'}
                            </p>
                        } */}
                        {/* <p className="text-xl">{followers._count}{followers._count <= 1 ? ' Follower' : ' Followers'}</p> */}
                    </div>
                    {/* <form action={follow}>
                        {existingFollower ?
                            (<Button type="submit">Unfollow</Button>)
                            :
                            (<Button type="submit">Follow</Button>)
                        }
                    </form> */}
                </div>
            </div>
            <Separator className="w-3/4 md:w-full bg-gray-400" />
            {/* {influencer?.events?.length == 0 ? null : (
                <div className='w-full flex flex-col gap-4 my-4 items-center'>
                    <h1 className='text-2xl'>{hContent}</h1>
                    <div className='w-full flex flex-col md:flex-row flex-wrap items-center gap-4'>
                        {influencer?.events.map((event) => (
                            <CardEvent key={event.id} {...event} />
                        ))}
                    </div>
                </div>)} */}
        </section>
    )
}
