import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/object-field.stories'

testStories<typeof stories>(stories)

test('should add rows', async () => {
  const { getByLabelText } = render(<stories.Basic />)

  const title = getByLabelText('Title')

  expect(title).toBeInTheDocument()

  const description = getByLabelText('Description')

  expect(description).toBeInTheDocument()
})
