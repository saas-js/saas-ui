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
  useFormControl,
  useMergeRefs,
} from '@chakra-ui/react'
import {
  useDatePickerContext,
  useDatePickerStyles,
  useDateRangePickerContext,
} from './date-picker-context'

import { InputSegment, SegmentedInput } from './segmented-input'

export interface DateFieldProps
  extends Omit<DateFieldStateOptions, 'locale' | 'createCalendar'> {}

export const DateField = forwardRef<DateFieldProps, 'div'>(
  (props, forwardedRef) => {
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
        ref={useMergeRefs(ref, forwardedRef)}
        __css={dateFieldStyles}
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </chakra.div>
    )
  }
)

DateField.displayName = 'DateField'

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
    hourCycle,
    ...rest
  } = props

  const timeFieldProps = {
    label,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
    hourCycle,
  }

  const { locale } = useLocale()
  const state = useTimeFieldState({
    ...props,
    onChange,
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

TimeField.displayName = 'TimeField'

/**
 * DatePickerTimeField
 *
 * A Date form input with Calendar popover to allow users to enter or select a date and time value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker-input
 */
export const DatePickerTimeField: React.FC<TimeFieldProps> = (props) => {
  const {
    state: { timeValue, setTimeValue },
    hourCycle,
  } = useDatePickerContext()
  return (
    <TimeField
      {...props}
      hourCycle={hourCycle}
      value={timeValue}
      onChange={(value) => {
        setTimeValue(value)
      }}
    />
  )
}

DatePickerTimeField.displayName = 'DatePickerTimeField'

export const DatePickerStartTimeField: React.FC<TimeFieldProps> = (props) => {
  const {
    state: { timeRange, setTime },
    hourCycle,
  } = useDateRangePickerContext()

  return (
    <TimeField
      {...props}
      value={timeRange?.start}
      onChange={(v) => setTime('start', v)}
      hourCycle={hourCycle}
    />
  )
}

DatePickerStartTimeField.displayName = 'DatePickerStartTimeField'

export const DatePickerEndTimeField: React.FC<TimeFieldProps> = (props) => {
  const {
    state: { timeRange, setTime },
    hourCycle,
  } = useDateRangePickerContext()

  return (
    <TimeField
      {...props}
      value={timeRange?.end}
      onChange={(v) => setTime('end', v)}
      hourCycle={hourCycle}
    />
  )
}

DatePickerEndTimeField.displayName = 'DatePickerEndTimeField'

export interface DateRangeTimeFieldProps extends HTMLChakraProps<'div'> {
  startLabel?: string
  endLabel?: string
}

export const DateRangePickerTimeField: React.FC<DateRangeTimeFieldProps> = (
  props
) => {
  const { startLabel = 'Start time', endLabel = 'End time', ...rest } = props

  return (
    <chakra.div display="flex" gap="2" {...rest}>
      <DatePickerStartTimeField label={startLabel} />
      <DatePickerEndTimeField label={endLabel} />
    </chakra.div>
  )
}

DateRangePickerTimeField.displayName = 'DateRangePickerTimeField'

interface DateSegmentProps extends HTMLChakraProps<'div'> {
  segment: any
  state: DateFieldState
}

const DateSegment: React.FC<DateSegmentProps> = ({ segment, state }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const {
    segmentProps: { style, ...segmentProps },
  } = useDateSegment(segment, state, ref)

  return (
    <InputSegment ref={ref} sx={style} {...segment} {...segmentProps}>
      {segment.text}
    </InputSegment>
  )
}
