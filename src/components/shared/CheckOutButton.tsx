"use client"
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { checkOutSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkOutValues } from '../constants'
import SelectCustom from '../ui/SelectCustom'
import { checkoutOrder } from '@/lib/actions/orderAction'
import { Loader } from '../ui/loader'
import { loadStripe } from '@stripe/stripe-js';
import { prisma } from '@/db/prisma'

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckOutButton({ userId, event, Tickets }: { userId: string, event: any, Tickets:any }) {

    // const soldOut = Tickets.length == 0;
    const soldOut = false;

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

    // console.log(event)

    const priceD = Number(event.vipTicketPrice) == 0 ? ['Ticket Standard'] : ['Ticket Standard', 'Ticket VIP']
    const methodPP = ['MonCash', 'Card']


    const initiaValues = checkOutValues
    const form = useForm<z.infer<typeof checkOutSchema>>({
        resolver: zodResolver(checkOutSchema),
        defaultValues: initiaValues
    })

    async function onSubmit(values: z.infer<typeof checkOutSchema>) {
        const price = values.choiceP == 'Ticket Standard' ? Number(event.standardTicketPrice) : Number(event.vipTicketPrice);
        // console.log(values.methodPay)
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
            // console.log(price)
            // const Tickets = await prisma.ticket.findMany({ where: { eventId : event.id, price, status:'available' } });
            const randomIndex = Math.floor(Math.random() * Tickets.length)
            const randomTicket = Tickets[randomIndex].price = price ? Tickets[randomIndex] : Tickets[randomIndex + 1]
            // console.log(randomTicket)
            try {
                const response = await fetch('/api/payment/test/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: price,
                        orderId: randomTicket.id,
                    }),
                });

                const data = await response.json();
                // console.log('Payment created:', data);
                if (data.redirect) { // Check for redirect property in response
                    window.location.href = data.redirect.destination; // Redirect the user
                } else {
                    console.error('Failed to retrieve redirect URL');
                    // Handle cases where redirect URL is not available
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
                { soldOut ? <Button disabled size='lg' className=' w-full my-2 bg-green-600'>Sold Out</Button> : <Button disabled={form.formState.isSubmitting} role='link' size='lg' className=' w-full my-2 bg-green-600'> {form.formState.isSubmitting ? <Loader /> : " Pay Now"}</Button>}
            </form>
        </Form>
    )
}