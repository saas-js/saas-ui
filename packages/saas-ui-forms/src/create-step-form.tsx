import React, { useMemo } from 'react'
import { forwardRef } from '@chakra-ui/react'
import {
  ArrayField,
  DisplayIf,
  FieldProps,
  FieldValues,
  FieldsProvider,
  GetFieldResolver,
  ObjectField,
  defaultFieldTypes,
} from './'
import { Form } from './form'
import { Field } from './field'
import { FormStep, StepsOptions } from './step-form'
import {
  StepFormProvider,
  UseStepFormProps,
  useStepForm,
} from './use-step-form'
import { StepperProvider } from '@saas-ui/core'
import { runIfFn } from '@chakra-ui/utils'
import { GetResolver } from './form'
import { GetBaseField, WithStepFields } from './types'

export type StepFormType<
  FieldDefs,
  ExtraProps = object,
  ExtraFieldProps extends object = object,
  ExtraOverrides = object,
> = (<
  TSteps extends StepsOptions<any> = StepsOptions<any>,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TFieldTypes = FieldProps<TFieldValues, ExtraFieldProps>,
>(
  props: WithStepFields<
    UseStepFormProps<TSteps, TFieldValues, TContext>,
    FieldDefs,
    ExtraOverrides
  > & {
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps
) => React.ReactElement) & {
  displayName?: string
  id?: string
}

export interface CreateStepFormProps<
  FieldDefs,
  TGetBaseField extends GetBaseField = GetBaseField,
> {
  resolver?: GetResolver
  fieldResolver?: GetFieldResolver
  fields?: FieldDefs extends Record<string, React.FC<any>> ? FieldDefs : never
  getBaseField?: TGetBaseField
}

export function createStepForm<
  FieldDefs,
  TGetBaseField extends GetBaseField<any> = GetBaseField<any>,
>({
  fields,
  resolver,
  fieldResolver,
  getBaseField,
}: CreateStepFormProps<FieldDefs, TGetBaseField> = {}) {
  type ExtraFieldProps =
    TGetBaseField extends GetBaseField<infer ExtraFieldProps>
      ? ExtraFieldProps
      : object

  const StepForm = forwardRef<any, 'div'>((props, ref) => {
    const { children, steps, ...rest } = props

    const stepper = useStepForm({
      resolver,
      fieldResolver,
      ...props,
    })

    const { getFormProps, ...ctx } = stepper

    const context = useMemo(() => ctx, [ctx])

    const fieldsContext = {
      fields: {
        ...defaultFieldTypes,
        ...fields,
      },
      getBaseField,
    }

    return (
      <StepperProvider value={context}>
        <StepFormProvider value={context}>
          <FieldsProvider value={fieldsContext}>
            <Form ref={ref} {...rest} {...getFormProps()}>
              {runIfFn(children, {
                ...stepper,
                Field: Field as any,
                FormStep: FormStep as any,
                DisplayIf: DisplayIf as any,
                ArrayField: ArrayField as any,
                ObjectField: ObjectField as any,
              })}
            </Form>
          </FieldsProvider>
        </StepFormProvider>
      </StepperProvider>
    )
  }) as StepFormType<FieldDefs, object, ExtraFieldProps>

  StepForm.displayName = `Step${Form.displayName || Form.name}`

  return StepForm
}
