import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/list.stories'

const { customStyles, ...rest } = stories

testStories<typeof rest>(rest)
