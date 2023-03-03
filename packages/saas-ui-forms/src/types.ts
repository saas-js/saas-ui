import { FieldPath, FieldValues } from 'react-hook-form'

export type FieldOption = { label: string; value: string }
export type FieldOptions<TOption extends FieldOption = FieldOption> =
  | Array<string>
  | Array<TOption>

export type FieldType<Props = any> = React.ElementType<Props>

type TypeProps<P extends FieldType, T> = React.ComponentPropsWithoutRef<P> & {
  type: T
}

export type FieldTypeProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldTypes extends Record<string, FieldType> = never,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> =
  | {
      [Property in keyof TFieldTypes]: TypeProps<
        TFieldTypes[Property],
        Property
      > & { name: TName }
    }[keyof TFieldTypes]
