import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // this doesn't handle token refresh automatically
    // @see https://next-auth.js.org/tutorials/refresh-token-rotation
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    // }),
    // ...add more providers here
  ],
})
