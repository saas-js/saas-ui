import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from './select.stories'

const { MaxHeight, ...rest } = stories

testStories<typeof rest>(rest)
