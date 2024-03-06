---
to: "<%= h.blocksDir(category, name) %>/<%= h.filename(name) %>.tsx"
---
<% component = h.pascalize(name) -%>
import * as React from 'react'
import { Box } from '@chakra-ui/react'

export function <%= component %>() {
  return (
    <Box></Box>
  )
}
