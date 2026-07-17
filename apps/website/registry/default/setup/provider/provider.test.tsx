import * as React from 'react'
import { act } from 'react'

import { useLink } from '@/registry/default/lib/use-link/use-link.tsx'
import { chakra } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { type Root, createRoot } from 'react-dom/client'

import { Provider } from './provider.tsx'

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
  const { setTheme } = useTheme()

  return (
    <Link href="/dashboard" data-theme-ready={typeof setTheme === 'function'}>
      <chakra.span color="fg">Dashboard</chakra.span>
    </Link>
  )
}

describe('Provider setup item', () => {
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

  it('wires the preset, color mode, and configured link component', async () => {
    await act(async () => {
      root.render(
        <Provider linkComponent={RouterLink} defaultTheme="light">
          <ProviderProbe />
        </Provider>,
      )
    })

    const link =
      container.querySelector<HTMLAnchorElement>('[data-router-link]')

    expect(link?.getAttribute('href')).toBe('/dashboard')
    expect(link?.dataset.themeReady).toBe('true')
    expect(link?.querySelector('span')?.className).toBeTruthy()
  })
})
