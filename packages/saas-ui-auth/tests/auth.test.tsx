import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/auth.stories'

const { Basic } = testStories<typeof stories>(stories)
