import React from 'react'
import { eventTypes } from "@/lib/eventTypes";
import Link from 'next/link';
import Image from 'next/image';

export default function CategorySection() {

    const eventPhotos = [
        '/categorie/icons8-concert-50.png', '/categorie/icons8-musicien-60.png',
        '/categorie/icons8-festival-50.png', '/categorie/icons8-film-60.png',
        '/categorie/icons8-danse-50.png', '/categorie/icons8-exposition-50.png',
        '/categorie/icons8-conferences-50.png', '/categorie/icons8-sportives-48.png',
        '/categorie/icons8-gastro-50.png', '/categorie/icons8-fonds-50.png',
        '/categorie/icons8-ecole-48.png', '/categorie/icons8-touristique-60.png'
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

    console.log(eventObjects)
    return (
        <section className=' w-full flex flex-col gap-4 items-center mb-10'>
            <h1 className='text-3xl font-mono' >Browrse By category</h1>
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
