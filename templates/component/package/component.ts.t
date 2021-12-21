---
to: "<%= h.packageDir(org, package) %>/src<%= location ? `/${location}` : ''%>/<%= h.filename(name) %>.tsx"
---
<% component = h.inflection.camelize(name, false) -%>
import * as React from 'react'

export interface <%= component %>Props {
  children: React.ReactNode
}

export const <%= component %>: React.FC<<%= component %>Props> = ({ children }) => {
  return (
    <div>{children}</div>
  )
}
