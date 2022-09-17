import * as React from 'react'

import {
  chakra,
  StackProps,
  HTMLChakraProps,
  useStyleConfig,
} from '@chakra-ui/react'

import { cx } from '@chakra-ui/utils'

export interface NavProps extends HTMLChakraProps<'nav'> {
  orientation?: 'vertical' | 'horizontal'
  spacing?: StackProps['spacing']
}

export const Nav: React.FC<NavProps> = (props) => {
  const styles = useStyleConfig('Nav', props)

  const { children, spacing, orientation = 'vertical', ...rest } = props

  const containerStyles = {
    '& > *:not(style) ~ *:not(style)': {
      mt: orientation === 'vertical' ? spacing : undefined,
      me: orientation === 'horizontal' ? spacing : undefined,
    },
    ...styles,
  }

  return (
    <chakra.nav
      {...rest}
      __css={containerStyles}
      className={cx('saas-nav', props.className)}
      data-orientation={orientation}
    >
      {children}
    </chakra.nav>
  )
}

Nav.defaultProps = {
  spacing: 0,
}

Nav.displayName = 'Nav'
