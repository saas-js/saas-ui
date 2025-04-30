import * as React from 'react'

import { createContext } from '@chakra-ui/react'
import {
  StepperProvider,
  type UseStepperProps,
  type UseStepperReturn,
  useStep,
  useStepper,
} from '@saas-ui/core/steps'
import {
  FieldValues,
  type SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'

import type { FormProps } from './form'
import { FormStep, FormStepProps } from './step-form'
import {
  type StandardSchemaV1,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from './use-form'

export type StepOptions<
  TStepId extends string = string,
  TFieldValues extends FieldValues = FieldValues,
  TTransformedValues = TFieldValues,
> = {
  /**
   * The step id
   */
  id: TStepId
  /**
   * Schema
   */
  schema?: StandardSchemaV1<TFieldValues, TTransformedValues>
  /**
   * Default values
   */
  defaultValues?: TFieldValues
  /**
   * On submit
   */
  onSubmit?: FormStepSubmitHandler<TFieldValues>
}

export interface StepState<
  TFieldValues extends FieldValues = FieldValues,
  TTransformedValues = TFieldValues,
> {
  id: string
  schema?: StandardSchemaV1<TFieldValues, TTransformedValues>
  defaultValues: TFieldValues
  active?: boolean
  completed?: boolean
  onSubmit?: FormStepSubmitHandler<TTransformedValues>
}

export type FormStepSubmitHandler<TValues> = (
  data: TValues,
  stepper: UseStepperReturn,
) => Promise<void>

export interface StepFormContext extends UseStepperReturn {
  updateStep(state: Partial<StepState>): void
  steps: Record<string, StepState>
}

export const [StepFormProvider, useStepFormContext] =
  createContext<StepFormContext>({
    name: 'StepFormContext',
    errorMessage:
      'useStepFormContext: `context` is undefined. Seems you forgot to wrap step form components in `<StepForm />`',
  })

type StepId<T extends { [k: number]: { readonly id: string } }> =
  T[number]['id']

export interface UseStepFormProps<
  TSteps extends StepOptions[] = StepOptions[],
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TTransformedValues = TFieldValues,
> extends Omit<UseStepperProps, 'onChange'>,
    Omit<
      UseFormProps<TFieldValues, TContext, TTransformedValues>,
      'schema' | 'onSubmit' | 'onInvalid'
    > {
  onSubmit: SubmitHandler<any>
  onInvalid?: SubmitErrorHandler<any>
  onStepChange?(details: { step: TSteps[number]['id']; index: number }): void
  steps: TSteps
}

export interface UseStepFormReturn<
  TSteps extends StepOptions[] = StepOptions[],
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> extends UseStepperReturn,
    UseFormReturn<TFieldValues, TContext, TTransformedValues> {
  updateStep(step: any): void
  steps: Record<string, any>
  Step: React.FC<FormStepProps<StepId<TSteps>>>
}

export function useStepForm<
  TSteps extends StepOptions[] = StepOptions[],
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TTransformedValues = TFieldValues,
>(
  props: UseStepFormProps<TSteps, TFieldValues, TContext, TTransformedValues>,
): UseStepFormReturn<TSteps, TFieldValues, TContext, TTransformedValues> {
  const {
    steps: stepsOptions,
    step,
    onStepChange,
    completed,
    ...formProps
  } = props
  const stepper = useStepper({
    completed,
    steps: React.useMemo(() => stepsOptions.map((s) => s.id), [stepsOptions]),
    step,
    onChange: (index) => {
      onStepChange?.({ step: stepsOptions[index].id, index })
    },
  })

  const [options] = React.useState<TSteps | undefined>(stepsOptions)

  const { activeStep, isLastStep, nextStep } = stepper

  const [steps, updateSteps] = React.useState<Record<string, StepState>>({})

  const mergedData = React.useRef({} as TTransformedValues)

  const onSubmitStep: SubmitHandler<TFieldValues> = React.useCallback(
    async (data) => {
      try {
        const step = steps[activeStep]

        mergedData.current = {
          ...mergedData.current,
          ...data,
        }

        if (isLastStep) {
          await props.onSubmit?.(mergedData.current)

          updateStep({
            ...step,
            completed: true,
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
    [steps, activeStep, isLastStep, mergedData],
  )

  const currentStep = React.useMemo(
    () => steps[activeStep],
    [steps, activeStep],
  )

  const form = useForm<any>({
    ...formProps,
    schema: currentStep?.schema,
    resolver: formProps.resolver,
    defaultValues: currentStep?.defaultValues,
    onSubmit: onSubmitStep,
  })

  const updateStep = React.useCallback(
    (step: StepState) => {
      const stepOptions = options?.find((s) => s.id === step.id)
      if (!stepOptions) {
        throw new Error(`Step ${step.id} not configured`)
      }

      updateSteps((steps) => {
        return {
          ...steps,
          [step.id]: {
            ...step,
            schema: stepOptions?.schema,
          },
        }
      })
    },
    [steps, options],
  )

  const ctx = React.useMemo(
    () => ({
      ...form,
      ...stepper,
      updateStep,
      steps,
    }),
    [form, stepper, updateStep, steps],
  )

  const FormComponent = React.useMemo(
    () =>
      React.forwardRef<HTMLFormElement, Omit<FormProps<any, any, any>, 'form'>>(
        function FormComponent(props, ref) {
          return (
            <StepperProvider value={stepper}>
              <StepFormProvider value={ctx}>
                <form.Form {...props} ref={ref} />
              </StepFormProvider>
            </StepperProvider>
          )
        },
      ),
    [stepper, ctx, form.Form],
  )

  console.log('ctx', ctx)

  return {
    ...ctx,
    Form: FormComponent,
    Step: FormStep,
  } as UseStepFormReturn<TSteps, TFieldValues, TContext, TTransformedValues>
}

export interface UseFormStepProps<TStepId extends string = string> {
  id: TStepId
}

export function useFormStep<TStepId extends string = string>(
  props: UseFormStepProps<TStepId>,
): StepState {
  const { id } = props

  const step = useStep({ id })

  const { steps } = useStepFormContext()

  return {
    ...step,
    ...(steps[id] || { id }),
  }
}
