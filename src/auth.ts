import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
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
        // Mock authorization for integration purposes
        if (!credentials?.email) return null;
        
        let user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });
        
        // Auto-create test users if they don't exist yet for testing the Wallet
        if (!user) {
          user = await prisma.user.create({
            data: { email: credentials.email as string, name: "Test User" }
          });
          
          await prisma.customer.create({
            data: {
              userId: user.id,
              companyName: "Test Company Inc.",
              billingProfile: {
                create: {
                  billingMode: "wallet"
                }
              },
              walletLedger: {
                create: {
                  balance: 500.00
                }
              }
            }
          })
        }
        
        return user;
      }
    }),
  ],
})
