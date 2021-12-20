import {
  chakra,
  HTMLChakraProps,
  Text,
  TextProps,
  useColorModeValue,
} from '@chakra-ui/react'

export const Em: React.FC<HTMLChakraProps<'em'>> = ({ children, ...props }) => {
  return (
    <Text color={useColorModeValue('black', 'white')} as="em" {...props}>
      {children}
    </Text>
  )
}

// @todo make this configurable
export const Br: React.FC<HTMLChakraProps<'span'>> = (props) => {
  return (
    <chakra.span {...props}>
      <br />
    </chakra.span>
  )
}
