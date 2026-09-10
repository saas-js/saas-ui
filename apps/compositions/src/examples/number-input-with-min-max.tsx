import { NumberInput } from 'compositions/ui/number-input'

export const NumberInputWithMinMax = () => {
  return <NumberInput width="200px" defaultValue="10" min={5} max={50} />
}
