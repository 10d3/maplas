"use server";

import { prisma } from "@/db/prisma";
import { CreateEventParams, CreateEventParams2 } from "@/types/next";
import { toSlug } from "../utils";
import { nanoid } from "nanoid";
import { EventFormSchema } from "../validation";
import generateTicketsForEvent, { generateVIPTicketsForEvent } from "../ticketGenerator/ticketsGenerator";

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  const {
    name,
    description,
    eventType,
    startDate,
    endDate,
    location,
    image,
    vipTicketPrice,
    standardTicketPrice,
    vipTicketCapacity,
    standardTicketCapacity,
  } = EventFormSchema.parse(event);

  const slug: string = `${toSlug(event.name)}-${nanoid(10)}`;

  try {
    const newEvent = await prisma.event.create({
      data: {
        name: name.trim(),
        slug: slug,
        description: description.trim(),
        eventType,
        startDate,
        endDate,
        location,
        image,
        vipTicketPrice,
        standardTicketPrice,
        vipTicketCapacity,
        standardTicketCapacity,
        createdById: userId,
      },
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(error);
  }
};

export const getEventById = async (id: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        slug: id,
      },
      include: {
        createdBy: true,
      },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  } catch (error) {
    console.log(error);
  }
};

export const updateEvent = async ({
  userId,
  event,
  eventId,
  path,
}: CreateEventParams2) => {
  const event1 = EventFormSchema.parse(event);
  try {
    const updateEvent1 = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...event1,
        createdById: userId,
      },
    });
    return JSON.parse(JSON.stringify(updateEvent1));
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedEvents = async (eventTypeOf: string) => {
  try {
    const relatedEvent = await prisma.event.findMany({
      take:3,
      where: {
        eventType: eventTypeOf,
        approved: true,
      },
    });

    return relatedEvent;
  } catch (error) {
    console.log(error);
  }
};

export const approvalSubmission = async (eventId: string) => {
  console.log(eventId);
  try {
    await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        approved: true,
      },
    });

    await generateTicketsForEvent(eventId);
    await generateVIPTicketsForEvent(eventId);
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteSubmission = async (eventId: string) => {
  try {
    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};
