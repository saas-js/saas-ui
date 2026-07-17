import * as React from 'react'
import { act } from 'react'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { type Root, createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as GridList from './grid-list.tsx'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

describe('GridList', () => {
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

  function focus(element: HTMLElement) {
    act(() => element.focus())
  }

  function press(element: HTMLElement, key: string) {
    const event = new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
    })
    act(() => element.dispatchEvent(event))
    return event
  }

  it('preserves the grid roles and enabled/disabled tab stops', () => {
    render(
      <GridList.Root data-testid="root">
        <GridList.Header data-testid="header">People</GridList.Header>
        <GridList.Item data-testid="enabled">
          <GridList.Cell data-testid="cell">Ada</GridList.Cell>
        </GridList.Item>
        <GridList.Item data-testid="disabled" disabled />
      </GridList.Root>,
    )

    const grid = container.querySelector<HTMLElement>('[data-testid="root"]')!
    const header = container.querySelector<HTMLElement>(
      '[data-testid="header"]',
    )!
    const enabled = container.querySelector<HTMLElement>(
      '[data-testid="enabled"]',
    )!
    const disabled = container.querySelector<HTMLElement>(
      '[data-testid="disabled"]',
    )!
    const cell = container.querySelector<HTMLElement>('[data-testid="cell"]')!

    expect(grid.getAttribute('role')).toBe('grid')
    expect(grid.getAttribute('aria-readonly')).toBe('true')
    expect(header.getAttribute('role')).toBe('columnheader')
    expect(enabled.getAttribute('role')).toBe('row')
    expect(cell.getAttribute('role')).toBe('gridcell')
    expect(enabled.tabIndex).toBe(0)
    expect(disabled.tabIndex).toBe(-1)
    expect(disabled.getAttribute('aria-disabled')).toBe('true')
  })

  it('tracks focus and loops keyboard navigation while skipping disabled rows', () => {
    const onFocus = vi.fn()
    const onKeyDown = vi.fn()

    render(
      <GridList.Root>
        <GridList.Item id="first" onFocus={onFocus} onKeyDown={onKeyDown} />
        <GridList.Item id="disabled" disabled />
        <GridList.Item id="last" />
      </GridList.Root>,
    )

    const first = container.querySelector<HTMLElement>('#first')!
    const disabled = container.querySelector<HTMLElement>('#disabled')!
    const last = container.querySelector<HTMLElement>('#last')!

    focus(first)
    expect(first).toBe(document.activeElement)
    expect(first.hasAttribute('data-focus')).toBe(true)
    expect(onFocus).toHaveBeenCalledOnce()

    expect(press(first, 'ArrowDown').defaultPrevented).toBe(true)
    expect(last).toBe(document.activeElement)
    expect(onKeyDown).toHaveBeenCalledOnce()

    press(last, 'ArrowDown')
    expect(first).toBe(document.activeElement)

    press(first, 'ArrowUp')
    expect(last).toBe(document.activeElement)

    press(last, 'Home')
    expect(first).toBe(document.activeElement)

    press(first, 'End')
    expect(last).toBe(document.activeElement)
    expect(disabled).not.toBe(document.activeElement)
  })

  it('clears focus state at the grid boundary and suppresses disabled clicks', () => {
    const onClick = vi.fn()
    const onParentClick = vi.fn()

    render(
      <div onClick={onParentClick}>
        <GridList.Root>
          <GridList.Item id="enabled" />
          <GridList.Item id="disabled" disabled onClick={onClick} />
        </GridList.Root>
        <button id="outside">Outside</button>
      </div>,
    )

    const enabled = container.querySelector<HTMLElement>('#enabled')!
    const disabled = container.querySelector<HTMLElement>('#disabled')!
    const outside = container.querySelector<HTMLElement>('#outside')!

    focus(enabled)
    expect(enabled.hasAttribute('data-focus')).toBe(true)

    focus(outside)
    expect(enabled.hasAttribute('data-focus')).toBe(false)

    const click = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
    act(() => disabled.dispatchEvent(click))

    expect(click.defaultPrevented).toBe(true)
    expect(onClick).not.toHaveBeenCalled()
    expect(onParentClick).not.toHaveBeenCalled()
  })

  it('keeps the strict public Root context contract', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<GridList.Item />)).toThrow(
      "useSuiGridListStyles returned is 'undefined'",
    )

    consoleError.mockRestore()
  })
})
