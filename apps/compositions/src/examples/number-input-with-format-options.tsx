import { Stack } from '@chakra-ui/react'
import { NumberInput } from '@saas-ui/react'

export const NumberInputWithFormatOptions = () => {
  return (
    <Stack gap="5" maxW="200px">
      <NumberInput
        defaultValue="5"
        step={0.01}
        formatOptions={{
          style: 'percent',
        }}
      />

      <NumberInput
        defaultValue="45"
        formatOptions={{
          style: 'currency',
          currency: 'EUR',
          currencyDisplay: 'code',
          currencySign: 'accounting',
        }}
      />

      <NumberInput
        defaultValue="4"
        formatOptions={{
          style: 'unit',
          unit: 'inch',
          unitDisplay: 'long',
        }}
      />
    </Stack>
  )
}
