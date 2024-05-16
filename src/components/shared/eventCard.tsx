
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Calendar, DollarSign, TicketCheck } from "lucide-react";


export default function EventCard({ event }: any) {

    return (
        <div className="  flex flex-wrap justify-between gap-3 ">
            <section className="flex items-center justify-between gap-3 ">
                <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
                    <Avatar className='rounded'>
                        <AvatarFallback>
                            {event.name[0]}
                        </AvatarFallback>
                        {event.image && <AvatarImage src={event.image} alt={event.name} />}
                    </Avatar>
                </div>
                <div className="text-sm">
                    <p>{event.name}</p>
                    <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
                        <p className=" line-clamp-[1/2]">{event.location}</p>
                    </div>
                </div>
            </section>
            {/* <section className="flex flex-col md:flex-row gap-3">
                <div className="flex flex-col items-center">
                    <DollarSign size={15}/>
                    <p>1000</p>
                </div>
                <div className=" hidden md:flex flex-col items-center">
                    <Calendar size={15}/>
                    <p>date</p>
                </div>
                <div className=" hidden md:flex flex-col items-center">
                    <TicketCheck size={15}/>
                    <p>300</p>
                </div>
            </section> */}
        </div>
    );
}