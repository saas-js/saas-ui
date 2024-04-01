import { AuthProvider } from '@/context/AuthProvider'
import { SaasProvider } from '@saas-ui/react'
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

  return (
    <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <body className={`chakra-ui-${colorMode}`}>
        <SaasProvider>
          <ColorModeScript initialColorMode={colorMode} type="cookie" />
          <AuthProvider>{children}</AuthProvider>
        </SaasProvider>
      </body>
    </html>
  )
}
