"use client"
import { FormEvent, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { checkOutSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkOutValues } from '../constants'
import { Input } from '../ui/input'
import SelectCustom from '../ui/SelectCustom'
import { prisma } from '@/db/prisma'
import { eventTypes } from '@/lib/eventTypes'
import { checkoutOrder } from '@/lib/actions/orderAction'

export default function CheckOutButton({ userId, event }: { userId: string, event: any }) {

    console.log(event)

    const priceD = Number(event.vipTicketPrice) == 0 ? ['Ticket Standard'] : ['Ticket Standard', 'Ticket VIP']
    const methodPP = ['MonCash', 'Card']


    const initiaValues = checkOutValues
    const form = useForm<z.infer<typeof checkOutSchema>>({
        resolver: zodResolver(checkOutSchema),
        defaultValues: initiaValues
    })

    async function onSubmit(values: z.infer<typeof checkOutSchema>) {
        const price = values.choiceP == 'Ticket Standard' ? Number(event.standardTicketPrice) : Number(event.vipTicketPrice);
        console.log(values.methodPay)
        if(values.methodPay == 'Card'){
            console.log(price)
            const order = {
                price: price,
                eventTitle: event.name,
                eventId: event.id,
                buyerId: userId,
            }
            await checkoutOrder(order);
        }else{
            console.log('MonCash')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} method='post'>
                <div className='flex flex-col md:flex-row gap-2'>
                    <FormField
                        control={form.control}
                        name="choiceP"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                {/* <FormLabel>Event Description</FormLabel> */}
                                <FormControl>
                                    <SelectCustom {...field} defaultValue=''>
                                        <option value='' hidden>Type ticket</option>
                                        {priceD.map(eventTyp => (
                                            <option key={eventTyp} value={eventTyp}>{eventTyp}</option>
                                        ))}
                                    </SelectCustom>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="methodPay"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                {/* <FormLabel>Event Description</FormLabel> */}
                                <FormControl>
                                    <SelectCustom {...field} defaultValue=''>
                                        <option value='' hidden>Methode de Paiment</option>
                                        {methodPP.map(eventTyp => (
                                            <option key={eventTyp} value={eventTyp}>{eventTyp}</option>
                                        ))}
                                    </SelectCustom>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button  role='link' size='lg' className=' w-full my-2 bg-green-600'>Pay Now</Button>
            </form>
        </Form>
    )
}