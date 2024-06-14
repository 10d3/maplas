import { prisma } from '@/db/prisma'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

export default async function Influencerpage() {

    const influencers = await prisma.user.findMany({
        where: {
            isInfluencer: true
        }
    })

    return (
        <Card className='w-full flex flex-col md:flex-row md:flex-wrap items-center'>
            {
                influencers.map((influencer, i) => (
                    <Link href={`/influencer/${influencer.id}`} key={i}>
                        <Card className="hover:cursor-pointer shadow-md  w-56 max-w-56 h-auto transition-transform duration-300 ease-in-out hover:scale-105">
                            <Image className='rounded-t-md object-cover w-full h-full' src={influencer.image as string} width={1000} height={1000} alt={`image of ${influencer.influencerName}`} />
                            <CardContent>
                                <CardTitle>{influencer.influencerName}</CardTitle>
                            </CardContent>
                        </Card>
                    </Link>
                ))
            }
        </Card>
    )
}
