import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/input-right-button.stories'

const { Basic } = testStories<typeof stories>(stories)

test('should render a label', async () => {
  const { getByText } = render(<Basic />)

  expect(getByText('Save')).toBeVisible()
})
