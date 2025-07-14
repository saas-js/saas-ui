import * as React from 'react'
import { useRef } from 'react'
import {
  useDatePickerState,
  DatePickerStateOptions,
  DatePickerState,
} from '@react-stately/datepicker'
import { useDatePicker } from '@react-aria/datepicker'
import { useLocale } from '@react-aria/i18n'
import {
  ThemingProps,
  PopoverProps,
  useMultiStyleConfig,
  Popover,
  useTheme,
} from '@chakra-ui/react'
import {
  DatePickerProvider,
  DatePickerStylesProvider,
} from './date-picker-context'

import { DateValue, FormattedValue } from './types'

import { datePickerStyleConfig } from './date-picker-styles'
import { Calendar, getLocalTimeZone } from '@internationalized/date'
import { MaybeRenderProp, runIfFn } from '@chakra-ui/utils'
import { flushSync } from 'react-dom'

export interface DatePickerContainerProps
  extends ThemingProps<'SuiDatePicker'>,
    Omit<
      DatePickerStateOptions<DateValue>,
      | 'value'
      | 'defaultValue'
      | 'minValue'
      | 'maxValue'
      | 'onChange'
      | 'shouldCloseOnSelect'
    > {
  value?: DateValue | null
  minValue?: DateValue
  maxValue?: DateValue
  defaultValue?: DateValue
  onChange?(value: DateValue | null): void
  locale?: string
  timeZone?: string
  closeOnSelect?: boolean
  children: MaybeRenderProp<DatePickerState>
  createCalendar?(name: string): Calendar
}

export const DatePickerContainer = (props: DatePickerContainerProps) => {
  const {
    children,
    value: valueProp,
    minValue,
    maxValue,
    defaultValue,
    onChange,
    closeOnSelect,
    createCalendar,
    ...rest
  } = props

  const {
    locale: localeProp,
    timeZone = getLocalTimeZone() || 'UTC',
    hourCycle = 12,
    firstDayOfWeek,
  } = props

  const { locale } = useLocale()

  const theme = useTheme()

  const styleConfig = theme.components['SuiDatePicker'] ?? datePickerStyleConfig

  const styles = useMultiStyleConfig('SuiDatePicker', {
    styleConfig,
    ...props,
  })

  /* @ts-ignore: null is needed to reset the field, but gets a ts error in strict mode */
  const state = useDatePickerState<DateValue | null>({
    value: valueProp,
    minValue,
    maxValue,
    defaultValue,
    onChange,
    shouldCloseOnSelect: closeOnSelect,
    ...rest,
  })

  const datePickerRef = useRef<HTMLDivElement>(null)

  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    descriptionProps,
    errorMessageProps,
    calendarProps,
    isInvalid,
    validationDetails,
    validationErrors,
  } = useDatePicker(
    {
      ['aria-label']: 'Date Picker',
      value: state.value,
      minValue,
      maxValue,
      onChange: state.setValue,
      ...rest,
    },
    state,
    datePickerRef
  )

  const context = {
    locale: localeProp || locale,
    state,
    hourCycle,
    timeZone,
    firstDayOfWeek,
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps,
    datePickerRef,
    isInvalid,
    validationDetails,
    validationErrors,
    createCalendar,
  }

  return (
    <DatePickerProvider value={context}>
      <DatePickerStylesProvider value={styles}>
        {runIfFn(children, state)}
      </DatePickerStylesProvider>
    </DatePickerProvider>
  )
}

export interface DatePickerProps<
  TDateValue = DateValue,
  TFormattedValue = FormattedValue,
> extends Omit<DatePickerContainerProps, 'children'>,
    Omit<PopoverProps, 'variant' | 'size' | 'initialFocusRef'> {}

/**
 * DatePicker
 *
 * Allow users to select a date and time value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker
 */
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    children,
    arrowPadding,
    arrowShadowColor,
    arrowSize,
    autoFocus,
    boundary,
    closeDelay,
    closeOnBlur,
    closeOnEsc,
    computePositionOnMount,
    defaultIsOpen,
    direction,
    eventListeners,
    flip,
    gutter,
    isLazy = false,
    lazyBehavior = 'keepMounted',
    modifiers,
    offset,
    openDelay,
    placement,
    preventOverflow,
    returnFocusOnClose,
    strategy,
    trigger,
    ...containerProps
  } = props

  const popoverProps = {
    arrowPadding,
    arrowShadowColor,
    arrowSize,
    autoFocus,
    boundary,
    closeDelay,
    closeOnBlur,
    closeOnEsc,
    computePositionOnMount,
    defaultIsOpen,
    direction,
    eventListeners,
    flip,
    gutter,
    isLazy,
    lazyBehavior,
    modifiers,
    offset,
    openDelay,
    placement,
    preventOverflow,
    returnFocusOnClose,
    strategy,
    trigger,
  }

  return (
    <DatePickerContainer {...containerProps} defaultOpen={defaultIsOpen}>
      {(state) => {
        return (
          <Popover
            {...popoverProps}
            isOpen={state.isOpen}
            onOpen={() => flushSync(() => state.setOpen(true))}
            onClose={() => flushSync(() => state.setOpen(false))}
          >
            {children}
          </Popover>
        )
      }}
    </DatePickerContainer>
  )
}

/**
 * DatePickerStatic
 *
 * Allow users to select a date and time value.
 *
 * @see Docs https://saas-ui.dev/docs/date-time/date-picker
 */
export interface DatePickerStaticProps extends DatePickerContainerProps {}

export const DatePickerStatic: React.FC<DatePickerStaticProps> = (props) => {
  const { children, ...rest } = props
  return <DatePickerContainer {...rest}>{children}</DatePickerContainer>
}
