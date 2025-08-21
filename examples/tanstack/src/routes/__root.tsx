/// <reference types="vite/client" />
import * as React from 'react'

import { Flex, SuiProvider, defaultSystem } from '@saas-ui/react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeProvider } from 'next-themes'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { Link } from '~/components/Link'
import { NotFound } from '~/components/NotFound'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <SuiProvider value={defaultSystem}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <body>
            <Flex p={2} gap={2} fontSize="lg">
              <Link
                to="/"
                css={{
                  '&.active': {
                    fontWeight: 'bold',
                  },
                }}
                activeOptions={{ exact: true }}
              >
                Home
              </Link>{' '}
              <Link
                to="/posts"
                css={{
                  '&.active': {
                    fontWeight: 'bold',
                  },
                }}
              >
                Posts
              </Link>{' '}
              <Link
                to="/users"
                css={{
                  '&.active': {
                    fontWeight: 'bold',
                  },
                }}
              >
                Users
              </Link>{' '}
              <Link
                to="/route-a"
                css={{
                  '&.active': {
                    fontWeight: 'bold',
                  },
                }}
              >
                Pathless Layout
              </Link>{' '}
              <Link
                to="/deferred"
                css={{
                  '&.active': {
                    fontWeight: 'bold',
                  },
                }}
              >
                Deferred
              </Link>{' '}
              <Link
                // @ts-expect-error
                to="/this-route-does-not-exist"
                css={{
                  '&.active': {
                    fontWeight: 'bold',
                  },
                }}
              >
                This Route Does Not Exist
              </Link>
            </Flex>
            <hr />
            {children}
            <TanStackRouterDevtools position="bottom-right" />
            <Scripts />
          </body>
        </ThemeProvider>
      </SuiProvider>
    </html>
  )
}
