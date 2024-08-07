import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter";
import Facebook from "next-auth/providers/facebook";
import { prisma } from "../db/prisma";


const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "/logo/logo-04.png",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    GitHub
  ],
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : ".localhost",
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        // @ts-expect-error
        id: token.sub,
        // @ts-expect-error
        username: token?.user?.username || token?.user?.gh_username,
      };
      return session;
    },
  },
});


// import { getServerSession, type NextAuthOptions } from "next-auth";
// import { authOptions } from "./authOptions"; // Ensure the correct path

// export async function getSession() {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return null;
//   }

//   const { id, name, username, email, image } = session.user as {
//     id: string;
//     name: string;
//     username: string;
//     email: string;
//     image: string;
//   };

//   return {
//     user: {
//       id,
//       name,
//       username,
//       email,
//       image,
//     },
//   };
// }
