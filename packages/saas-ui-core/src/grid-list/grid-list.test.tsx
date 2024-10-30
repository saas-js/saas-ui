import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from './list.stories'

const { CustomStyles, WithCheckbox, WithRadio, Nested, ...rest } = stories

testStories<typeof rest>(rest)
