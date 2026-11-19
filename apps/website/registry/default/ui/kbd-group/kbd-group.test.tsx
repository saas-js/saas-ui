import * as React from 'react'
import { act } from 'react'

import { ChakraProvider, Kbd } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { type Root, createRoot } from 'react-dom/client'

import { KbdGroup, getKbdGroupKbdSize } from './kbd-group.tsx'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

describe('KbdGroup', () => {
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

  function render(node: React.ReactNode) {
    act(() => {
      root.render(<ChakraProvider value={defaultSystem}>{node}</ChakraProvider>)
    })
  }

  it('maps group sizes to supported Kbd sizes', () => {
    expect(getKbdGroupKbdSize('xs')).toBe('sm')
    expect(getKbdGroupKbdSize('sm')).toBe('sm')
    expect(getKbdGroupKbdSize('md')).toBe('md')
    expect(getKbdGroupKbdSize('lg')).toBe('lg')
    expect(getKbdGroupKbdSize(undefined)).toBeUndefined()
    expect(getKbdGroupKbdSize(['xs', null, 'lg'])).toEqual(['sm', null, 'lg'])
    expect(getKbdGroupKbdSize({ base: 'xs', md: 'md' })).toEqual({
      base: 'sm',
      md: 'md',
    })
  })

  it('renders an xs key with the same Kbd style as size sm', () => {
    render(
      <>
        <KbdGroup size="xs">K</KbdGroup>
        <Kbd size="sm">Reference</Kbd>
      </>,
    )

    const keys = container.querySelectorAll<HTMLElement>('.chakra-kbd')

    expect(keys).toHaveLength(2)
    expect(keys[0]?.className).toBe(keys[1]?.className)
  })
  it('splits a shortcut string into keys and plain-text modifiers', () => {
    render(<KbdGroup>G then I</KbdGroup>)

    const keys = container.querySelectorAll<HTMLElement>('.chakra-kbd')

    expect([...keys].map((key) => key.textContent)).toEqual(['G', 'I'])
    expect(container.querySelector('.sui-kbd-group')?.textContent).toBe(
      'GthenI',
    )
  })

  it('groups Kbd children and passes the size to each key', () => {
    render(
      <>
        <KbdGroup size="lg">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <Kbd size="lg">Reference</Kbd>
      </>,
    )

    const group = container.querySelector('.sui-kbd-group')
    const keys = container.querySelectorAll<HTMLElement>('.chakra-kbd')

    expect(group?.querySelectorAll('.chakra-kbd')).toHaveLength(2)
    expect(keys[0]?.className).toBe(keys[2]?.className)
  })
})
