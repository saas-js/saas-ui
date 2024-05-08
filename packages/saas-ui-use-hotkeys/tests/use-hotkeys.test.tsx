import * as React from 'react'
import { render } from '@saas-ui/test-utils'
import { vi } from 'vitest'

import {
  useHotkeys,
  useHotkeysShortcut,
  HotkeysProvider,
  HotkeysConfig,
  Hotkey,
} from '../src'
import { toAriaKeyshortcuts } from '../src/use-hotkeys'

const hotkeys: HotkeysConfig = {
  general: {
    hotkeys: {
      compose: {
        label: 'Compose message',
        command: 'c',
      },
      help: {
        label: 'Help',
        command: '?',
      },
      dashboard: {
        label: 'Go to dashboard',
        command: 'G then D',
      },
      logout: {
        label: 'Log out',
        command: '⌥ ⇧ Q',
      },
    },
  },
}

const renderModal = (ui: React.ReactNode) => {
  return render(<HotkeysProvider hotkeys={hotkeys}>{ui}</HotkeysProvider>)
}

test('should trigger hotkey shortcuts.', async () => {
  const action = vi.fn()
  const TestComponent = () => {
    const command = useHotkeysShortcut('general.compose', action)

    return <button>{command}</button>
  }

  const { findByText, user } = renderModal(<TestComponent />)

  const button = await findByText('c')
  expect(button).toBeInTheDocument()

  await user.keyboard('c')

  expect(action).toBeCalled()
})

test('should trigger shifted keys.', async () => {
  const action = vi.fn()
  const TestComponent = () => {
    useHotkeysShortcut('general.help', action)
    return null
  }

  const { user } = renderModal(<TestComponent />)

  await user.keyboard('{shift}/')

  expect(action).toBeCalled()
})

test('should trigger key combinations.', async () => {
  const action = vi.fn()
  const TestComponent = () => {
    useHotkeysShortcut('general.logout', action)
    return null
  }

  const { user } = renderModal(<TestComponent />)

  await user.keyboard('{alt}{shift}q')

  expect(action).toBeCalled()
})

test('should trigger key sequences.', async () => {
  const action = vi.fn()
  const TestComponent = () => {
    useHotkeysShortcut('general.dashboard', action)
    return null
  }

  const { user } = renderModal(<TestComponent />)

  await user.keyboard('G')
  await user.keyboard('D')

  expect(action).toBeCalled()
})

test('should trigger custom hotkeys.', async () => {
  const action = vi.fn()
  const TestComponent = () => {
    useHotkeys('c', action)
    return null
  }

  const { user } = renderModal(<TestComponent />)

  await user.keyboard('c')

  expect(action).toBeCalled()
})

test('should support multiple key combinations.', async () => {
  const action = vi.fn()
  const TestComponent = () => {
    useHotkeys(['c', 'G then C'], action)
    return null
  }

  const { user } = renderModal(<TestComponent />)

  await user.keyboard('c')

  expect(action).toBeCalled()

  await user.keyboard('G')
  await user.keyboard('C')

  expect(action).toBeCalledTimes(2)
})

test('should reset after modifier keys.', async () => {
  const action = vi.fn()
  const action2 = vi.fn()
  const TestComponent = () => {
    useHotkeys('ctrl+z', action)
    useHotkeys('ArrowUp', action2)
    return null
  }

  const { user } = renderModal(<TestComponent />)

  await user.keyboard('{Control>}z')

  await user.keyboard('[ArrowUp]')

  expect(action2).toBeCalled()
})

test('Hotkey should trigger hotkey shortcuts.', async () => {
  const action = vi.fn()
  const TestComponent = () => {
    return (
      <Hotkey command="general.compose" callback={action}>
        {({ keys }) => <button>{keys}</button>}
      </Hotkey>
    )
  }

  const { findByText, user } = renderModal(<TestComponent />)

  const button = await findByText('c')
  expect(button).toBeInTheDocument()

  await user.keyboard('c')

  expect(action).toBeCalled()
})

test('should format aria key shortcuts.', async () => {
  expect(toAriaKeyshortcuts(['s'])).toBe('s')

  expect(toAriaKeyshortcuts(['?'])).toBe('shift+/')

  expect(toAriaKeyshortcuts(['⌘ K'])).toBe('meta+k')

  expect(toAriaKeyshortcuts(['A', '⌘ K'])).toBe('a meta+k')

  expect(toAriaKeyshortcuts(['A then B'])).toBe('a+b')

  expect(toAriaKeyshortcuts(['Shift+F', '⌃ X'])).toBe('shift+f control+x')
})

test('should render aria-keyshortcut tag', async () => {
  const action = vi.fn()
  const TestComponent = () => {
    return (
      <Hotkey command="general.compose" callback={action}>
        <button>Compose</button>
      </Hotkey>
    )
  }

  const { findByText } = renderModal(<TestComponent />)

  const button = await findByText('Compose')
  expect(button).toHaveAttribute('aria-keyshortcuts', 'c')
})
