"use server";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { prisma } from "@/db/prisma";
import { env } from "process";

export const checkoutOrder = async (order: any) => {
  console.log(order);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price_usd = Math.round(order.price / 135);

  const price = Math.round(price_usd * 100);

  console.log(typeof price, price);
  console.log(order.price);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${env.NEXT_PUBLIC_SERVER_URL}/admin/tickets`,
      cancel_url: `${env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: any) => {
  console.log(order);
  const price_Number = Math.floor(Number(order.totalAmount) * 135)
  console.log(price_Number)
  try {
    const newOrder = await prisma.purchase.create({
      data: {
        price: price_Number,
        eventId: order.eventId,
        buyerId: order.buyerId,
        createdAt: order.createdAt,
        method: order.method
      },
    });

    console.log(newOrder);
    return newOrder;
  } catch (error) {
    // Handle the error more robustly, for example:
    console.error('Error creating order:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};

export async function userTicketAssign(order: any) {

  console.log(order)

  const price_htg = Math.round(Number(order.totalAmount) * 135)
  try {
    const Tickets = await prisma.ticket.findMany({
      where: {
        eventId: order.eventId,
        price: price_htg,
        status: "available",
      },
    });
    const randomIndex = Math.floor(Math.random() * Tickets.length);
    const randomTicket = Tickets[randomIndex];

    await prisma.ticket.update({
      where: { id: randomTicket.id },
      data: {
        userId: order.buyerId,
        status: "sold",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getOrdersByEvent({ searchString, eventId }: any) {
  try {
    if (!eventId) throw new Error("Event ID is required");

    const orders = await prisma.purchase.findMany({
      where: {
        eventId,
        buyer: {
          name: { contains: searchString, mode: "insensitive" },
        },
      },
      select: {
        id: true,
        price: true,
        event: true,
        eventId: true,
        buyer: {
          select: { name: true },
        },
      },
    });

    return orders;
  } catch (error) {
    handleError(error);
  }
}

export async function getOrdersByUser({ userId, limit = 3, page }: any) {
  try {
    // Connectez-vous à la base de données (Prisma se connecte automatiquement)
    const skipAmount = (Number(page) - 1) * limit;

    // Récupérez les commandes de l'utilisateur avec Prisma
    const orders = await prisma.purchase.findMany({
      where: { buyer: userId },
      skip: skipAmount,
      take: limit,
      select: {
        id: true,
        event: {
          select: {
            id: true,
            name: true,
            // date: true,
          },
        },
      },
    });

    // Comptez le nombre total de commandes de l'utilisateur avec Prisma
    const ordersCount = await prisma.purchase.count({
      where: { buyer: userId },
    });

    // Calculez le nombre total de pages en fonction du nombre total de commandes et de la limite par page
    const totalPages = Math.ceil(ordersCount / limit);

    // Retournez les données formatées
    return { data: orders, totalPages };
  } catch (error) {
    // Gérez les erreurs
    handleError(error);
  }
}

export const PaymentStripeCreator = async (userId:any, amount:number, accountId:string)=>{
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const user = await prisma.user.findUnique({where:{id:userId}})
  const balanceTotal = user?.balance
  try {
    if (balanceTotal! < amount) {
      throw new Error('Insufficient funds')
     }
    //  const acc = await stripe.accounts.create({
    //   type: 'express',
    //   country: 'US',
    //  })
     const payout = await stripe.transfers.create({
       amount,
       currency: 'usd',
       destination: accountId,
       source_type:'bank_account'
     });
     await prisma.user.update({
      where: { id: userId },
      data: { balance: { decrement: amount } },
    });
    return payout;
  } catch (error) {
    console.error(error)
  }
}