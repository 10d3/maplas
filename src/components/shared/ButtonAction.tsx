"use client"
import { Button } from '../ui/button'
import { approvalSubmission, deleteSubmission } from '@/lib/actions/eventAction'
import generateTicketsForEvent, { generateVIPTicketsForEvent } from '@/lib/ticketGenerator/ticketsGenerator';
import { Check, Pencil, Trash } from "lucide-react";

export default function ButtonAction({ eventId, text }: { eventId: string, text: string }) {

    const handlerSubmit = async (eventId:string) =>{
         await approvalSubmission(eventId)

        // if(test){
        //     await generateTicketsForEvent(eventId)
        //     await generateVIPTicketsForEvent(eventId)
        // }
    }


    if (text == "Delete") {
        return (
            <Button onClick={() => { deleteSubmission(eventId) }} variant='default' size='sm'>
                <Trash size={15} className='mr-2'/>{text}
            </Button>
        )
    }
    return (
        <Button onClick={() => { handlerSubmit(eventId) }} variant='default' size='sm'>
            <Check size={15} className='mr-2'/>{text}
        </Button>
    )
}
