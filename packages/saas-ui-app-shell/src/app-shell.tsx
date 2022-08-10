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

import { cx, __DEV__ } from '@chakra-ui/utils'

const [StylesProvider, useStyles] = createStylesContext('AppShell')

export interface AppShellProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'AppShell'> {
  /**
   * The top header navigation
   */
  navbar?: React.ReactNode
  /**
   * Main sidebar, positioned on the left
   */
  sidebar?: React.ReactNode
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

export const AppShell: React.FC<AppShellProps> = (props: AppShellProps) => {
  const styles = useMultiStyleConfig('AppShell', props) as Record<
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

  return (
    <StylesProvider value={styles}>
      <Flex
        {...containerProps}
        sx={containerStyles}
        className={cx('saas-app-shell', props.className)}
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
  )
}

if (__DEV__) {
  AppShell.displayName = 'AppShell'
}
