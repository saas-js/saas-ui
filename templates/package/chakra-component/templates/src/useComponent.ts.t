---
to: "<%= h.packageDir(org, name) %>/src/<%= h.filename(`use-${name}`) %>.tsx"
---
<% component = h.inflection.camelize(name, false) -%>
/**
 * 📝 Notes for Contributors:
 * 
 * - When creating an interactive component, we recommend creating hooks that 
 * handles accessibility, state management, and behavior concerns.
 * 
 * - Hooks should return prop-getters and some state information.
 * 
 * > If you're not creating an interactive component, you can delete this file.
 * 
 * @see https://chakra-ui.com/guides/component-guide
 */

import * as React from 'react'

export interface Use<%= component %>Props {
}

export function use<%= component %>(props: Use<%= component %>Props) {
  return {};
}

export type Use<%= component %>Return = ReturnType<typeof use<%= component %>>
