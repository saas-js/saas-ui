import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { LinkProvider } from '../../lib/use-link/use-link'
import { Link } from './link'

describe('Link', () => {
  it('renders through the configured router component', () => {
    const RouterLink = React.forwardRef<
      HTMLAnchorElement,
      React.ComponentPropsWithoutRef<'a'>
    >(function RouterLink(props, ref) {
      return <a ref={ref} data-router-link="true" {...props} />
    })

    const html = renderToStaticMarkup(
      <ChakraProvider value={defaultSystem}>
        <LinkProvider component={RouterLink}>
          <Link href="/settings" color="red.500">
            Settings
          </Link>
        </LinkProvider>
      </ChakraProvider>,
    )

    expect(html).toContain('data-router-link="true"')
    expect(html).toContain('href="/settings"')
    expect(html).toContain('Settings')
  })
})
