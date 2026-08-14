import * as React from 'react'
import { act } from 'react'

import { ChakraProvider, Kbd } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { type Root, createRoot } from 'react-dom/client'

import { Command, getCommandKbdSize } from './command.tsx'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

describe('Command', () => {
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

  it('maps command sizes to supported Kbd sizes', () => {
    expect(getCommandKbdSize('xs')).toBe('sm')
    expect(getCommandKbdSize('sm')).toBe('sm')
    expect(getCommandKbdSize('md')).toBe('md')
    expect(getCommandKbdSize('lg')).toBe('lg')
    expect(getCommandKbdSize(undefined)).toBeUndefined()
    expect(getCommandKbdSize(['xs', null, 'lg'])).toEqual(['sm', null, 'lg'])
    expect(getCommandKbdSize({ base: 'xs', md: 'md' })).toEqual({
      base: 'sm',
      md: 'md',
    })
  })

  it('renders an xs command key with the same Kbd style as size sm', () => {
    render(
      <>
        <Command size="xs">K</Command>
        <Kbd size="sm">Reference</Kbd>
      </>,
    )

    const keys = container.querySelectorAll<HTMLElement>('.chakra-kbd')

    expect(keys).toHaveLength(2)
    expect(keys[0]?.className).toBe(keys[1]?.className)
  })
})
