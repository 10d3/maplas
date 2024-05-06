import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
import { env } from "@/env"
import Facebook from "next-auth/providers/facebook"
import { prisma } from "../db/prisma"

// const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET}),
    Facebook({clientId: env.AUTH_FACEBOOK_ID, clientSecret: env.AUTH_FACEBOOK_SECRET})
  ],
})