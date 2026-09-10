import * as React from 'react'
import { act } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { type Root, createRoot } from 'react-dom/client'

import { IconBadge } from './icon-badge.tsx'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

describe('IconBadge', () => {
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

  it('uses the preset recipe without leaking variant props to the DOM', () => {
    act(() => {
      root.render(
        <ChakraProvider value={defaultSystem}>
          <IconBadge size="lg" variant="outline" aria-label="Reports">
            <svg data-testid="icon" />
          </IconBadge>
        </ChakraProvider>,
      )
    })

    const badge = container.querySelector<HTMLElement>('[aria-label="Reports"]')
    const icon = container.querySelector<SVGElement>('[data-testid="icon"]')

    expect(badge?.className).toContain('sui-icon-badge')
    expect(badge?.hasAttribute('size')).toBe(false)
    expect(badge?.hasAttribute('variant')).toBe(false)
    expect(icon?.getAttribute('aria-hidden')).toBe('true')
    expect(icon?.getAttribute('focusable')).toBe('false')
  })
})
