import * as React from 'react'
import { act } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { type Root, createRoot } from 'react-dom/client'

import { createIcon } from './index.ts'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

describe('createIcon', () => {
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

  it('preserves the Saas UI stroke defaults', () => {
    const TestIcon = createIcon({
      displayName: 'TestIcon',
      d: 'M4 12l5 5L20 6',
    })

    act(() => {
      root.render(
        <ChakraProvider value={defaultSystem}>
          <TestIcon aria-label="Test icon" />
        </ChakraProvider>,
      )
    })

    const icon = container.querySelector<SVGElement>('[aria-label="Test icon"]')
    const style = getComputedStyle(icon!)

    expect(icon?.getAttribute('viewBox')).toBe('0 0 24 24')
    expect(style.fill).toBe('none')
    expect(style.stroke).toBe('currentColor')
    expect(style.strokeWidth).toBe('2')
    expect(style.strokeLinecap).toBe('round')
    expect(style.strokeLinejoin).toBe('round')
  })

  it('allows callers to replace the defaults', () => {
    const TestIcon = createIcon({
      displayName: 'FilledIcon',
      d: 'M2 2h8v8H2z',
      viewBox: '0 0 12 12',
      defaultProps: { fill: 'currentColor', stroke: 'none' },
    })

    act(() => {
      root.render(
        <ChakraProvider value={defaultSystem}>
          <TestIcon aria-label="Filled icon" />
        </ChakraProvider>,
      )
    })

    const icon = container.querySelector<SVGElement>(
      '[aria-label="Filled icon"]',
    )
    const style = getComputedStyle(icon!)

    expect(icon?.getAttribute('viewBox')).toBe('0 0 12 12')
    expect(style.fill).toBe('currentColor')
    expect(style.stroke).toBe('none')
  })
})
