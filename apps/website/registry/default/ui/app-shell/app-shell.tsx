'use client'

import { forwardRef } from 'react'

import {
  type HTMLChakraProps,
  createSlotRecipeContext,
} from '@chakra-ui/react/styled-system'
import {
  type AppShellVariantProps,
  appShellSlotRecipe,
} from '@saas-ui/chakra-preset/slot-recipes/app-shell'

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useAppShellStyles,
} = createSlotRecipeContext({
  recipe: appShellSlotRecipe,
})

export { useAppShellStyles }

export interface AppShellBaseProps {
  /**
   * The top header navigation
   */
  header?: React.ReactNode
  /**
   * Main sidebar, positioned on the left
   */
  sidebar?: React.ReactElement
  /**
   * Secondary sidebar, positioned on the right
   */
  aside?: React.ReactNode
  /**
   * The footer
   */
  footer?: React.ReactNode
}

export interface AppShellRootProps
  extends HTMLChakraProps<'div'>, AppShellVariantProps {}

/**
 * The App Shell defines the main structure of your app.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/app-shell
 */
export const AppShellRoot = withProvider<HTMLDivElement, AppShellRootProps>(
  'div',
  'root',
  { forwardAsChild: true },
)

export interface AppShellContentProps extends HTMLChakraProps<'div'> {}

export const AppShellContent = withContext<
  HTMLDivElement,
  AppShellContentProps
>('div', 'content', { forwardAsChild: true })

export interface AppShellMainProps extends HTMLChakraProps<'div'> {}

export const AppShellMain = withContext<HTMLDivElement, AppShellMainProps>(
  'div',
  'main',
  { forwardAsChild: true },
)

export interface AppShellProps
  extends AppShellBaseProps, HTMLChakraProps<'div'>, AppShellVariantProps {}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  (props, ref) => {
    const { header, sidebar, aside, footer, children, ...rootProps } = props

    return (
      <AppShellRoot ref={ref} {...rootProps}>
        {header}
        <AppShellContent>
          {sidebar}
          <AppShellMain>{children}</AppShellMain>
          {aside}
        </AppShellContent>
        {footer}
      </AppShellRoot>
    )
  },
)

AppShell.displayName = 'AppShell'
