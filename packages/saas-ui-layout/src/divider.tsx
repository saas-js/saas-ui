import * as React from 'react'
import {
  chakra,
  useStyleConfig,
  Divider as ChakraDivider,
  DividerProps as ChakraDividerProps,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

export interface DividerProps extends ChakraDividerProps {
  label?: string
}

export const Divider: React.FC<DividerProps> = (props) => {
  const { label, orientation, ...rest } = props
  const styles = useStyleConfig('Divider', props)

  const lineHorizontal = {
    borderBottomWidth: '1px',
    borderColor: styles.borderColor,
    width: '50%',
    top: '50%',
  }

  const lineVertical = {
    borderLeftWidth: '1px',
    borderColor: styles.borderColor,
    height: '50%',
    left: -'50%',
  }

  const line = {
    content: '""',
    position: 'relative',
    display: 'inline-block',
    ...(orientation === 'vertical' ? lineVertical : lineHorizontal),
  }

  const dividerStyles = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    color: styles.borderColor,
    _before: line,
    _after: line,
    fontSize: 'md',
    ...styles,
    border: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  }

  const labelStyles = {
    display: 'inline-block',
    flexShrink: 0,
    mx: 2,
    ...(orientation === 'vertical'
      ? {
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }
      : {}),
  }

  return (
    <ChakraDivider
      as={label ? 'div' : 'hr'}
      __css={dividerStyles}
      orientation={orientation}
      {...rest}
    >
      {label && (
        <chakra.span __css={labelStyles} isTruncated>
          {label}
        </chakra.span>
      )}
    </ChakraDivider>
  )
}

if (__DEV__) {
  Divider.displayName = 'Divider'
}
