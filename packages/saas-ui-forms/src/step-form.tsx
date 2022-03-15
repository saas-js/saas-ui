import * as React from 'react'

import { FieldValues, UseFormReturn } from 'react-hook-form'

import {
  chakra,
  HTMLChakraProps,
  useMultiStyleConfig,
  StylesProvider,
} from '@chakra-ui/system'

import { callAllHandlers, runIfFn, cx, __DEV__ } from '@chakra-ui/utils'

import {
  StepperProvider,
  StepperSteps,
  StepperStepsProps,
  StepperStep,
  useStepperContext,
} from '@saas-ui/stepper'
import { Button, ButtonProps } from '@saas-ui/button'

import { Form, FormProps } from './form'
import { SubmitButton } from './submit-button'

import {
  useStepForm,
  useFormStep,
  StepFormProvider,
  UseStepFormProps,
} from './use-step-form'

export interface StepFormProps<TFieldValues extends FieldValues = FieldValues>
  extends UseStepFormProps<TFieldValues>,
    FormProps<TFieldValues> {}

export const StepForm = React.forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    props: StepFormProps<TFieldValues>,
    ref: React.ForwardedRef<UseFormReturn<TFieldValues>>
  ) => {
    const { children, onSubmit, ...rest } = props

    const stepper = useStepForm<TFieldValues>(props)

    const { getFormProps, ...ctx } = stepper

    const context = React.useMemo(() => ctx, [ctx])

    return (
      <StepperProvider value={context}>
        <StepFormProvider value={context}>
          <Form ref={ref} {...rest} {...getFormProps(props)}>
            {runIfFn(children, stepper)}
          </Form>
        </StepFormProvider>
      </StepperProvider>
    )
  }
) as <TFieldValues extends FieldValues>(
  props: FormProps<TFieldValues> & {
    ref?: React.ForwardedRef<UseFormReturn<TFieldValues>>
  }
) => React.ReactElement

export interface FormStepOptions {
  /**
   * The step name
   */
  name: string
  /**
   * Schema
   */
  schema?: any
  /**
   * Hook Form Resolver
   */
  resolver?: any
}

export const FormStepper: React.FC<StepperStepsProps> = (props) => {
  const styles = useMultiStyleConfig('Stepper', props)

  const { children } = props

  const elements = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child?.type === FormStep) {
      const { isCompleted } = useFormStep(child.props) // Register this step
      return (
        <StepperStep
          name={child.props.name}
          title={child.props.title}
          isCompleted={isCompleted}
        >
          {child.props.children}
        </StepperStep>
      )
    }
    return child
  })

  return (
    <StylesProvider value={styles}>
      <StepperSteps mb="4" {...props}>
        {elements}
      </StepperSteps>
    </StylesProvider>
  )
}

export interface FormStepProps
  extends FormStepOptions,
    HTMLChakraProps<'div'> {}

export const FormStep: React.FC<FormStepProps> = (props) => {
  const { name, schema, resolver, children, className, ...rest } = props
  const step = useFormStep({ name, schema, resolver })

  const { isActive } = step

  return isActive ? (
    <chakra.div {...rest} className={cx('saas-form__step', className)}>
      {children}
    </chakra.div>
  ) : null
}

if (__DEV__) {
  FormStep.displayName = 'FormStep'
}

export const PrevButton: React.FC<ButtonProps> = (props) => {
  const { isFirstStep, isCompleted, prevStep } = useStepperContext()

  return (
    <Button
      isDisabled={isFirstStep || isCompleted}
      label="Back"
      {...props}
      className={cx('saas-form__prev-button', props.className)}
      onClick={callAllHandlers(props.onClick, prevStep)}
    />
  )
}

if (__DEV__) {
  PrevButton.displayName = 'PrevButton'
}

export interface NextButtonProps extends ButtonProps {
  submitLabel?: string
}

export const NextButton: React.FC<NextButtonProps> = (props) => {
  const { label = 'Next', submitLabel = 'Complete', ...rest } = props
  const { isLastStep, isCompleted } = useStepperContext()

  return (
    <SubmitButton
      isDisabled={isCompleted}
      label={isLastStep || isCompleted ? submitLabel : label}
      {...rest}
      className={cx('saas-form__next-button', props.className)}
    />
  )
}

if (__DEV__) {
  NextButton.displayName = 'NextButton'
}
