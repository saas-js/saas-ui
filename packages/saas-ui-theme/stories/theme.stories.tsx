import {
  Container,
  HStack,
  Stack,
  Checkbox,
  Progress,
  Radio,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Button,
  Badge,
  Tag,
  Spinner,
} from '@chakra-ui/react'
import * as React from 'react'

export default {
  title: 'Theme/Showcase',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const Showcase = () => (
  <Stack align="start" spacing="8">
    <Progress width="full" value={40} />
    <Progress width="full" colorScheme="secondary" value={100} />

    <Slider aria-label="slider-ex-1" defaultValue={30}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>

    <HStack spacing="8">
      <Radio isChecked />
      <Checkbox isChecked />
      <Switch isChecked />
    </HStack>

    <HStack>
      <Button colorScheme="primary" variant="solid">
        Button
      </Button>
      <Button colorScheme="primary" variant="outline">
        Button
      </Button>
      <Button colorScheme="primary" variant="subtle">
        Button
      </Button>
      <Button colorScheme="primary" variant="ghost">
        Button
      </Button>
      <Button colorScheme="primary" variant="link">
        Button
      </Button>
    </HStack>

    <HStack>
      <Badge variant="outline" colorScheme="primary">
        Default
      </Badge>
      <Badge variant="solid" colorScheme="primary">
        Success
      </Badge>
      <Badge variant="subtle" colorScheme="primary">
        Removed
      </Badge>
    </HStack>

    <HStack>
      <Tag variant="outline" colorScheme="primary">
        Default
      </Tag>
      <Tag variant="solid" colorScheme="primary">
        Success
      </Tag>
      <Tag variant="subtle" colorScheme="primary">
        Removed
      </Tag>
    </HStack>

    <HStack>
      <Spinner color="primary.500" />
    </HStack>
  </Stack>
)
