import { SaasProvider } from '@saas-ui/react'
/**
 * Importing this from /src since Next.js has difficulties detecting ESM support.
 * Make sure to add `@saas-ui/clerk` to `transpilePackages` in `next.config.js`
 */
import { ClerkAuthProvider } from '@saas-ui/clerk/src'
import { AuthProvider } from '@saas-ui/auth'
import { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ClerkAuthProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {({ authService }) => (
        <SaasProvider>
          <AuthProvider {...authService}>
            <Component {...pageProps} />
          </AuthProvider>
        </SaasProvider>
      )}
    </ClerkAuthProvider>
  )
}
