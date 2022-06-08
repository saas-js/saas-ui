import {
  VStack,
  HStack,
  Button,
  Badge,
  Spinner,
  SpinnerProps,
  Switch,
  Radio,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react'

const StyledSpinner = ({ colorScheme }: SpinnerProps) => {
  const color = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.500`)
  return <Spinner color={color} />
}

const ComponentPreview = () => {
  const colors = [
    'gray',
    'red',
    'green',
    'blue',
    'teal',
    'pink',
    'purple',
    'cyan',
    'orange',
    'yellow',
  ]
  return (
    <>
      <VStack spacing="8" alignItems="stretch">
        <HStack>
          {colors.map((colorScheme) => (
            <Button key={colorScheme} colorScheme={colorScheme} variant="solid">
              {colorScheme}
            </Button>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <Button
              key={colorScheme}
              colorScheme={colorScheme}
              variant="outline"
            >
              {colorScheme}
            </Button>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <Button
              key={colorScheme}
              colorScheme={colorScheme}
              variant="subtle"
            >
              {colorScheme}
            </Button>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <Badge key={colorScheme} colorScheme={colorScheme} variant="solid">
              {colorScheme}
            </Badge>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <Badge key={colorScheme} colorScheme={colorScheme} mr={2}>
              {colorScheme}
            </Badge>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <Badge
              key={colorScheme}
              colorScheme={colorScheme}
              variant="outline"
            >
              {colorScheme}
            </Badge>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <StyledSpinner key={colorScheme} colorScheme={colorScheme} />
          ))}
        </HStack>
        <HStack>
          <Switch isChecked />

          <Radio isChecked />

          <Checkbox isChecked />
        </HStack>
      </VStack>
    </>
  )
}

export default ComponentPreview
