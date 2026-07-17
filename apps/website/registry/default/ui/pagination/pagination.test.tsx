import * as React from 'react'
import { act } from 'react'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as Pagination from './pagination.tsx'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

describe('Pagination', () => {
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

  it('provides Chakra context to its compound controls', () => {
    render(
      <Pagination.Root count={20} pageSize={10}>
        <Pagination.PrevButton aria-label="Previous page">
          Previous
        </Pagination.PrevButton>
        <Pagination.Items />
        <Pagination.NextButton aria-label="Next page">
          Next
        </Pagination.NextButton>
        <Pagination.PageText />
      </Pagination.Root>,
    )

    expect(container.querySelectorAll('button')).toHaveLength(4)
    expect(container.textContent).toContain('1 of 2')
  })

  it('keeps Chakra createContext strict outside Root', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<Pagination.Ellipsis index={0} />)).toThrow(
      'useContext returned `undefined`',
    )

    consoleError.mockRestore()
  })
})
