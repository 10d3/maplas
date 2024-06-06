import React from 'react'
import { eventTypes } from "@/lib/eventTypes";
import Link from 'next/link';
import Image from 'next/image';

export default function CategorySection() {

    const eventPhotos = [
        '/categorie/new/027-stage.svg', '/categorie/new/018-speaker.svg',
        '/categorie/new/020-fireworks.svg', '/categorie/new/021-videocamera.svg',
        '/categorie/new/039-discoball.svg', '/categorie/icons8-exposition-50.png',
        '/categorie/new/049-auditorium.svg', '/categorie/new/046-poolparty.svg',
        '/categorie/new/002-pizza.svg', '/categorie/new/032-suit.svg',
        '/categorie/new/026-invitation.svg', '/categorie/new/041-location.svg'
    ]

    const eventSplitName = [
        'Concerts', 'Musique', 'Festivals', 'Cinéma', 'Danse', 'Expositions',
        'Conférences', 'Sports', 'Gastronomie', 'Caritatifs', 'Seminaire', 'Tourisme'
    ]

    const eventObjects = eventTypes.map((type, index) => ({
        type,
        photo: eventPhotos[index],
        name: eventSplitName[index],
    }));

    return (
        <section className=' w-full flex flex-col gap-4 items-center mb-10'>
            <h1 className='text-3xl font-medium' >Browrse By category</h1>
            <div className='w-full grid grid-cols-4 md:grid-cols-12 gap-4'>
            {
                eventObjects.map((eventType, index) => (
                    <Link key={index} className="flex justify-center items-center hover:cursor-pointer" href={`/event?eventtype=${eventType.type}`}>
                        <div className='w-48 flex flex-col items-center gap-2'>
                            <Image className='w-[48px] h-[48px]' src={eventType.photo} width={1000} height={1000} alt={eventType.type} />
                            <p className='text-[0.7rem]'>{eventType.name}</p>
                        </div>
                    </Link>
                ))
            }
            </div>
        </section>
    )
}
