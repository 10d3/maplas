'use client'
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { convertUnixTimestamp } from '@/lib/utils';
import {  EventProps } from '@/types/next';


export default function CardEvent({ id, slug, name, description, startDate, endDate, location, standardTicketPrice, image, standardTicketCapacity, createdById }: EventProps) {

    const imageSt = image ? image : ""
    const { dateFormat, time } = convertUnixTimestamp(startDate)

    function convertTo12HourFormat(timeString: string) {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

    const time12HourFormat = convertTo12HourFormat(time);



    return (
        <Card className='w-[300px] h-auto'>
            <CardHeader>
                <div className='w-[250px] m-auto'>
                <Image className=' w-96 h-full max-h-[260px] object-cover object-center rounded-md' width={1000} height={1000} src={imageSt} alt='dj flash' />
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle>
                    {name}
                </CardTitle>
                <CardDescription className=' line-clamp-1'>
                    {description}
                </CardDescription>
                <div className=' mt-1 mb-1 flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h2>{dateFormat}</h2>
                        <h2>{time12HourFormat}</h2>
                    </div>
                    <div className='flex justify-between'>
                        <h2>{location}</h2>
                        <Badge variant='destructive' ><h2>{standardTicketPrice} GDES</h2></Badge>
                    </div>
                </div>
            </CardContent>
            <CardFooter className=' flex justify-between'>
                <Button>Buy Now</Button>
                <Link href={`/event/${slug}`}>Read More</Link>
            </CardFooter>
        </Card>
    );
}
