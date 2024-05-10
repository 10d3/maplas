import { NextResponse } from "next/server";
import { createOrder, userTicketAssign } from "@/lib/actions/orderAction";
import { prisma } from "@/db/prisma";
import stripe from "stripe";

export const POST = async function (request: Request) {
  const body = await request.text();

  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    console.log('Missing Stripe webhook secret');
    return NextResponse.json({ message: 'Missing Stripe webhook secret' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ message: 'Webhook error', error: err }, { status: 400 });
  }

  // Get the ID and type
  const eventType = event.type;

  // Check if it's a checkout.session.completed event
  if (eventType === 'checkout.session.completed') {
    const eventData = event.data.object;
    const { id, amount_total, metadata } = eventData;

    console.log('Checkout session completed:', id, amount_total);

    // Extract relevant data from the event
    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0', // Amount is in cents, convert to dollars
      createdAt: new Date(),
    };

    // Create the order and assign tickets to the user
    const newOrder = await createOrder(order);
    await userTicketAssign(order);

    return NextResponse.json({ message: 'OK', order: newOrder });
  }

  // If the event type is not checkout.session.completed, return a success response
  return new Response('', { status: 200 });
};
