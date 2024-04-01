import * as React from 'react'

import {
  chakra,
  forwardRef,
  useMultiStyleConfig,
  HTMLChakraProps,
  createStylesContext,
  Stepper,
  StepperProps,
  StepSeparator,
  Collapse,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  Box,
  StepTitle,
  StepDescription,
  ThemingProps,
} from '@chakra-ui/react'

import { getChildOfType, getChildrenOfType } from '@saas-ui/react-utils'
import { cx } from '@chakra-ui/utils'

import {
  StepperProvider,
  useStepper,
  useStep,
  useStepperContext,
} from './use-stepper'

const [StylesProvider, useStyles] = createStylesContext('Stepper')

export interface StepsProps
  extends Omit<HTMLChakraProps<'div'>, 'onChange'>,
    ThemingProps<'Stepper'> {
  /**
   * The orientation of the stepper.
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The current step index or name.
   */
  step?: number | string
  /**
   * The current step index.
   */
  index?: number
  /**
   * Callback invoked when the step changes.
   */
  onChange?: (index: number) => void
  /**
   * Props to pass to the stepper component.
   *
   * @see Docs https://chakra-ui.com/docs/feedback/stepper#props
   */
  stepperProps?: StepperProps
}

/**
 * Wrapper element containing the steps.
 */
export const Steps = forwardRef<StepsProps, 'div'>((props, ref) => {
  const {
    children,
    orientation = 'horizontal',
    index,
    step,
    onChange,
    variant,
    colorScheme,
    size,
    stepperProps,
    ...rest
  } = props
  const styles = useMultiStyleConfig('Stepper', props)

  const context = useStepper({
    step: step ?? index,
    onChange,
  })

  const { activeIndex } = context

  const isVertical = orientation === 'vertical'

  const steps = getChildrenOfType(children, StepsItem)

  const itemStyles = {
    position: 'relative',
    ...styles.item,
  }

  const elements = steps.reduce<React.ReactElement[]>((memo, step, i, arr) => {
    const item = React.cloneElement(step, {
      key: i,
      ...step.props,
      isActive: activeIndex === i,
      isCompleted: step.props.isCompleted || activeIndex > i,
    })

    if (isVertical) {
      memo.push(
        <chakra.div
          className="sui-steps__item"
          key={`content-${i}`}
          __css={itemStyles}
        >
          {item}
          <StepsContent isOpen={activeIndex === i} orientation={orientation}>
            {step.props.children}
          </StepsContent>
          {i < arr.length - 1 ? <StepSeparator /> : null}
        </chakra.div>
      )
    } else {
      memo.push(item)
    }

    return memo
  }, [])

  const completed = getChildOfType(children, StepsCompleted)

  const hasContent = steps[activeIndex]?.props?.children

  const content =
    activeIndex >= steps.length ? (
      completed
    ) : !isVertical && hasContent ? (
      <StepsContent orientation={orientation}>
        {steps[activeIndex]?.props?.children}
      </StepsContent>
    ) : null

  return (
    <StylesProvider value={styles}>
      <StepperProvider value={context}>
        <chakra.div
          ref={ref}
          __css={styles.container}
          {...rest}
          className={cx('sui-steps', props.className)}
        >
          <Stepper
            index={activeIndex}
            orientation={orientation}
            variant={variant}
            colorScheme={colorScheme}
            size={size}
            {...stepperProps}
          >
            {elements}
          </Stepper>
          {content}
        </chakra.div>
      </StepperProvider>
    </StylesProvider>
  )
})

Steps.displayName = 'Steps'

export interface StepsItemProps extends Omit<HTMLChakraProps<'div'>, 'title'> {
  /**
   * Custom render function
   */
  render?: (props?: any) => React.ReactElement
  /**
   * The step name
   */
  name?: string
  /**
   * The step title
   */
  title: React.ReactNode
  /**
   * The step description
   */
  description?: React.ReactNode
  /**
   * Show an icon instead of the step number
   */
  icon?: React.ReactNode
  /**
   * Show the step as active
   */
  isActive?: boolean
  /**
   * Show the step as completed
   */
  isCompleted?: boolean
}

export const StepsItem: React.FC<StepsItemProps> = (props) => {
  const { render, icon, title, description, ...rest } = props

  const step = useStep(rest)

  if (render) {
    return render({
      ...step,
      ...props,
    })
  }

  return (
    <Step>
      <StepIndicator>
        <StepStatus
          complete={<StepIcon />}
          incomplete={<StepNumber children={icon} />}
          active={<StepNumber />}
        />
      </StepIndicator>

      <Box flexShrink="0">
        <StepTitle>{title}</StepTitle>
        {description && <StepDescription>{description}</StepDescription>}
      </Box>

      <StepSeparator />
    </Step>
  )
}

StepsItem.displayName = 'StepsItem'

export interface StepperContentProps extends HTMLChakraProps<'div'> {
  /**
   * Show or hide the content, only when orientation is vertical.
   */
  isOpen?: boolean
  /**
   * The orientation of the stepper.
   */
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Renders the step content, is collapsible.
 */
export const StepsContent: React.FC<StepperContentProps> = (props) => {
  const { children, isOpen = true, orientation = 'horizontal', ...rest } = props
  const styles = useStyles()

  return (
    <chakra.div
      {...rest}
      __css={styles.content}
      className={cx('sui-steps__content', props.className)}
      data-orientation={orientation}
    >
      {orientation === 'vertical' ? (
        <Collapse
          in={isOpen}
          style={{ overflow: isOpen ? 'visible' : 'hidden' }}
        >
          <chakra.div p="2px">{isOpen ? children : null}</chakra.div>
        </Collapse>
      ) : (
        children
      )}
    </chakra.div>
  )
}

StepsContent.displayName = 'StepsContent'

/**
 * Shown when all steps have completed.
 */
export const StepsCompleted: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const completedStyles = {}
  return (
    <chakra.div
      __css={completedStyles}
      {...props}
      className={cx('sui-steps__completed', props.className)}
    />
  )
}

StepsCompleted.displayName = 'StepsCompleted'
