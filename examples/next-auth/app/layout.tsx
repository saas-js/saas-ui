import { NextAuthProvider } from '@/context/AuthProvider'
import { ModalsProvider, SaasProvider } from '@saas-ui/react'
import { authConfig } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { ColorModeScript } from '@chakra-ui/react'

import { cookies } from 'next/headers'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()

  const colorMode = (cookieStore.get('chakra-ui-color-mode')?.value ??
    'dark') as 'light' | 'dark'

  const session = await getServerSession(authConfig)

  return (
    <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <body className={`chakra-ui-${colorMode}`}>
        <SaasProvider>
          <ModalsProvider>
            <ColorModeScript initialColorMode={colorMode} type="cookie" />
            <NextAuthProvider session={session}>{children}</NextAuthProvider>
          </ModalsProvider>
        </SaasProvider>
      </body>
    </html>
  )
}
