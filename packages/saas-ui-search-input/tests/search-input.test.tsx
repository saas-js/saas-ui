import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/search-input.stories'

testStories<typeof stories>(stories)
