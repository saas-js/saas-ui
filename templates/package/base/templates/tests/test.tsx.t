---
to: "<%= h.packageDir(org, name) %>/tests/<%= h.filename(name) %>.test.tsx"
---
<% component = h.inflection.camelize(name, false) -%>

import { render } from '@chakra-ui/test-utils'

import { <%= component %> } from '../src'

test('renders <%= component %> component with title', () => {
  const { getByText } = render(<<%= component %> title="<%= component %>" />)
  const title = getByText(/<%= component %>/)
  expect(title).toBeInTheDocument()
})
