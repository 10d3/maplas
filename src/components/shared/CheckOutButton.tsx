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
import { Loader } from '../ui/loader'
import { loadStripe } from '@stripe/stripe-js';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckOutButton({ userId, event }: { userId: string, event: any }) {

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

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
        if (values.methodPay == 'Card') {
            console.log(price)
            const order = {
                price: price,
                eventTitle: event.name,
                eventId: event.id,
                buyerId: userId,
            }
            await checkoutOrder(order);
        } else {
            try {
                const response = await fetch('/api/payment', { // Correction de l'URL de l'API
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: price,
                        orderId: event.name + event.id,
                    }),
                });

                const data = await response.json();
                console.log('Payment created:', data);
                if (data.redirect) { // Vérifiez si la propriété de redirection est présente dans la réponse
                    console.log(data.redirect);
                    window.location.href = data.redirect.destination; // Rediriger l'utilisateur
                } else {
                    console.error('Failed to retrieve redirect URL');
                    // Gérer les cas où l'URL de redirection n'est pas disponible
                }
            } catch (error) {
                console.error('Error creating payment:', error);
            }
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
                <Button disabled={form.formState.isSubmitting} role='link' size='lg' className=' w-full my-2 bg-green-600'> {form.formState.isSubmitting ? <Loader /> : " Pay Now"}</Button>
            </form>
        </Form>
    )
}