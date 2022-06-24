import * as React from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { createContext, MaybeRenderProp } from '@chakra-ui/react-utils'
import {
  useStepper,
  useStep,
  UseStepperProps,
  UseStepperReturn,
} from '@saas-ui/stepper'

export interface StepState {
  name: string
  schema?: any
  resolver?: any
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
> extends Omit<UseStepperProps, 'onChange'>,
    Omit<FormProps<TFieldValues>, 'children'> {
  children: MaybeRenderProp<UseStepFormReturn<TFieldValues>>
}

export interface UseStepFormReturn<
  TFieldValues extends FieldValues = FieldValues
> extends UseStepperReturn {
  getFormProps(): {
    onSubmit: SubmitHandler<TFieldValues>
    schema?: any
    resolver?: any
  }
  updateStep(step: any): void
  steps: Record<string, any>
}

export function useStepForm<TFieldValues extends FieldValues = FieldValues>(
  props: UseStepFormProps<TFieldValues>
): UseStepFormReturn<TFieldValues> {
  const { onChange, ...rest } = props
  const stepper = useStepper(rest)

  const { activeStep, isLastStep, nextStep } = stepper

  const [steps, updateSteps] = React.useState<Record<string, StepState>>({})

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

  const getFormProps = React.useCallback(() => {
    const step = steps[activeStep]
    return {
      onSubmit: onSubmitStep,
      schema: step?.schema,
      resolver: step?.resolver,
    }
  }, [steps, onSubmitStep, activeStep])

  const updateStep = React.useCallback(
    (step: StepState) => {
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

export interface UseFormStepProps {
  name: string
  schema?: any
  resolver?: any
}

export function useFormStep(props: UseFormStepProps): StepState {
  const { name, schema, resolver } = props
  const step = useStep({ name })

  const { steps, updateStep } = useStepFormContext()

  React.useEffect(() => {
    updateStep({ name, schema, resolver })
  }, [name, schema])

  return {
    ...step,
    ...(steps[name] || { name, schema }),
  }
}
