import { ToggleGroup } from '@ark-ui/react'
import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  Field,
  Flex,
  Popover,
  Portal,
  RadioGroup,
  Select,
  Span,
  Stack,
  createListCollection,
} from '@chakra-ui/react'
import { type ColorPalette, colors } from '@saas-ui/chakra-preset/colors'
import {
  CloseButton,
  RadioCard,
  Slider,
  Tooltip,
  useColorMode,
} from '@saas-ui/react'
import { TbPaintFilled, TbPaletteFilled } from 'react-icons/tb'

import { useTheme } from './theme-provider'

const overlayEffects = createListCollection({
  items: [
    { label: 'Blur(10px)', value: 'blur(10px)' },
    { label: 'Blur(20px)', value: 'blur(20px)' },
    { label: 'None', value: 'none' },
  ],
})

const controlRadii = createListCollection({
  items: [
    { label: 'None', value: '0' },
    { label: 'SM', value: '0.75' },
    { label: 'MD', value: '1' },
    { label: 'LG', value: '1.5' },
    { label: 'Full', value: '9999' },
  ],
})

const panelRadii = createListCollection({
  items: [
    { label: 'None', value: '0' },
    { label: 'SM', value: '0.75' },
    { label: 'MD', value: '1' },
    { label: 'LG', value: '1.5' },
    { label: 'XL', value: '2' },
  ],
})

const indicatorRadii = createListCollection({
  items: [
    { label: 'None', value: '0' },
    { label: 'SM', value: '0.75' },
    { label: 'MD', value: '1' },
    { label: 'LG', value: '1.5' },
    { label: 'Full', value: '9999' },
  ],
})

const availableColors = Object.keys(colors).filter(
  (color) =>
    ![
      'transparent',
      'current',
      'black',
      'white',
      'blackAlpha',
      'whiteAlpha',
      'gray',
      'zinc',
      'neutral',
      'stone',
    ].includes(color),
)

const grayColors = ['gray', 'zinc', 'neutral', 'stone']

export const ThemePanel = () => {
  const { colorMode, setColorMode } = useColorMode()

  const {
    colorPalette,
    scaleFactor,
    overlayEffect,
    setColorPalette,
    setScaleFactor,
    setOverlayEffect,
    controlRadius,
    setControlRadius,
    panelRadius,
    setPanelRadius,
    indicatorRadius,
    setIndicatorRadius,
  } = useTheme()

  return (
    <Drawer.Root
      trapFocus={false}
      closeOnInteractOutside={false}
      preventScroll={false}
      modal={false}
    >
      <Drawer.Trigger asChild>
        <Button
          variant="outline"
          size="lg"
          bg="bg.overlay"
          position="fixed"
          zIndex="layer-4"
          top="32"
          right="4"
          color="accent.solid"
        >
          <TbPaletteFilled />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Positioner pointerEvents="none">
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Customize your theme</Drawer.Title>{' '}
              <Drawer.CloseTrigger asChild>
                <CloseButton />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body>
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Appearance</Field.Label>
                  <RadioCard.Root
                    value={colorMode}
                    onValueChange={({ value }) => setColorMode(value)}
                    display="flex"
                    flexDirection="row"
                    gap="2"
                    w="full"
                  >
                    <RadioCard.Item value="light">
                      <RadioCard.ItemIndicator />
                      <Span>Light</Span>
                    </RadioCard.Item>
                    <RadioCard.Item value="dark">
                      <RadioCard.ItemIndicator />
                      <Span>Dark</Span>
                    </RadioCard.Item>
                  </RadioCard.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Color palette</Field.Label>
                  <ToggleGroup.Root
                    asChild
                    value={[colorPalette]}
                    onValueChange={({ value }) =>
                      setColorPalette(value[0] as ColorPalette)
                    }
                  >
                    <Flex direction="row" flexWrap="wrap" gap="2">
                      {availableColors.map((color) => (
                        <Tooltip
                          key={color}
                          content={color}
                          positioning={{ placement: 'top' }}
                        >
                          <ToggleGroup.Item key={color} value={color} asChild>
                            <Box
                              bg={`${color}.solid`}
                              w="5"
                              h="5"
                              borderRadius="full"
                              _checked={{
                                outline: '2px',
                                outlineOffset: '2px',
                                outlineColor: `${color}.solid`,
                              }}
                              _hover={{}}
                            />
                          </ToggleGroup.Item>
                        </Tooltip>
                      ))}
                    </Flex>
                  </ToggleGroup.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Scale factor</Field.Label>

                  <ToggleGroup.Root
                    asChild
                    value={[scaleFactor.toString()]}
                    onValueChange={({ value }) =>
                      setScaleFactor(Number(value[0]))
                    }
                  >
                    <ButtonGroup attached variant="surface">
                      <ToggleGroup.Item value="0.9" asChild>
                        <Button
                          _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                        >
                          90%
                        </Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item value="0.95" asChild>
                        <Button
                          _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                        >
                          95%
                        </Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item value="1" asChild>
                        <Button
                          _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                        >
                          100%
                        </Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item value="1.05" asChild>
                        <Button
                          _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                        >
                          105%
                        </Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item value="1.1" asChild>
                        <Button
                          _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                        >
                          110%
                        </Button>
                      </ToggleGroup.Item>
                    </ButtonGroup>
                  </ToggleGroup.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Control radius</Field.Label>

                  <ToggleGroup.Root
                    asChild
                    value={[controlRadius.toString()]}
                    onValueChange={({ value }) =>
                      setControlRadius(Number(value[0]))
                    }
                  >
                    <ButtonGroup attached variant="surface">
                      {controlRadii.items.map((item) => (
                        <ToggleGroup.Item value={item.value} asChild>
                          <Button
                            _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                          >
                            {item.label}
                          </Button>
                        </ToggleGroup.Item>
                      ))}
                    </ButtonGroup>
                  </ToggleGroup.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Panel radius</Field.Label>

                  <ToggleGroup.Root
                    asChild
                    value={[panelRadius.toString()]}
                    onValueChange={({ value }) =>
                      setPanelRadius(Number(value[0]))
                    }
                  >
                    <ButtonGroup attached variant="surface">
                      {panelRadii.items.map((item) => (
                        <ToggleGroup.Item value={item.value} asChild>
                          <Button
                            _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                          >
                            {item.label}
                          </Button>
                        </ToggleGroup.Item>
                      ))}
                    </ButtonGroup>
                  </ToggleGroup.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Indicator radius</Field.Label>

                  <ToggleGroup.Root
                    asChild
                    value={[indicatorRadius.toString()]}
                    onValueChange={({ value }) =>
                      setIndicatorRadius(Number(value[0]))
                    }
                  >
                    <ButtonGroup attached variant="surface">
                      {indicatorRadii.items.map((item) => (
                        <ToggleGroup.Item value={item.value} asChild>
                          <Button
                            _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                          >
                            {item.label}
                          </Button>
                        </ToggleGroup.Item>
                      ))}
                    </ButtonGroup>
                  </ToggleGroup.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Overlay effect</Field.Label>
                  <Select.Root
                    collection={overlayEffects}
                    value={[overlayEffect ?? 'blur']}
                    onValueChange={({ value }) => setOverlayEffect(value[0])}
                  >
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select overlay effect" />
                    </Select.Trigger>
                    <Select.Content>
                      {overlayEffects.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Field.Root>
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
