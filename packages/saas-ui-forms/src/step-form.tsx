import * as React from 'react'

import { Button, ButtonProps, HTMLChakraProps, chakra } from '@chakra-ui/react'
import { useStepperContext } from '@saas-ui/core'
import { callAll, cx } from '@saas-ui/core/utils'

import { SubmitButton } from './submit-button'
import { useFormStep } from './use-step-form'

export interface FormStepProps<TStepId extends string = string>
  extends Omit<HTMLChakraProps<'div'>, 'id' | 'onSubmit'> {
  id: TStepId
}

/**
 * The form step containing fields for a specific step.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/step-form
 */
export const FormStep = <TStepId extends string = string>(
  props: FormStepProps<TStepId>,
) => {
  const { id, children, className, ...rest } = props

  const step = useFormStep({ id })

  const { active } = step

  console.log(step)

  return active ? (
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
  const { isFirstStep, completed, prevStep } = useStepperContext()

  return (
    <Button
      disabled={isFirstStep || completed}
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
  const { isLastStep, completed } = useStepperContext()

  return (
    <SubmitButton
      {...rest}
      disabled={completed}
      className={cx('sui-form__next-button', props.className)}
    >
      {isLastStep || completed ? submitLabel : label}
    </SubmitButton>
  )
}

NextButton.displayName = 'NextButton'
