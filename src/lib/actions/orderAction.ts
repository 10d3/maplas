"use server"

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { prisma } from '@/db/prisma';
import { env } from 'process';

export const checkoutOrder = async (order: any) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price_usd = order.price / 135;

  const price = Math.round(price_usd * 100);

  console.log(typeof price, price)
  console.log(order.price)
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.eventTitle
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}

export const createOrder = async (order: any) => {
  try {
    // await connectToDatabase();

    const newOrder = await prisma.purchase.create({
      data:{
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
      }
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY EVENT
// export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
//   try {
//     await connectToDatabase()

//     if (!eventId) throw new Error('Event ID is required')
//     const eventObjectId = new ObjectId(eventId)

//     const orders = await Order.aggregate([
//       {
//         $lookup: {
//           from: 'users',
//           localField: 'buyer',
//           foreignField: '_id',
//           as: 'buyer',
//         },
//       },
//       {
//         $unwind: '$buyer',
//       },
//       {
//         $lookup: {
//           from: 'events',
//           localField: 'event',
//           foreignField: '_id',
//           as: 'event',
//         },
//       },
//       {
//         $unwind: '$event',
//       },
//       {
//         $project: {
//           _id: 1,
//           totalAmount: 1,
//           createdAt: 1,
//           eventTitle: '$event.title',
//           eventId: '$event._id',
//           buyer: {
//             $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
//           },
//         },
//       },
//       {
//         $match: {
//           $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
//         },
//       },
//     ])

//     return JSON.parse(JSON.stringify(orders))
//   } catch (error) {
//     handleError(error)
//   }
// }

export async function getOrdersByEvent({
  searchString,
  eventId,
}: any) {
  try {
    if (!eventId) throw new Error("Event ID is required");

    const orders = await prisma.purchase.findMany({
      where: {
        eventId,
        buyer: {
          name: { contains: searchString, mode: 'insensitive' },
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


// GET ORDERS BY USER
// export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
//   try {
//     await connectToDatabase()

//     const skipAmount = (Number(page) - 1) * limit
//     const conditions = { buyer: userId }

//     const orders = await Order.distinct('event._id')
//       .find(conditions)
//       .sort({ createdAt: 'desc' })
//       .skip(skipAmount)
//       .limit(limit)
//       .populate({
//         path: 'event',
//         model: Event,
//         populate: {
//           path: 'organizer',
//           model: User,
//           select: '_id firstName lastName',
//         },
//       })

//     const ordersCount = await Order.distinct('event._id').countDocuments(conditions)

//     return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
//   } catch (error) {
//     handleError(error)
//   }
// }

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
