import * as React from 'react'
import { chakra, HTMLChakraProps } from '@chakra-ui/react'

export const Br: React.FC<HTMLChakraProps<'span'>> = (props) => {
  return (
    <chakra.span {...props}>
      <br />
    </chakra.span>
  )
}
