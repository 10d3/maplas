'use server'
import { prisma } from "@/db/prisma"
import { NewsletterSchema } from "../validation"
import { z } from "zod"

export const NewsLetterAction = async (values: z.infer<typeof NewsletterSchema>) =>{

    try {
        const Subcription = await prisma.newsletter.create({
            data: {
                email: values.email,
            }
        })
        console.log('Subcription')
        return Subcription
    } catch (error) {
        return error
    }
}