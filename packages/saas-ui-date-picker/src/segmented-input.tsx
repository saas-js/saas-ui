import * as React from 'react'
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyleConfig,
  useTheme,
} from '@chakra-ui/react'
import { createContext } from '@chakra-ui/react-utils'
import { dataAttr, mapResponsive } from '@chakra-ui/utils'

import defaultStyleConfig from './segmented-input-styles'

const sizes: Record<string, string> = {
  sm: '2.2rem',
  md: '2.5rem',
  lg: '3rem',
}

export const [SegmentedInputStylesProvider, useSegmentedInputStyles] =
  createContext<Record<string, SystemStyleObject>>({
    name: 'SegmentedInputStylesContext',
  })

export interface SegmentedInputProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'SegmentedInput'> {}

/**
 * SegmentedInput
 *
 * Input with editable segments, like date or time input.
 *
 * @theme 'Input'
 */
export const SegmentedInput = forwardRef<SegmentedInputProps, 'div'>(
  ({ children, size, ...rest }, ref) => {
    const styles = useMultiStyleConfig('Input', {
      size,
      ...rest,
    })
    const ownProps = omitThemingProps(rest)

    const pe =
      mapResponsive(size, (s) => {
        return sizes[s]
      }) || sizes.md

    const inputStyles = {
      display: 'flex',
      alignItems: 'center',
      /* @ts-ignore */
      _focusWithin: styles.field?._focusVisible,
      ...styles.field,
    }

    return (
      <SegmentedInputStylesProvider value={styles}>
        <chakra.div {...ownProps} pe={pe} __css={inputStyles} ref={ref}>
          {children}
        </chakra.div>
      </SegmentedInputStylesProvider>
    )
  }
)

SegmentedInput.displayName = 'SegmentedInput'

export interface InputSegmentProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'InputSegment'> {
  minValue?: number
  maxValue?: number
  type?: string
  isPlaceholder?: boolean
  isEditable?: boolean
}

/**
 * SegmentedInput
 *
 * A segment that is used in side a SegmentedInput
 *
 * @theme 'InputSegment'
 */
export const InputSegment = forwardRef<InputSegmentProps, 'div'>(
  (props, ref) => {
    const {
      children,
      type,
      minValue,
      maxValue,
      isPlaceholder,
      isEditable,
      ...rest
    } = props

    const theme = useTheme()
    const isThemed = !!theme.components['InputSegment']

    const styles = useStyleConfig('InputSegment', {
      styleConfig: !isThemed ? defaultStyleConfig : undefined,
      ...rest,
    })

    const segmentStyles = {
      boxSizing: 'content-box',
      fontVariantNumeric: 'tabular-nums',
      minWidth: maxValue != null ? String(maxValue).length + 'ch' : 'auto',
      ...styles,
    }

    const isLiteral = type === 'literal'

    return (
      <chakra.div
        {...rest}
        ref={ref}
        data-literal={dataAttr(isLiteral)}
        data-placeholder={dataAttr(isPlaceholder)}
        data-read-only={dataAttr(!isEditable)}
        __css={segmentStyles}
      >
        {children}
      </chakra.div>
    )
  }
)

InputSegment.displayName = 'SegmentedInputSegment'
