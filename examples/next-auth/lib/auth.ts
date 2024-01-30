import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'

const prisma = new PrismaClient()

async function printVerificationRequest(params: any) {
  console.log(params)
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  session: {
    strategy: 'jwt', // required for credentials
  },
  events: {
    signIn: async (message) => {
      console.log('signIn', message)
    },
  },
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
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Password',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log(credentials)
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
} as NextAuthOptions
