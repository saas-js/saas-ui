import * as React from 'react'

import {
  Flex,
  createStylesContext,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
  omitThemingProps,
  SystemStyleObject,
} from '@chakra-ui/react'

import { cx } from '@chakra-ui/utils'
import { AppShellProvider, useAppShell } from './app-shell-context'

const [StylesProvider, useStyles] = createStylesContext('SuiAppShell')

export interface AppShellProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'SuiAppShell'> {
  /**
   * The top header navigation
   */
  navbar?: React.ReactNode
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

/**
 * The App Shell defines the main structure of your app.
 *
 * @see Docs https://saas-ui.dev/docs/components/layout/app-shell
 */
export const AppShell: React.FC<AppShellProps> = (props: AppShellProps) => {
  const styles = useMultiStyleConfig('SuiAppShell', props) as Record<
    string,
    SystemStyleObject
  >

  const { navbar, sidebar, aside, footer, children, ...containerProps } =
    omitThemingProps(props)

  const containerStyles: SystemStyleObject = {
    flexDirection: 'column',
    ...styles.container,
  }

  const innerStyles: SystemStyleObject = {
    flex: 1,
    minHeight: 0, // make sure child flex divs get correct height.
    minWidth: 0, // make sure child flex divs get correct width.
    ...styles.inner,
  }

  const mainStyles: SystemStyleObject = {
    flex: 1,
    flexDirection: 'column',
    minWidth: 0, // make sure child flex divs get correct width.
    ...styles.main,
  }

  const isSidebar =
    React.isValidElement(sidebar) && (sidebar as any).type.id === 'Sidebar'

  const context = useAppShell({
    toggleBreakpoint: isSidebar
      ? (sidebar as any)?.props.toggleBreakpoint
      : undefined,
  })

  return (
    <AppShellProvider value={context}>
      <StylesProvider value={styles}>
        <Flex
          {...containerProps}
          sx={containerStyles}
          className={cx('sui-app-shell', props.className)}
        >
          {navbar}
          <Flex sx={innerStyles} className="saas-app-shell__inner">
            {sidebar}
            <Flex sx={mainStyles} className="saas-app-shell__main">
              {children}
            </Flex>
            {aside}
          </Flex>
          {footer}
        </Flex>
      </StylesProvider>
    </AppShellProvider>
  )
}

AppShell.displayName = 'AppShell'
