---
to: "<%= h.packageDir(org, name) %>/stories/<%= h.filename(name) %>.stories.tsx"
---
<% component = h.inflection.camelize(name, false) -%>
import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { <%= component %> } from '../src'

export default {
  title: '<%= component %>',
  component: <%= component %>,
} as Meta

const Template: Story = (args) => <<%= component %> title="<%= component %> Story" {...args} />

export const Default = Template.bind({})
Default.args = {
}

export const Preview = Template.bind({})
Preview.args = {
  preview: true,
}
