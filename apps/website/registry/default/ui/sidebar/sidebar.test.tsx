import * as React from 'react'
import { act } from 'react'

import { Provider } from '@/registry/default/setup/provider/provider.tsx'
import { type Root, createRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'

import * as Sidebar from './sidebar.tsx'
import { useSidebar } from './sidebar.context.ts'

const testEnvironment = globalThis as {
  IS_REACT_ACT_ENVIRONMENT?: boolean
}
testEnvironment.IS_REACT_ACT_ENVIRONMENT = true

function mediaQueryList(matches: boolean, media: string): MediaQueryList {
  return {
    matches,
    media,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }
}

function mockViewport(desktop: boolean) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: desktop ? 1024 : 500,
  })
  vi.spyOn(window, 'matchMedia').mockImplementation((query) =>
    mediaQueryList(!desktop && query === '(max-width: 767px)', query),
  )
}

function SidebarProbe() {
  const sidebar = useSidebar()

  return (
    <>
      <button
        data-testid="probe"
        data-state={sidebar.open ? 'open' : 'closed'}
        data-mode={sidebar.mode}
        data-mobile={sidebar.isMobile ? '' : undefined}
        onClick={sidebar.toggle}
      >
        Toggle
      </button>
      <button
        data-testid="double-toggle"
        onClick={() => {
          sidebar.setOpen((current) => !current)
          sidebar.setOpen((current) => !current)
        }}
      >
        Toggle twice
      </button>
      <button
        data-testid="no-op"
        onClick={() => sidebar.setOpen((current) => current)}
      >
        Keep current state
      </button>
      <button
        data-testid="mode-no-op"
        onClick={() => sidebar.setMode(sidebar.mode)}
      >
        Keep current mode
      </button>
    </>
  )
}

describe('Sidebar local behavior', () => {
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
    vi.restoreAllMocks()
  })

  async function renderSidebar(props: Omit<Sidebar.ProviderProps, 'children'>) {
    await act(async () => {
      root.render(
        <Provider>
          <Sidebar.Provider {...props}>
            <SidebarProbe />
          </Sidebar.Provider>
        </Provider>,
      )
    })

    return container.querySelector<HTMLButtonElement>('[data-testid="probe"]')!
  }

  async function toggle(probe: HTMLButtonElement) {
    await act(async () => {
      probe.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
  }

  it('manages uncontrolled open state', async () => {
    mockViewport(true)
    const probe = await renderSidebar({
      defaultOpen: false,
    })

    expect(probe.dataset.state).toBe('closed')
    await toggle(probe)
    expect(probe.dataset.state).toBe('open')
  })

  it('composes batched uncontrolled functional updates', async () => {
    mockViewport(true)
    const probe = await renderSidebar({ defaultOpen: false })
    const doubleToggle = container.querySelector<HTMLButtonElement>(
      '[data-testid="double-toggle"]',
    )!

    await toggle(doubleToggle)

    expect(probe.dataset.state).toBe('closed')
  })

  it('reports controlled changes without mutating the controlled value', async () => {
    mockViewport(true)
    const onOpenChange = vi.fn()
    const probe = await renderSidebar({
      mode: 'collapsible',
      open: false,
      onOpenChange,
    })

    await toggle(probe)

    expect(probe.dataset.state).toBe('closed')
    expect(onOpenChange).toHaveBeenCalledWith({
      open: true,
      mode: 'collapsible',
    })
  })

  it('does not report controlled no-op functional updates', async () => {
    mockViewport(true)
    const onOpenChange = vi.fn()
    await renderSidebar({ open: false, onOpenChange })
    const noOp = container.querySelector<HTMLButtonElement>(
      '[data-testid="no-op"]',
    )!

    await toggle(noOp)

    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('uses an independent mobile open state and disables flyout mode', async () => {
    mockViewport(false)
    const onOpenChange = vi.fn()
    const onModeChange = vi.fn()
    const probe = await renderSidebar({
      mode: 'flyout',
      open: true,
      onModeChange,
      onOpenChange,
    })

    expect(probe.dataset.mobile).toBe('')
    expect(probe.dataset.mode).toBe('collapsible')
    expect(probe.dataset.state).toBe('closed')
    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 767px)')

    const modeNoOp = container.querySelector<HTMLButtonElement>(
      '[data-testid="mode-no-op"]',
    )!
    await toggle(modeNoOp)
    expect(onModeChange).not.toHaveBeenCalled()

    await toggle(probe)

    expect(probe.dataset.state).toBe('open')
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('starts desktop flyout mode closed and opens on demand', async () => {
    mockViewport(true)
    const onOpenChange = vi.fn()
    const probe = await renderSidebar({
      defaultOpen: true,
      mode: 'flyout',
      onOpenChange,
    })

    expect(probe.dataset.mode).toBe('flyout')
    expect(probe.dataset.state).toBe('closed')

    await toggle(probe)

    expect(probe.dataset.state).toBe('open')
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('uses the legacy desktop fallback during server rendering', () => {
    const html = renderToString(
      <Provider>
        <Sidebar.Provider mode="flyout">
          <Sidebar.Root />
        </Sidebar.Provider>
      </Provider>,
    )

    expect(html).toContain('data-mode="flyout"')
    expect(html).toContain('data-state="closed"')
  })
})
