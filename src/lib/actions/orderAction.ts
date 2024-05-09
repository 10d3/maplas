"use server";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { prisma } from "@/db/prisma";
import { env } from "process";

export const checkoutOrder = async (order: any) => {
  console.log(order);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price_usd = order.price / 135;

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
  try {
    // await connectToDatabase();

    const newOrder = await prisma.purchase.create({
      data: {
        ...order,
        event: order.eventId,
        buyer: order.buyerId,
      },
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

export async function userTicketAssign(order: any) {
  try {
    const Tickets = await prisma.ticket.findMany({
      where: { price: order.price },
    });
    const randomIndex = Math.floor(Math.random() * Tickets.length);
    const randomTicket = Tickets[randomIndex];

    await prisma.ticket.update({
      where: { id: randomTicket.id },
      data: {
        userId: order.buyerId,
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

const Moncash = require("nodejs-moncash-sdk");

export const MonCashPayment = async (order: any) => {
  // Configuration de Moncash
  Moncash.configure({
    mode: "sandbox",
    client_id: env.ClientId,
    client_secret: env.ClientSecret,
  });

  // Création de l'objet de paiement
  const create_payment_json = {
    amount: Number(order.price),
    orderId: order.eventId,
  };

  let urlData; // Variable pour stocker l'URL de redirection

  try {
    // Création du paiement avec Moncash
    const payment_creator = Moncash.payment;
    const dataT = payment_creator.create(create_payment_json,function (error: any, payment: any) {
        if (error) {
          console.log(error);
          throw error;
        } else {
          // Si le paiement est créé avec succès, obtenir l'URL de redirection
          console.log("Create Payment Response");
          console.log(payment_creator.redirect_uri(payment));
          const redirectURL = payment_creator.redirect_uri(payment);
          console.log(redirectURL)

          // Attribuer l'URL de redirection à urlData
          urlData = payment_creator.redirect_uri(payment);
          console.log(urlData)
        }
        return urlData
      }
    );

    // La console log ici pourrait ne pas afficher l'URL car elle est asynchrone
    console.log(dataT); // Ceci peut afficher undefined car la création de paiement est asynchrone
  } catch (error) {
    console.log(error);
  }

  // Retourner l'URL de redirection (peut être undefined si la création de paiement est encore en cours)
  return urlData;
};
