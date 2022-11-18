import { Session } from 'next-auth'
import type { NextComponentType, NextPageContext } from 'next'
import type { NextRouter } from 'next/router'

import { SaasProvider } from '@saas-ui/react'
import { NextAuthProvider } from '../context/AuthProvider'

export interface AppRenderProps {
  pageProps: { session: Session; [key: string]: any }
  err?: Error
  Component: NextComponentType<NextPageContext, AppRenderProps, object>
  router: NextRouter
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppRenderProps) {
  return (
    <NextAuthProvider session={session}>
      <SaasProvider>
        <Component {...pageProps} />
      </SaasProvider>
    </NextAuthProvider>
  )
}
