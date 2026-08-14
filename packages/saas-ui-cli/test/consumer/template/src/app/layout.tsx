import type { ReactNode } from 'react'

import { Provider } from '@/design/setup/provider/provider'

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
