import * as React from 'react'

import { chakra, Kbd, HTMLChakraProps, useStyleConfig } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'

const Key: React.FC<HTMLChakraProps<'span'>> = ({ children }) => {
  if (typeof children !== 'string') {
    return <>{children}</>
  }

  if (['then', 'or', '+'].includes(children)) {
    return <chakra.span>{children}</chakra.span>
  }

  return <Kbd>{children}</Kbd>
}

/**
 * Command
 * A command is used to show which key or combination of keys performs a given action.
 *
 * All single letters A-Z are uppercase.
 * For non-letter keys such as enter, esc and shift, stick to lowercase.
 * Use symbols (⌥ ⇧ ⌃ ⌘) as opposed to spelling things out.
 */
export const Command: React.FC<HTMLChakraProps<'span'>> = (props) => {
  const { children, className, ...rest } = props
  if (typeof children !== 'string') {
    return <>{children}</>
  }
  const keys = children.split(/\s|\+/)

  const styles = useStyleConfig('SuiCommand')

  const commandStyles = {
    '& > *:not(style) ~ *:not(style)': { marginEnd: 1 },
    color: 'muted',
    ...styles,
  }

  return (
    <chakra.span
      className={cx('sui-command', className)}
      __css={commandStyles}
      {...rest}
    >
      {keys.map((key) => (
        <Key key={key}>{key}</Key>
      ))}
    </chakra.span>
  )
}
