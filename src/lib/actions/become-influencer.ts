'use server'

import { auth } from "@/auth/auth"
import { prisma } from "@/db/prisma"
import { z } from "zod"
import { InfluencerSchema } from "../validation"

export const influencer = async (values:z.infer<typeof InfluencerSchema>) => {
    const session = await auth()
    if(!session?.user){
        throw new Error("You must be logged in to access this feature")
    }
    try {
        const result = await prisma.user.update({
            where:{id: session?.user?.id},
            data:{
                influencerName: values.influencerName,
                isInfluencer: true
            }
        })
        return result
    } catch (error) {
        return error
    }
}