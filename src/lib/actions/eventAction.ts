"use server";

import { prisma } from "@/db/prisma";
import { CreateEventParams } from "@/types/next";
import { toSlug } from "../utils";
import { nanoid } from "nanoid";
import { EventFormSchema } from "../validation";

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
