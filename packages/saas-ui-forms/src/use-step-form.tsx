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
  onSubmit?: FormStepSubmitHandler
}

export type FormStepSubmitHandler<
  TFieldValues extends FieldValues = FieldValues
> = (data: TFieldValues, stepper: UseStepperReturn) => Promise<void>

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
      try {
        const step = steps[activeStep]

        if (isLastStep) {
          await props.onSubmit?.(data)

          updateStep({
            ...step,
            isCompleted: true,
          })

          nextStep() // show completed step
          return
        }

        await step.onSubmit?.(data, stepper)

        nextStep()
      } catch (e) {
        // Step submission failed.
      }
    },
    [steps, activeStep, isLastStep]
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
  onSubmit?: FormStepSubmitHandler
}

export function useFormStep(props: UseFormStepProps): StepState {
  const { name, schema, resolver, onSubmit } = props
  const step = useStep({ name })

  const { steps, updateStep } = useStepFormContext()

  React.useEffect(() => {
    updateStep({ name, schema, resolver, onSubmit })
  }, [name, schema])

  return {
    ...step,
    ...(steps[name] || { name, schema }),
  }
}
