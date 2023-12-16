---
to: "<%= h.blocksDir(category, name) %>/<%= h.filename(name) %>.tsx"
---
<% component = h.pascalize(name) -%>
import * as React from 'react'

export interface <%= component %>Props {
  children: React.ReactNode
}

export const <%= component %>: React.FC<<%= component %>Props> = ({ children }) => {
  return (
    <div>{children}</div>
  )
}
