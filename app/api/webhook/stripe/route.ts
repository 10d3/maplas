import { NextResponse } from "next/server";
import { createOrder, userTicketAssign } from "@/lib/actions/orderAction";
import { prisma } from "@/db/prisma";
import stripe from "stripe";

export const POST = async function (request: Request) {
  const body = await request.text();

  const sig = request.headers.get('Stripe-Signature') as string;
  if (!sig) {
    console.log('No signature');
    return NextResponse.json({ message: 'No signature' });
  }

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
  if (!endpointSecret) {
    console.log('Missing Stripe webhook secret');
    return NextResponse.json({ message: 'Missing Stripe webhook secret' }, { status: 400 });
  }

  let event: stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log('Webhook signature verification failed:', err);
    return NextResponse.json({ message: 'Webhook signature verification failed', error: err }, { status: 400 });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object;

    console.log(id, amount_total);

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);
    await userTicketAssign(order);
    return NextResponse.json({ message: 'OK', order: newOrder });
  }

  return new Response('', { status: 200 });
};
