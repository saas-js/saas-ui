import * as zod from 'zod'
import { FieldPath, FieldValues } from 'react-hook-form'
import { expectType } from 'tsd'

import {
  ArrayFieldPath,
  BaseFieldProps,
  FieldOverrides,
  GetBaseField,
} from '../src/types'
import { FormType } from '../src'

const schema = zod.object({
  name: zod.string(),
  age: zod.number(),
  addresses: zod.array(
    zod.object({
      street: zod.string(),
      city: zod.string(),
      state: zod.string(),
      zip: zod.string(),
    })
  ),
})

type Schema = zod.infer<typeof schema>

type TName = FieldPath<Schema>

type ExpectedType =
  | 'name'
  | 'age'
  | 'addresses'
  | `addresses.$`
  | `addresses.$.street`
  | `addresses.$.city`
  | `addresses.$.state`
  | `addresses.$.zip`

type TNameWithArray = ArrayFieldPath<TName>

const test: <Type>() => Type = () => {
  return {} as any
}

expectType<ExpectedType>(test<TNameWithArray>())

type CombinedNames = TName | TNameWithArray

expectType<CombinedNames>(test<'addresses.$'>())

expectType<CombinedNames>(test<'addresses.$.street'>())

expectType<CombinedNames>(test<`addresses.${number}.city`>())

type Test = FieldOverrides<
  any,
  {
    a: string
    b: {
      test: string
    }
    c: [
      {
        test: string
      },
    ]
  }
>

type Overrides = {
  a?: any
  b?: any
  c?: any
  'c.$'?: any
  'c.$.test'?: any
}

expectType<Overrides>(test<Test>())

type TypedForm = FormType<
  {
    custom: React.FC<
      Omit<BaseFieldProps<FieldValues, string>, 'customFieldProp'> & {
        customFieldProp?: string | undefined
      }
    >
  },
  { extraProp?: string },
  GetBaseField<{ infoLabel?: string }>
>
