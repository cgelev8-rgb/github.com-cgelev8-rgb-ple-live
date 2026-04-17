import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"
import prisma from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "cc5e2e92c2a380ec29fdc69e449f338b961ba58bea0c95e8d3f345b9b9c9f2b",
  trustHost: true,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  providers: [
    Credentials({
      name: "Portal Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        // Deny login if user doesn't exist or has no password set
        if (!user || !user.password) return null;

        // Verify the submitted password against the stored bcrypt hash
        const isValid = await compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return user;
      }
    }),
  ],
})
