import * as React from 'react'

import {
  DefaultFields,
  Field,
  FieldProps,
  Select,
  SelectButton,
  SelectList,
  SelectProps,
  createField,
} from '../src'
import { forwardRef } from '@chakra-ui/react'
import { expectTypeOf } from 'vitest'

export const CustomField = createField<SelectProps>(
  forwardRef((props, ref) => {
    return (
      <Select ref={ref} {...props}>
        <SelectButton />
        <SelectList />
      </Select>
    )
  }),
  {
    isControlled: true,
  }
)

type PropTypes = React.ComponentProps<typeof CustomField>

test('should have correct event handler type', async () => {
  expectTypeOf<PropTypes['onChange']>().toEqualTypeOf<
    ((value: string | string[]) => void) | undefined
  >()
})

const selectProps: FieldProps = {
  name: 'test',
  type: 'select',
}

const inputProps: FieldProps = {
  name: 'test',
  type: 'text',
}

const numberProps: FieldProps = {
  name: 'test',
  type: 'number',
}

test('should have correct event handler type on Field', async () => {
  expectTypeOf<(typeof selectProps)['onChange']>().toEqualTypeOf<
    ((value: string | string[]) => void) | undefined
  >()

  expectTypeOf<(typeof inputProps)['onChange']>().toEqualTypeOf<
    React.ChangeEventHandler<HTMLInputElement> | undefined
  >()

  expectTypeOf<(typeof numberProps)['onChange']>().toEqualTypeOf<
    ((valueAsString: string, valueAsNumber: number) => void) | undefined
  >()
})
