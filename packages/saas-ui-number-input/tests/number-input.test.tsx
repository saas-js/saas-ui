import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/number-input.stories'

testStories<typeof stories>(stories)
