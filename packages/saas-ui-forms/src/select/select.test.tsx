import * as React from 'react'

import { testStories } from '@saas-ui/test-utils'
import * as stories from './select.stories'

const { MaxHeight, ...rest } = stories

testStories(rest, {
  a11y: false,
})
