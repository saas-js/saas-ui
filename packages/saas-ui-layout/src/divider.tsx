import * as React from 'react'
import {
  chakra,
  useStyleConfig,
  Divider as ChakraDivider,
  DividerProps as ChakraDividerProps,
  SystemStyleObject,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

export interface DividerProps extends ChakraDividerProps {
  label?: string
}

export const Divider: React.FC<DividerProps> = (props) => {
  const { label, orientation, ...rest } = props
  const styles = useStyleConfig('Divider', props)

  // @todo properly fix typings.
  const borderColor: any = styles.borderColor

  const lineHorizontal: SystemStyleObject = {
    borderBottomWidth: '1px',
    borderColor,
    width: '50%',
    top: '50%',
  }

  const lineVertical: SystemStyleObject = {
    borderLeftWidth: '1px',
    borderColor,
    height: '50%',
    left: -'50%',
  }

  const line: SystemStyleObject = {
    content: '""',
    position: 'relative',
    display: 'inline-block',
    ...(orientation === 'vertical' ? lineVertical : lineHorizontal),
  }

  const dividerStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    color: borderColor,
    _before: line,
    _after: line,
    fontSize: 'md',
    ...styles,
    border: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  }

  const labelStyles: SystemStyleObject = {
    display: 'inline-block',
    flexShrink: 0,
    mx: 2,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
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
      orientation={orientation}
      role="separator"
      {...rest}
      __css={dividerStyles}
    >
      {label && <chakra.span __css={labelStyles}>{label}</chakra.span>}
    </ChakraDivider>
  )
}

if (__DEV__) {
  Divider.displayName = 'Divider'
}
