import {
  Badge,
  Button,
  Checkbox,
  HStack,
  Spinner,
  type SpinnerProps,
  Switch,
  VStack,
} from '@saas-ui/react'

const StyledSpinner = ({ colorPalette }: SpinnerProps) => {
  return (
    <Spinner
      color={{
        base: `${colorPalette}.500`,
        _dark: `${colorPalette}.500`,
      }}
    />
  )
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
          {colors.map((colorPalette) => (
            <Button
              key={colorPalette}
              colorPalette={colorPalette}
              variant="solid"
            >
              {colorPalette}
            </Button>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorPalette) => (
            <Button
              key={colorPalette}
              colorPalette={colorPalette}
              variant="outline"
            >
              {colorPalette}
            </Button>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorPalette) => (
            <Button
              key={colorPalette}
              colorPalette={colorPalette}
              variant="ghost"
            >
              {colorPalette}
            </Button>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorPalette) => (
            <Button
              key={colorPalette}
              colorPalette={colorPalette}
              variant="subtle"
            >
              {colorPalette}
            </Button>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorPalette) => (
            <Badge
              key={colorPalette}
              colorPalette={colorPalette}
              variant="solid"
            >
              {colorPalette}
            </Badge>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorPalette) => (
            <Badge key={colorPalette} colorPalette={colorPalette} mr={2}>
              {colorPalette}
            </Badge>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorPalette) => (
            <Badge
              key={colorPalette}
              colorPalette={colorPalette}
              variant="outline"
            >
              {colorPalette}
            </Badge>
          ))}
        </HStack>
        <HStack>
          {colors.map((colorPalette) => (
            <StyledSpinner key={colorPalette} colorPalette={colorPalette} />
          ))}
        </HStack>
        <HStack>
          <Switch colorPalette="primary" checked />

          {/* TODO: */}
          {/* <RadioGroup defaultValue="primary">
            <Radio colorPalette="primary" value="primary" />
          </RadioGroup> */}

          <Checkbox colorPalette="primary" checked />
        </HStack>
      </VStack>
    </>
  )
}

export default ComponentPreview
