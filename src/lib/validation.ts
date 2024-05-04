import * as z from "zod"
import { eventTypes } from "./eventTypes"


export const EventFormSchema = z.object({
    name: z.string().min(3, "Nom doit etre au moins 3 characteres").max(150),
    description: z.string().min(3, "La description doit etre au moins 3 characteres").max(400, "La description ne doit pas depasser 400 characteres"),
    eventType: z.string().min(1).refine((value) => eventTypes.includes(value), "Invalid event type"),
    date: z.date(),
    location: z.string().min(3, "Location doit etre au moins 3 characteres"),
    image: z.string(),
    vipTicketPrice: z.string().optional(),
    standardTicketPrice: z.string().optional(),
    vipTicketCapacity: z.string().optional(),
    standardTicketCapacity: z.string(),
  })