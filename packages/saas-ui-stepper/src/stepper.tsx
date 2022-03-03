import * as React from 'react'

import {
  chakra,
  forwardRef,
  useMultiStyleConfig,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  useStyles,
  StylesProvider,
} from '@chakra-ui/system'

import { CheckIcon, Icon } from '@chakra-ui/icons'
import { Collapse } from '@saas-ui/collapse'

import { getChildOfType, getChildrenOfType } from '@saas-ui/react-utils'
import { cx, __DEV__ } from '@chakra-ui/utils'

import {
  StepperProvider,
  useStepper,
  useStep,
  useStepperContext,
  UseStepperProps,
} from './use-stepper'

export interface StepperProps
  extends UseStepperProps,
    HTMLChakraProps<'div'>,
    ThemingProps<'Stepper'> {
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Display progress in multi-step workflows.
 *
 * Can be controlled or uncontrolled.
 */
export const Stepper = forwardRef<StepperProps, 'div'>((props, ref) => {
  const styles = useMultiStyleConfig('Stepper', props)

  const { children, orientation, ...rest } = omitThemingProps(props)

  const context = useStepper(props)

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <StepperProvider value={context}>
        <chakra.div
          ref={ref}
          __css={containerStyles}
          {...rest}
          className={cx('saas-stepper__container', props.className)}
        >
          <StepperSteps orientation={orientation}>{children}</StepperSteps>
        </chakra.div>
      </StepperProvider>
    </StylesProvider>
  )
})

if (__DEV__) {
  Stepper.displayName = 'Stepper'
}

export interface StepperStepsProps extends HTMLChakraProps<'div'> {
  orientation?: 'horizontal' | 'vertical'
  stepComponent?: React.JSXElementConstructor<any>
}

/**
 * Wrapper element containing the steps.
 */
export const StepperSteps: React.FC<StepperStepsProps> = (props) => {
  const { children, orientation, stepComponent, ...rest } = props
  const styles = useStyles()

  const { activeIndex } = useStepperContext()

  const stepperStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...styles.steps,
  }

  const isVertical = orientation === 'vertical'

  const Step = stepComponent || StepperStep

  const steps = getChildrenOfType(children, Step)

  const elements = steps.reduce<React.ReactElement[]>((memo, step, i, arr) => {
    memo.push(
      <Step
        key={i}
        {...step.props}
        icon={step.props.icon || i + 1}
        isActive={activeIndex === i}
        isCompleted={step.props.isCompleted || activeIndex > i}
      />
    )

    if (orientation === 'vertical') {
      memo.push(
        <StepperContent isOpen={activeIndex === i}>
          {step.props.children}
        </StepperContent>
      )
    }

    if (i < arr.length - 1) {
      memo.push(
        <StepperSeparator key={`separator-${i}`} isActive={i < activeIndex} />
      )
    }

    return memo
  }, [])

  const completed = getChildOfType(children, StepperCompleted)

  const content =
    activeIndex >= steps.length ? (
      completed
    ) : !isVertical ? (
      <StepperContent>{steps[activeIndex]?.props?.children}</StepperContent>
    ) : null

  return (
    <>
      <chakra.div
        __css={stepperStyles}
        {...rest}
        className={cx('saas-stepper__steps', props.className)}
      >
        {elements}
      </chakra.div>
      {content}
    </>
  )
}

if (__DEV__) {
  StepperSteps.displayName = 'StepperSteps'
}

export interface StepperContentProps extends HTMLChakraProps<'div'> {
  /**
   * Show or hide the content
   */
  isOpen?: boolean
}

/**
 * Renders the step content, is collapsible.
 */
export const StepperContent: React.FC<StepperContentProps> = (props) => {
  const { children, isOpen = true, ...rest } = props
  const styles = useStyles()

  return (
    <chakra.div
      __css={styles.content}
      {...rest}
      className={cx('saas-stepper__content', props.className)}
    >
      <Collapse in={isOpen}>{children}</Collapse>
    </chakra.div>
  )
}

if (__DEV__) {
  StepperContent.displayName = 'StepperContent'
}

export interface StepperIconProps extends HTMLChakraProps<'div'> {
  icon: React.ReactNode
  isActive?: boolean
  isCompleted?: boolean
}

/**
 * Displays the current step or a completed icon.
 */
export const StepperIcon: React.FC<StepperIconProps> = (props) => {
  const { icon, isActive, isCompleted, className, ...rest } = props

  const styles = useStyles()

  const iconStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'full',
    fontSize: '1em',
    me: 2,
    ...styles.icon,
  }

  let content
  if (isCompleted) {
    content = <Icon as={CheckIcon} />
  } else {
    content = icon
  }

  return (
    <chakra.div
      __css={iconStyles}
      {...rest}
      className={cx('saas-stepper__icon', className)}
    >
      {content}
    </chakra.div>
  )
}

if (__DEV__) {
  StepperIcon.displayName = 'StepperIcon'
}

export interface StepperStepProps
  extends Omit<HTMLChakraProps<'div'>, 'title'> {
  /**
   * The step title
   */
  title: React.ReactNode
  /**
   * The step name, used for controlled steppers
   */
  name?: string
  /**
   * Show an icon instead of the step number
   */
  icon?: React.ReactNode
  /**
   *
   */
  isActive?: boolean
  /**
   *
   */
  isCompleted?: boolean
}

/**
 * Displays the icon and step title.
 */
export const StepperStep: React.FC<StepperStepProps> = (props) => {
  const { title, icon, isActive, isCompleted, ...rest } = props
  const step = useStep(props)
  const styles = useStyles()

  const stepStyles = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    ...styles.step,
  }

  return (
    <chakra.div
      __css={stepStyles}
      data-active={step.isActive}
      data-completed={step.isCompleted}
      {...rest}
      className={cx('saas-stepper__step', props.className)}
    >
      <StepperIcon icon={icon} isActive={isActive} isCompleted={isCompleted} />
      {title && <StepperStepTitle>{title}</StepperStepTitle>}
    </chakra.div>
  )
}

if (__DEV__) {
  StepperStep.displayName = 'StepperStep'
}

export interface StepperSeparatorProps extends HTMLChakraProps<'div'> {
  isActive?: boolean
}

/**
 * The separator between steps.
 */
export const StepperSeparator: React.FC<StepperSeparatorProps> = (props) => {
  const { isActive, ...rest } = props
  const styles = useStyles()

  const separatorStyles = {
    flex: 1,
    borderTopWidth: '1px',
    mx: 2,
    ...styles.separator,
  }

  return (
    <chakra.div
      data-active={isActive}
      {...rest}
      className={cx('saas-stepper__separator', props.className)}
      __css={separatorStyles}
    />
  )
}

if (__DEV__) {
  StepperSeparator.displayName = 'StepperSeparator'
}

/**
 * The step title.
 */
export const StepperStepTitle: React.FC<HTMLChakraProps<'p'>> = (props) => {
  const styles = useStyles()
  return (
    <chakra.p
      {...props}
      __css={styles.title}
      className={cx('saas-stepper__title', props.className)}
    />
  )
}

if (__DEV__) {
  StepperStepTitle.displayName = 'StepperStepTitle'
}

/**
 * Shown when all steps have completed.
 */
export const StepperCompleted: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const styles = useStyles()
  return (
    <chakra.div
      __css={styles.completed}
      {...props}
      className={cx('saas-stepper__completed', props.className)}
    />
  )
}

if (__DEV__) {
  StepperCompleted.displayName = 'StepperCompleted'
}
