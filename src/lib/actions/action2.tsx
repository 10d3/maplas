'use server'
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import generateTicketsForEvent, { generateVIPTicketsForEvent } from "../ticketGenerator/ticketsGenerator";

type FormState = { error?: string } | undefined;

export async function approveSubmission(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
  try {
    const eventId = formData.get("jobId") as string;

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
    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
  redirect('/admin/superAdmin')
}

export async function deleteEvent(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const eventId = formData.get("jobId") as string;

    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    revalidatePath("/");

  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }

  redirect("/admin/superAdmin");
}