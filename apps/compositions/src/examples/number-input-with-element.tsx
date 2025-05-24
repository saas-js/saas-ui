import { NumberInput } from '@saas-ui/react'
import { LuDollarSign } from 'react-icons/lu'

export const NumberInputWithElement = () => {
  return (
    <NumberInput
      defaultValue="10"
      width="200px"
      startElement={<LuDollarSign />}
    />
  )
}
