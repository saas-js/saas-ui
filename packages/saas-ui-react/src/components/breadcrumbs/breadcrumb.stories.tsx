import React from 'react'

import { Breadcrumb } from './index.ts'

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumb.Root,
}

export const Default = {
  args: {
    children: [
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>,
      <Breadcrumb.CurrentLink>Contact</Breadcrumb.CurrentLink>,
    ],
  },
}
