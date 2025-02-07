import { Text } from '@chakra-ui/react'

import { Input } from '../input'
import { InputGroup } from './input-group'

export default {
  title: 'Components/InputGroup',
  component: InputGroup,
}

export const Basic = () => {
  return (
    <InputGroup
      startElement={<Text>https://</Text>}
      endElement={<Text>.com</Text>}
    >
      <Input ps="60px" />
    </InputGroup>
  )
}
