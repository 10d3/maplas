"use client"
import { Button } from '../ui/button'
import { approvalSubmission, deleteSubmission } from '@/lib/actions/eventAction'
import { Check, Pencil, Trash } from "lucide-react";

export default function ButtonAction({ eventId, text }: { eventId: string, text: string }) {

    if (text == "Delete") {
        return (
            <Button onClick={() => { deleteSubmission(eventId) }} variant='default' size='sm'>
                <Trash size={15} className='mr-2'/>{text}
            </Button>
        )
    }
    return (
        <Button onClick={() => { approvalSubmission(eventId) }} variant='default' size='sm'>
            <Check size={15} className='mr-2'/>{text}
        </Button>
    )
}
