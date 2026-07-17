import { NumberInput } from 'compositions/ui/number-input'

export const NumberInputWithStep = () => {
  return <NumberInput maxW="200px" defaultValue="2" step={3} />
}
