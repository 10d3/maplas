'use server'
// Importez votre fonction de génération de QR code
import { prisma } from '@/db/prisma';
import { generateQRCode } from './qrCodeGen';
// import { v4 as uuidv4 } from 'uuid';

function generateRandomUID(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomUID = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomUID += characters.charAt(randomIndex);
  }
  return randomUID;
}


export default async function generateTicketsForEvent(eventId: string) {
  // Récupérez les données de l'événement
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      name: true,
      image: true,
      standardTicketCapacity: true,
      standardTicketPrice: true,
      vipTicketCapacity: true,
      vipTicketPrice: true
    },
  });
  console.log(event)


  if (event) {
    const { standardTicketPrice, standardTicketCapacity } = event; // Obtenez le prix du ticket et la capacité de l'événement
    const numberOfTickets = Number(standardTicketCapacity); // Utilisez la capacité de l'événement comme nombre de tickets à générer
    const ticketsPrice = Number(standardTicketPrice)


    for (let i = 0; i < numberOfTickets; i++) {
      // Générez le contenu unique du QR code pour chaque ticket
      // const ticketContent = `${eventId}_${i}`;
      const ticketContent = generateRandomUID(16);

      // Générez le QR code
      const qrCodePath = await generateQRCode(ticketContent);

      if (qrCodePath) {
        // Créez le ticket dans la base de données avec le chemin du QR code
        await prisma.ticket.create({
          data: {
            eventId,
            ticketId: ticketContent,
            price: ticketsPrice,
            qrCodePath,
            status: "available",
            eventName: event.name,    // Ajout du nom de l'événement au ticket
            eventImage: event.image || "",  // Ajout de l'image de l'événement au ticket
            // Autres champs du ticket
          }
        });
      } else {
        console.error('Erreur lors de la génération du QR code pour le ticket', i);
      }
    }
  } else {
    console.error('L\'événement avec l\'ID spécifié n\'a pas été trouvé');
  }
}

// Utilisation de la fonction pour générer les tickets pour un événement donné
// generateTicketsForEvent('test_id_prisma_event')


export async function generateVIPTicketsForEvent(eventId: string) {
  // Récupérez les données de l'événement
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  console.log(event)

  if (event) {
    const { vipTicketPrice, vipTicketCapacity }: { vipTicketPrice: string | null, vipTicketCapacity: string | null } = event; // Obtenez le prix du ticket et la capacité de l'événement
    const numberOfTickets: number | null = Number(vipTicketCapacity); // Utilisez la capacité de l'événement comme nombre de tickets à générer
    const ticketsVIPprice= Number(vipTicketPrice)


    if (numberOfTickets === null || vipTicketPrice === null) {
      throw new Error("Don't have vip tickets")
    }

    for (let i = 0; i < numberOfTickets; i++) {
      // Générez le contenu unique du QR code pour chaque ticket
      const ticketContent = generateRandomUID(18)

      // Générez le QR code
      const qrCodePath = await generateQRCode(ticketContent);

      if (qrCodePath) {
        // Créez le ticket dans la base de données avec le chemin du QR code
        await prisma.ticket.create({
            data: {
              eventId,
              isVIPticket: true,
              ticketId: ticketContent,
              price: ticketsVIPprice,
              qrCodePath,
              status: "available",
              eventName: event.name,    // Ajout du nom de l'événement au ticket
              eventImage: event.image || '',  // Ajout de l'image de l'événement au ticket
              // Autres champs du ticket
            }
            // Autres champs du ticket
        });
      } else {
        console.error('Erreur lors de la génération du QR code pour le ticket', i);
      }
    }
  } else {
    console.error('L\'événement avec l\'ID spécifié n\'a pas été trouvé');
  }
}