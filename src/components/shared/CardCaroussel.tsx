import { prisma } from '@/db/prisma'
import Link from 'next/link'
import CardCarou from './CardCarou'
import BlogCard from './BlogCard'

export default async function LogoCarousel({ type, }: { type: string }) {


    const cardData = await prisma.event.findMany({
        take: 6,
        orderBy: {
            startDate: 'desc'
        }
    })

    const blogData = [
        {
            title: 'Blog 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            title: 'Blog 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
    ]

    // for the mask [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]

    return (
        <section className=" w-full flex flex-col mb-16">
            <div>
                <h1 className="text-3xl mb-4">{type == 'event' ? 'Upcoming Events' : 'Latest Blogs'}</h1>
            </div>
            <div className='w-full inline-flex flex-nowrap overflow-hidden'>
                <ul className="flex items-center justify-center md:justify-start [&_li]:px-8 [&_img]:max-w-none animate-infinite-scroll">
                    {type == 'event' ? cardData.map((data: any, index: number) => (
                        <li key={index}>
                            <Link href={`/event/${data.slug}`}>
                                <CardCarou data={data} />
                            </Link>
                        </li>
                    )) : blogData.map((data, i) => (
                        <li key={i}>
                            <Link href={`/event/${data.title}`}>
                                <BlogCard data={data} />
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="flex items-center justify-center md:justify-start [&_li]:px-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                    {type == 'event' ? cardData.map((data: any, index: number) => (
                        <li key={index}>
                            <Link href={`/event/${data.slug}`}>
                                <CardCarou data={data} />
                            </Link>
                        </li>
                    )) : blogData.map((data, i) => (
                        <li key={i}>
                            <Link href={`/event/${data.title}`}>
                                <BlogCard data={data} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}