import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'

const prisma = new PrismaClient()

async function printVerificationRequest(params: any) {
  console.log(params)
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // this doesn't handle token refresh automatically
    // @see https://next-auth.js.org/tutorials/refresh-token-rotation
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
      ...(!process.env.EMAIL_SERVER
        ? {
            sendVerificationRequest: printVerificationRequest,
          }
        : {}),
    }),
    // ...add more providers here
  ],
} as NextAuthOptions
