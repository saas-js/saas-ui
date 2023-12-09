---
to: "<%= h.blocksDir(category, name) %>/<%= h.filename(name) %>.stories.tsx"
---
<% cat = h.pascalize(category) -%>
<% component = h.pascalize(name) -%>
import * as React from 'react'
import { Meta } from '@storybook/react'

export default {
  title: 'Templates/<%= cat %>/<%= component %>',
  decorators: [(Story) => <Story />],
} as Meta

export { <%= component %> } from './<%= h.filename(name) %>'
