import React from 'react'

import { Spinner } from './spinner.tsx'

export default {
  title: 'Components/Spinner',
  component: Spinner,
}

export const Default = {
  args: {},
}

export const RenderingChildren = {
  args: {
    loading: false,
    children: 'Hello world',
  },
}
