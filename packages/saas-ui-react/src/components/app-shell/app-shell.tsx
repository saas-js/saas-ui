'use client'

import { forwardRef } from 'react'

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  createSlotRecipeContext,
} from '@chakra-ui/react/styled-system'

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useAppShellStyles,
} = createSlotRecipeContext({
  key: 'suiAppShell',
})

export { useAppShellStyles }

export interface AppShellProps extends HTMLChakraProps<'div'> {
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
  /**
   * The main content
   */
  children: React.ReactNode
}

export interface AppShellRootProps
  extends Omit<AppShellProps, 'position'>,
    SlotRecipeProps<'suiAppShell'> {}

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

export const AppShell = forwardRef<HTMLDivElement, AppShellRootProps>(
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
