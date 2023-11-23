import * as React from 'react'
import { render } from '@saas-ui/test-utils'

import {
  useHotkeys,
  useHotkeysShortcut,
  HotkeysProvider,
  HotkeysConfig,
} from '../src'

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
  const action = jest.fn()
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
  const action = jest.fn()
  const TestComponent = () => {
    useHotkeysShortcut('general.help', action)
    return null
  }

  const { user } = renderModal(<TestComponent />)

  await user.keyboard('{shift}/')

  expect(action).toBeCalled()
})

test('should trigger key combinations.', async () => {
  const action = jest.fn()
  const TestComponent = () => {
    useHotkeysShortcut('general.logout', action)
    return null
  }

  const { user } = renderModal(<TestComponent />)

  await user.keyboard('{alt}{shift}q')

  expect(action).toBeCalled()
})

test('should trigger key sequences.', async () => {
  const action = jest.fn()
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
  const action = jest.fn()
  const TestComponent = () => {
    useHotkeys('c', action)
    return null
  }

  const { user } = renderModal(<TestComponent />)

  await user.keyboard('c')

  expect(action).toBeCalled()
})

test('should support multiple key combinations.', async () => {
  const action = jest.fn()
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
