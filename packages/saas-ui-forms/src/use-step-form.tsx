import * as React from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { createContext } from '@chakra-ui/react-utils'
import {
  useStepper,
  useStep,
  UseStepperProps,
  UseStepperReturn,
} from '@saas-ui/stepper'

export interface StepState {
  name: string
  schema?: any
  isActive?: boolean
  isCompleted?: boolean
}

export interface StepFormContext extends UseStepperReturn {
  updateStep(state: StepState): void
  steps: Record<string, StepState>
}

export const [StepFormProvider, useStepFormContext] =
  createContext<StepFormContext>({
    name: 'StepFormContext',
    errorMessage:
      'useStepFormContext: `context` is undefined. Seems you forgot to wrap step form components in `<StepForm />`',
  })

import { FormProps } from './form'

export interface UseStepFormProps<
  TFieldValues extends FieldValues = FieldValues
> extends UseStepperProps,
    FormProps<TFieldValues> {}

export function useStepForm<TFieldValues extends FieldValues = FieldValues>(
  props: UseStepFormProps<TFieldValues>
) {
  const stepper = useStepper(props)

  const { activeStep, isLastStep, nextStep } = stepper

  const [steps, updateSteps] = React.useState({})

  const onSubmitStep: SubmitHandler<TFieldValues> = React.useCallback(
    async (data) => {
      if (isLastStep) {
        return props
          .onSubmit?.(data)
          .then(() => {
            const step = steps[activeStep]
            updateStep({
              ...step,
              isCompleted: true,
            })
          })
          .then(nextStep) // Show completed step
      }

      nextStep()
    },
    [activeStep, isLastStep]
  )

  const getFormProps = React.useCallback(
    (props) => {
      const step = steps[activeStep]
      return {
        onSubmit: onSubmitStep,
        schema: step?.schema,
      }
    },
    [steps, onSubmitStep, activeStep]
  )

  const updateStep = React.useCallback(
    (step) => {
      updateSteps((steps) => {
        return {
          ...steps,
          [step.name]: step,
        }
      })
    },
    [steps]
  )

  return {
    getFormProps,
    updateStep,
    steps,
    ...stepper,
  }
}

export type UseStepFormReturn = ReturnType<typeof useStepForm>

export interface UseFormStepProps {
  name: string
  schema?: any
}

export function useFormStep(props: UseFormStepProps): StepState {
  const { name, schema } = props
  const step = useStep({ name })

  const { steps, updateStep } = useStepFormContext()

  React.useEffect(() => {
    updateStep({ name, schema })
  }, [name, schema])

  return {
    ...step,
    ...(steps[name] || { name, schema }),
  }
}
