import { prisma } from '@/db/prisma'
import Image from 'next/image'
import Link from 'next/link'
import CardCarou from './CardCarou'

export default async function LogoCarousel() {

    const cardData = await prisma.event.findMany({
        take: 6,
        orderBy: {
            startDate: 'desc'
        }
    })

    // for the mask [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]

    return (
        <section className="w-full inline-flex flex-nowrap overflow-hidden">
            <ul className="flex items-center justify-center md:justify-start [&_li]:px-8 [&_img]:max-w-none animate-infinite-scroll">
                {cardData.map((data, index) => (
                    <li key={index}>
                        <Link href={`/event/${data.slug}`}>
                            <CardCarou data={data}/>
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:px-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                {cardData.map((data, index) => (
                    <li key={index}>
                        <Link href={`/event/${data.slug}`}>
                            <CardCarou data={data}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}