import * as React from 'react'
import { act } from 'react'

import { Provider } from '@/registry/default/setup/provider/provider.tsx'
import { type Root, createRoot } from 'react-dom/client'

import * as Navbar from './navbar.tsx'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

describe('Navbar', () => {
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
    vi.useRealTimers()
  })

  function render(node: React.ReactNode) {
    act(() => {
      root.render(<Provider>{node}</Provider>)
    })
  }

  it('forwards its ref and renders compound content', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(
      <Navbar.Root ref={ref}>
        <Navbar.Brand data-testid="brand">Saas UI</Navbar.Brand>
        <Navbar.Content data-testid="content">
          <Navbar.Item>Dashboard</Navbar.Item>
          <Navbar.Item>Contacts</Navbar.Item>
          <Navbar.Item>Settings</Navbar.Item>
        </Navbar.Content>
      </Navbar.Root>,
    )

    expect(ref.current).not.toBeNull()
    expect(container.querySelector('[data-testid="brand"]')?.textContent).toBe(
      'Saas UI',
    )
    expect(
      container.querySelector('[data-testid="content"]')?.children,
    ).toHaveLength(3)
  })

  it('hides while scrolling down and reveals while scrolling up', () => {
    vi.useFakeTimers()
    const positions: number[] = []

    function Fixture() {
      const parentRef = React.useRef<HTMLDivElement>(null)
      return (
        <div ref={parentRef} data-testid="scroller">
          <Navbar.Root
            parentRef={parentRef}
            shouldHideOnScroll
            onScrollPositionChange={(position) => positions.push(position)}
            data-testid="navbar"
          />
        </div>
      )
    }

    render(<Fixture />)

    const scroller = container.querySelector<HTMLDivElement>(
      '[data-testid="scroller"]',
    )!
    const navbar = container.querySelector<HTMLDivElement>(
      '[data-testid="navbar"]',
    )!
    Object.defineProperty(navbar, 'offsetHeight', {
      configurable: true,
      value: 40,
    })
    Object.defineProperty(scroller, 'scrollTop', {
      configurable: true,
      value: 100,
      writable: true,
    })

    expect(positions).toEqual([])
    act(() => scroller.dispatchEvent(new Event('scroll')))
    expect(positions).toEqual([])
    expect(navbar.hasAttribute('data-hidden')).toBe(false)

    act(() => vi.advanceTimersByTime(29))
    expect(positions).toEqual([])

    act(() => vi.advanceTimersByTime(1))
    expect(positions).toEqual([100])
    expect(navbar.hasAttribute('data-hidden')).toBe(true)

    scroller.scrollTop = 10
    act(() => scroller.dispatchEvent(new Event('scroll')))
    expect(positions).toEqual([100])

    act(() => vi.advanceTimersByTime(30))
    expect(navbar.hasAttribute('data-hidden')).toBe(false)
    expect(positions).toEqual([100, 10])
  })
})
