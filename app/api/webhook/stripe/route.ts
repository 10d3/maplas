import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { createOrder, userTicketAssign } from "@/lib/actions/orderAction";
import { prisma } from "@/db/prisma";

export const POST = async function (request: Request) {
  const body = await request.text();


  const sig = request.headers.get('Stripe-Signature') as string
  if (!sig) {
    console.log('No signature')
    return NextResponse.json({ message: 'No signature' })
  }

  const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET!,{
    apiVersion: '2024-04-10',
    typescript: true
  })
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET! as string

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Webhook fail', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object

    console.log(id, amount_total)

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    }

    const newOrder = await createOrder(order)
    await userTicketAssign(order)
    return NextResponse.json({ message: 'OK', order: newOrder })
  }

  return new Response('', { status: 200 })
}
