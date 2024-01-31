import { authConfig } from '@/lib/auth'
import NextAuth from 'next-auth'

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
