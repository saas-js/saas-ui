---
to: pages/<%= name %>.tsx
---
<% formattedPath = h.inflection.camelize(name, true).replace(/::/g, '/') -%>
<% pageName = `${formattedPath}Page` -%>
<% base = h.path.parse(h.inflection.camelize(name, false)).base -%>
import type { CustomNextPage as NextPage } from 'types'

import { Flex, Heading } from '@chakra-ui/react'

import { getLayout } from 'src/components/layouts/SiteLayout'

const <%= pageName %>: NextPage = () => {
  return (
    <>
      <Flex flexDir="column" alignItems="center">
        <Heading as="h1"><%= formattedPath %> Page</Heading>
      </Flex>
    </>
  )
}

<%= pageName %>.getLayout = getLayout

export default <%= pageName %>
