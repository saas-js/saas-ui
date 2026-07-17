import {
  Badge,
  Button,
  Checkbox,
  HStack,
  RadioGroup,
  Spinner,
  Switch,
  VStack,
} from '@chakra-ui/react'

const StyledSpinner = ({ colorPalette }: { colorPalette: string }) => {
  return <Spinner color={`${colorPalette}.500`} />
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
      <VStack gap="8" alignItems="stretch">
        <HStack>
          {colors.map((colorScheme) => (
            <Button
              key={colorScheme}
              colorPalette={colorScheme}
              variant="solid"
            >
              {colorScheme}
            </Button>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <Button
              key={colorScheme}
              colorPalette={colorScheme}
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
              colorPalette={colorScheme}
              variant="ghost"
            >
              {colorScheme}
            </Button>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <Button
              key={colorScheme}
              colorPalette={colorScheme}
              variant="subtle"
            >
              {colorScheme}
            </Button>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <Badge key={colorScheme} colorPalette={colorScheme} variant="solid">
              {colorScheme}
            </Badge>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <Badge key={colorScheme} colorPalette={colorScheme} mr={2}>
              {colorScheme}
            </Badge>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <Badge
              key={colorScheme}
              colorPalette={colorScheme}
              variant="outline"
            >
              {colorScheme}
            </Badge>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorScheme) => (
            <StyledSpinner key={colorScheme} colorPalette={colorScheme} />
          ))}
        </HStack>
        <HStack>
          <Switch.Root defaultChecked>
            <Switch.HiddenInput />
            <Switch.Control />
          </Switch.Root>

          <RadioGroup.Root defaultValue="checked">
            <RadioGroup.Item value="checked">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
            </RadioGroup.Item>
          </RadioGroup.Root>

          <Checkbox.Root defaultChecked>
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox.Root>
        </HStack>
      </VStack>
    </>
  )
}

export default ComponentPreview
