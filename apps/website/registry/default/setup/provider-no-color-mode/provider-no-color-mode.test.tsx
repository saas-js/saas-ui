import * as React from 'react'
import { act } from 'react'

import { useLink } from '@/registry/default/lib/use-link/use-link.tsx'
import { chakra } from '@chakra-ui/react'
import { type Root, createRoot } from 'react-dom/client'

import { Provider } from './provider-no-color-mode.tsx'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'>
>(function RouterLink(props, ref) {
  return <a data-router-link="" ref={ref} {...props} />
})

function ProviderProbe() {
  const Link = useLink()
  return (
    <Link href="/dashboard">
      <chakra.span color="fg">Dashboard</chakra.span>
    </Link>
  )
}

describe('Provider without color mode', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(async () => {
    await act(async () => root.unmount())
    container.remove()
  })

  it('wires the preset and configured link without a theme provider', async () => {
    await act(async () => {
      root.render(
        <Provider linkComponent={RouterLink}>
          <ProviderProbe />
        </Provider>,
      )
    })

    const link =
      container.querySelector<HTMLAnchorElement>('[data-router-link]')
    expect(link?.getAttribute('href')).toBe('/dashboard')
    expect(link?.querySelector('span')?.className).toBeTruthy()
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()
  })
})
