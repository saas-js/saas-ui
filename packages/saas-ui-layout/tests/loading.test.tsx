import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/loading.stories'

testStories<typeof stories>(stories)
