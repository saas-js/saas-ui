import * as React from 'react'

import { useLocale } from '@react-aria/i18n'
import {
  useDateFieldState,
  useTimeFieldState,
  DateFieldStateOptions,
  TimeFieldStateOptions,
  DateFieldState,
} from '@react-stately/datepicker'
import {
  useDateField,
  useDateSegment,
  useTimeField,
} from '@react-aria/datepicker'
import { createCalendar } from '@internationalized/date'
import {
  chakra,
  FormLabel,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useFormControl,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import {
  useDatePickerContext,
  useDatePickerStyles,
} from './date-picker-context'

export interface DateFieldProps
  extends Omit<DateFieldStateOptions, 'locale' | 'createCalendar'> {}

export const DateField: React.FC<DateFieldProps> = (props) => {
  const { locale } = useLocale()
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  })

  const ref = React.useRef<HTMLDivElement>(null)

  const {
    fieldProps: { id, ...fieldProps },
  } = useDateField(props, state, ref)

  const inputProps = useFormControl<HTMLInputElement>(fieldProps)

  const styles = useDatePickerStyles()

  const dateFieldStyles = {
    display: 'flex',
    width: 'full',
    ...styles.dateField,
  }

  return (
    <chakra.div
      {...inputProps}
      aria-labelledby={`${inputProps.id}-label`}
      ref={ref}
      __css={dateFieldStyles}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </chakra.div>
  )
}

export interface TimeFieldProps
  extends Omit<TimeFieldStateOptions, 'locale'>,
    Omit<
      HTMLChakraProps<'div'>,
      | 'defaultValue'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'onKeyDown'
      | 'onKeyUp'
    > {}

export const TimeField: React.FC<TimeFieldProps> = (props) => {
  const {
    label = 'Time',
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
    ...rest
  } = props

  const timeFieldProps = {
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
  }

  const { locale } = useLocale()
  const state = useTimeFieldState({
    ...props,
    onChange: (value) => {
      console.log('onChange2', value)
      onChange?.(value)
    },
    locale,
  })

  const ref = React.useRef<HTMLDivElement>(null)
  const { labelProps, fieldProps } = useTimeField(timeFieldProps, state, ref)

  return (
    <chakra.div mt={2} {...rest}>
      <FormLabel {...labelProps}>{label}</FormLabel>
      <SegmentedInput {...fieldProps} ref={ref} display="inline-flex" pr={2}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </SegmentedInput>
    </chakra.div>
  )
}

export const DatePickerTimeField = () => {
  const {
    state: { timeValue, setTimeValue },
  } = useDatePickerContext()

  return (
    <TimeField
      value={timeValue}
      onChange={(value) => {
        console.log('time', value)
        setTimeValue(value)
      }}
    />
  )
}

export const DatePickerStartTimeField = () => {
  const {
    state: { timeValue, setTimeValue },
  } = useDatePickerContext()

  return <TimeField value={timeValue} onChange={setTimeValue} />
}

export const DatePickerEndTimeField = () => {
  const {
    state: { timeValue, setTimeValue },
  } = useDatePickerContext()

  return <TimeField value={timeValue} onChange={setTimeValue} />
}

export interface SegmentedInputProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'Input'> {}

export const SegmentedInput = forwardRef<SegmentedInputProps, 'div'>(
  ({ children, ...rest }, ref) => {
    const styles = useMultiStyleConfig('Input', rest)
    const ownProps = omitThemingProps(rest)

    const inputStyles = {
      display: 'flex',
      alignItems: 'center',
      /* @ts-ignore */
      _focusWithin: styles.field._focusVisible,
      ...styles.field,
    }

    return (
      <chakra.div {...ownProps} __css={inputStyles} ref={ref}>
        {children}
      </chakra.div>
    )
  }
)

interface DateSegmentProps extends HTMLChakraProps<'div'> {
  segment: any
  state: DateFieldState
}

const DateSegment: React.FC<DateSegmentProps> = ({ segment, state }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { segmentProps } = useDateSegment(segment, state, ref)

  return (
    <chakra.div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        fontVariantNumeric: 'tabular-nums',
        boxSizing: 'content-box',
      }}
      minWidth={
        segment.maxValue != null
          ? String(segment.maxValue).length + 'ch'
          : 'auto'
      }
      paddingX="0.5"
      textAlign="end"
      outline="none"
      rounded="md"
      color={
        segment.isPlaceholder
          ? 'gray.500'
          : !segment.isEditable
          ? 'gray.600'
          : 'black'
      }
      _focus={{
        background: 'primary.500',
        color: 'white',
      }}
    >
      {segment.text}
    </chakra.div>
  )
}
