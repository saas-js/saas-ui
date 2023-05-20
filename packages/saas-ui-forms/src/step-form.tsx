import * as React from 'react'

import { FieldValues, UseFormReturn } from 'react-hook-form'

import {
  chakra,
  Button,
  ButtonProps,
  HTMLChakraProps,
  ThemingProps,
} from '@chakra-ui/react'

import { callAllHandlers, runIfFn, cx } from '@chakra-ui/utils'

import {
  StepperProvider,
  StepperSteps,
  StepperStepsProps,
  StepperStep,
  useStepperContext,
  StepperContainer,
  StepperProps,
} from '@saas-ui/core'

import { Form } from './'
import { Field } from './field'

import { SubmitButton } from './submit-button'

import {
  useStepForm,
  useFormStep,
  StepFormProvider,
  UseStepFormProps,
  FormStepSubmitHandler,
} from './use-step-form'
import { FieldProps } from './types'
import { DisplayIf } from './display-if'
import { ArrayField } from './array-field'
import { ObjectField } from './object-field'
import { createStepForm } from './create-step-form'

export type StepsOptions<TSchema, TName extends string = string> = {
  /**
   * The step name
   */
  name: TName
  /**
   * Schema
   */
  schema?: TSchema
}[]

export interface StepFormProps<
  TSteps extends StepsOptions<any> = StepsOptions<any>,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TFieldTypes = FieldProps<TFieldValues>
> extends UseStepFormProps<TSteps, TFieldValues, TContext, TFieldTypes> {}

export interface FormStepOptions<TName extends string = string> {
  /**
   * The step name
   */
  name: TName
  /**
   * Schema
   */
  schema?: any
  /**
   * Hook Form Resolver
   */
  resolver?: any
}

export interface FormStepperProps
  extends StepperStepsProps,
    ThemingProps<'Stepper'> {}

/**
 * Renders a stepper that displays progress above the form.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/step-form
 */
export const FormStepper: React.FC<FormStepperProps> = (props) => {
  const { activeIndex, setIndex } = useStepperContext()

  const { children, orientation, variant, colorScheme, size, ...rest } = props

  const elements = React.Children.map(children, (child) => {
    if (
      React.isValidElement<FormStepProps>(child) &&
      child?.type === FormStep
    ) {
      const { isCompleted } = useFormStep(child.props) // Register this step
      return (
        <StepperStep
          name={child.props.name}
          title={child.props.title}
          isCompleted={isCompleted}
          {...rest}
        >
          {child.props.children}
        </StepperStep>
      )
    }
    return child
  })

  const onChange = React.useCallback((i: number) => {
    setIndex(i)
  }, [])

  return (
    <StepperContainer
      orientation={orientation}
      step={activeIndex}
      variant={variant}
      colorScheme={colorScheme}
      size={size}
      onChange={onChange}
    >
      <StepperSteps mb="4" {...rest}>
        {elements}
      </StepperSteps>
    </StepperContainer>
  )
}

export interface FormStepProps<TName extends string = string>
  extends FormStepOptions<TName>,
    Omit<HTMLChakraProps<'div'>, 'onSubmit'> {
  onSubmit?: FormStepSubmitHandler
}
/**
 * The form step containing fields for a specific step.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/step-form
 */
export const FormStep = <TName extends string = string>(
  props: FormStepProps<TName>
) => {
  const { name, children, className, onSubmit, ...rest } = props
  const step = useFormStep({ name, onSubmit })

  const { isActive } = step

  return isActive ? (
    <chakra.div {...rest} className={cx('sui-form__step', className)}>
      {children}
    </chakra.div>
  ) : null
}

FormStep.displayName = 'FormStep'

/**
 * A button that this opens the previous step when clicked. Disabled on the first step.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/step-form
 */
export const PrevButton: React.FC<ButtonProps> = (props) => {
  const { isFirstStep, isCompleted, prevStep } = useStepperContext()

  return (
    <Button
      isDisabled={isFirstStep || isCompleted}
      children="Back"
      {...props}
      className={cx('sui-form__prev-button', props.className)}
      onClick={callAllHandlers(props.onClick, prevStep)}
    />
  )
}

PrevButton.displayName = 'PrevButton'

export interface NextButtonProps extends Omit<ButtonProps, 'children'> {
  submitLabel?: string
  label?: string
}

/**
 * A button that submits the active step.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/step-form
 */
export const NextButton: React.FC<NextButtonProps> = (props) => {
  const { label = 'Next', submitLabel = 'Complete', ...rest } = props
  const { isLastStep, isCompleted } = useStepperContext()

  return (
    <SubmitButton
      {...rest}
      isDisabled={isCompleted}
      className={cx('sui-form__next-button', props.className)}
    >
      {isLastStep || isCompleted ? submitLabel : label}
    </SubmitButton>
  )
}

NextButton.displayName = 'NextButton'
