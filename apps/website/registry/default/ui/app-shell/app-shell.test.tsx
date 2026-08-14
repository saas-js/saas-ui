import * as React from 'react'
import { act } from 'react'

import { Provider } from '@/registry/default/setup/provider/provider.tsx'
import { type Root, createRoot } from 'react-dom/client'

import { AppShell, useAppShellStyles } from './app-shell.tsx'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

function StyleProbe() {
  const styles = useAppShellStyles()

  return <output data-testid="styles" data-styles={JSON.stringify(styles)} />
}

describe('AppShell', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => root.unmount())
    container.remove()
  })

  it('applies preset variants and provides the resolved slot styles', () => {
    act(() => {
      root.render(
        <Provider>
          <AppShell
            data-testid="root"
            fullscreen
            variant="plain"
            header={<header>Header</header>}
          >
            <StyleProbe />
          </AppShell>
        </Provider>,
      )
    })

    const appShell = container.querySelector('[data-testid="root"]')!
    const styles = container.querySelector<HTMLOutputElement>(
      '[data-testid="styles"]',
    )!
    const resolvedStyles = JSON.parse(styles.dataset.styles!)

    expect(appShell.hasAttribute('fullscreen')).toBe(false)
    expect(appShell.hasAttribute('variant')).toBe(false)
    expect(resolvedStyles).toMatchObject({
      root: {
        '@layer recipes': {
          display: 'flex',
          position: 'fixed',
          inset: 0,
        },
      },
      content: {
        '@layer recipes': {
          display: 'flex',
        },
      },
      main: {
        '@layer recipes': {
          display: 'flex',
        },
      },
    })
  })
})
