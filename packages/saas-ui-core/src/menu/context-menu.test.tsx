import * as React from 'react'

import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
  testStories,
} from '@saas-ui/test-utils'
import * as stories from './context-menu.stories'

const { Basic } = testStories<typeof stories>(stories)

test('renders context menu correctly', () => {
  const { getByText } = render(<Basic />)

  expect(getByText('Right click here')).toBeInTheDocument()

  expect(screen.queryByText('Edit')).toBeInTheDocument()
})

test('should not render lazy menu', () => {
  render(<Basic isLazy />)

  expect(screen.queryByText('Edit')).not.toBeInTheDocument()
})

test('should open on right click', async () => {
  const { getByText } = render(<Basic />)

  const trigger = getByText('Right click here')

  expect(screen.queryByText('Edit')).not.toBeVisible()

  fireEvent.contextMenu(trigger)

  await waitFor(() => expect(screen.queryByText('Edit')).toBeVisible())
})
