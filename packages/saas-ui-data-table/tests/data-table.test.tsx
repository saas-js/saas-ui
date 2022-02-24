import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from '../stories/data-table.stories'

const { TableInstanceRef, ...rest } = stories

testStories<typeof rest>(rest)
