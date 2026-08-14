import type { NativeSelectProps } from './native-select.tsx'

const controlledNativeSelect = {
  value: 'react',
  onChange(event) {
    event.currentTarget.value
  },
} satisfies NativeSelectProps

void controlledNativeSelect
