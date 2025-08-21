import { SuiProvider, defaultSystem } from '@saas-ui/react'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SuiProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Component {...pageProps} />
      </ThemeProvider>
    </SuiProvider>
  )
}
