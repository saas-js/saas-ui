---
to: "<%= h.packageDir(org, name) %>/src/<%= h.filename(name) %>.tsx"
---
<% component = h.inflection.camelize(name, false) -%>
/**
 * 📝 Notes for Contributors:
 * 
 * - When creating an interactive component, we recommend consuming the
 * component hook created.
 * 
 * For example, if you wanted to build an accordion component,
 * you'll first create a `useAccordion` hook and then create an `Accordion` component
 * 
 * - Ensure this component is properly themable by following [this guide](https://chakra-ui.com/docs/theming/component-style)
 * 
 * - Ensure the component is composable and can adapt to multiple use-cases
 * 
 * @see Guide https://chakra-ui.com/guides/component-guide
 * @see Theming https://chakra-ui.com/docs/theming/component-style
 */

import * as React from 'react'

import {
  chakra,
  forwardRef,
  useStyleConfig,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps
} from '@chakra-ui/system'

interface <%= component %>Options {
}

export interface <%= component %>Props
  extends <%= component %>Options,
    HTMLChakraProps<'div'>,
    ThemingProps<'<%= component %>'> {}

export const <%= component %> = forwardRef<<%= component %>Props, 'div'>((props, ref) => {
  const styles = useStyleConfig('<%= component %>', props)

  const { children, ...rest } = omitThemingProps(props)

  return (
    <chakra.div ref={ref} __css={styles} {...rest}>{children}</chakra.div>
  )
})
