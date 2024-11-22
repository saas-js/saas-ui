import * as React from 'react'

import {
  Button,
  ButtonProps,
  HTMLChakraProps,
  type StepsChangeDetails,
  chakra,
} from '@chakra-ui/react'
import { useStepperContext } from '@saas-ui/core'
import { callAll, cx } from '@saas-ui/core/utils'
import { Steps } from '@saas-ui/react/steps'
import { FieldValues } from 'react-hook-form'

import { SubmitButton } from './submit-button'
import {
  FormStepSubmitHandler,
  UseStepFormProps,
  useFormStep,
} from './use-step-form'

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
> extends UseStepFormProps<TSteps, TFieldValues, TContext> {}

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

export interface FormStepperProps extends Steps.RootProps {
  // render?: Steps.['render']
}

/**
 * Renders a stepper that displays progress above the form.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/step-form
 */
export const FormStepper = React.forwardRef<HTMLDivElement, FormStepperProps>(
  (props, ref) => {
    const { activeIndex, setIndex } = useStepperContext()

    const {
      children,
      orientation,
      variant,
      colorScheme,
      size,
      onStepChange: onStepChangeProp,
      ...rest
    } = props

    const elements = React.Children.map(children, (child, index) => {
      if (
        React.isValidElement<FormStepProps>(child) &&
        child?.type === FormStep
      ) {
        const { isCompleted } = useFormStep(child.props) // Register this step
        return (
          <Steps.Item
            index={index}
            title={child.props.title}
            data-completed={isCompleted}
            {...rest}
          >
            {child.props.children}
          </Steps.Item>
        )
      }
      return child
    })

    const onChange = React.useCallback((details: StepsChangeDetails) => {
      setIndex(details.step)
      onStepChangeProp?.(details)
    }, [])

    return (
      <Steps.Root
        ref={ref}
        orientation={orientation}
        step={activeIndex}
        variant={variant}
        colorScheme={colorScheme}
        size={size}
        onStepChange={onChange}
      >
        {elements}
      </Steps.Root>
    )
  },
)

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
  props: FormStepProps<TName>,
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
      disabled={isFirstStep || isCompleted}
      children="Back"
      {...props}
      className={cx('sui-form__prev-button', props.className)}
      onClick={callAll(props.onClick, prevStep)}
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
      disabled={isCompleted}
      className={cx('sui-form__next-button', props.className)}
    >
      {isLastStep || isCompleted ? submitLabel : label}
    </SubmitButton>
  )
}

NextButton.displayName = 'NextButton'
