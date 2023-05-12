import { useMemo } from 'react'
import { forwardRef } from '@chakra-ui/react'
import { FormType } from './create-form'
import {
  ArrayField,
  DisplayIf,
  FieldProps,
  FieldValues,
  Form,
  ObjectField,
} from './'
import { Field } from './field'
import { StepFormProps, FormStep } from './step-form'
import {
  StepFormProvider,
  UseStepFormProps,
  useStepForm,
} from './use-step-form'
import { YupFormType } from '../yup/src/create-yup-form'
import { ZodFormType } from '../zod/src/create-zod-form'
import { StepperProvider } from '@saas-ui/core'
import { runIfFn } from '@chakra-ui/utils'

// /**
//  * @todo make this dynamic to support other schema types
//  */
type MergeStepFormProps<T> = T extends YupFormType<
  infer FieldDefs,
  infer ExtraProps,
  infer ExtraOverrides,
  'yup'
>
  ? YupFormType<
      FieldDefs,
      ExtraProps & Omit<StepFormProps, 'children'>,
      ExtraOverrides
    >
  : T extends ZodFormType<
      infer FieldDefs,
      infer ExtraProps,
      infer ExtraOverrides,
      'zod'
    >
  ? ZodFormType<
      FieldDefs,
      ExtraProps & Omit<StepFormProps, 'children'>,
      ExtraOverrides
    >
  : T extends FormType<infer FieldDefs, infer ExtraProps, infer ExtraOverrides>
  ? FormType<
      FieldDefs,
      ExtraProps & Omit<StepFormProps, 'children'>,
      ExtraOverrides
    >
  : never

export type DefaultFormType<
  FieldDefs = any,
  ExtraProps = object,
  ExtraOverrides = object
> = (<
  TFieldValues extends Record<string, any> = any,
  TContext extends object = object,
  TSchema = unknown
>(
  props: any
) => React.ReactElement) & {
  displayName?: string
  id?: string
}

// export function createStepForm<
//   FieldDefs = any,
//   ExtraProps = object,
//   ExtraOverrides = object,
//   TFormType extends DefaultFormType<
//     FieldDefs,
//     ExtraProps,
//     ExtraOverrides
//   > = DefaultFormType<FieldDefs, ExtraProps, ExtraOverrides>
// >(Form: TFormType) {
//   const StepForm = forwardRef<any, 'div'>((props, ref) => {
//     const { children, ...rest } = props

//     const stepper = useStepForm(props)

//     const { getFormProps, ...ctx } = stepper

//     const context = useMemo(() => ctx, [ctx])

//     return (
//       <StepperProvider value={context}>
//         <StepFormProvider value={context}>
//           <Form ref={ref} {...rest} {...getFormProps()}>
//             {runIfFn(children, {
//               ...stepper,
//               FormStep,
//               Field,
//             })}
//           </Form>
//         </StepFormProvider>
//       </StepperProvider>
//     )
//   }) as MergeStepFormProps<TFormType>

//   StepForm.displayName = `Step${Form.displayName || Form.name}`

//   return StepForm
// }

export function createStepForm<
  FieldDefs = any,
  ExtraProps = object,
  ExtraOverrides = object,
  TFormType extends DefaultFormType<
    FieldDefs,
    ExtraProps,
    ExtraOverrides
  > = DefaultFormType<FieldDefs, ExtraProps, ExtraOverrides>
>(Form: TFormType) {
  const StepForm = forwardRef<any, 'div'>((props, ref) => {
    const { children, ...rest } = props

    const stepper = useStepForm(props)

    const { getFormProps, ...ctx } = stepper

    const context = useMemo(() => ctx, [ctx])

    return (
      <StepperProvider value={context}>
        <StepFormProvider value={context}>
          <Form ref={ref} {...rest} {...getFormProps()}>
            {runIfFn(children, {
              ...stepper,
              Field: Field as any,
              DisplayIf: DisplayIf as any,
              ArrayField: ArrayField as any,
              ObjectField: ObjectField as any,
            })}
          </Form>
        </StepFormProvider>
      </StepperProvider>
    )
  }) as (<
    TFieldValues extends FieldValues = FieldValues,
    TContext extends object = object,
    TFieldTypes = FieldProps<TFieldValues>
  >(
    props: UseStepFormProps<TFieldValues, TContext, TFieldTypes> & {
      ref?: React.ForwardedRef<HTMLFormElement>
    }
  ) => React.ReactElement) & {
    displayName?: string
    id?: string
  }

  StepForm.displayName = `Step${Form.displayName || Form.name}`

  return StepForm
}
