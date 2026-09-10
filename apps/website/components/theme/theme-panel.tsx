import { ToggleGroup } from '@ark-ui/react'
import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  Field,
  Flex,
  HStack,
  IconButton,
  Portal,
  Select,
  Span,
  Stack,
  createListCollection,
} from '@chakra-ui/react'
import { TbArrowsShuffle, TbPaletteFilled, TbRestore } from 'react-icons/tb'

import { useColorMode } from '#components/setup/color-mode/color-mode'
import { CloseButton } from '#components/ui/close-button'
import { RadioCard } from '#components/ui/radio-card'
import { Slider } from '#components/ui/slider'
import { Tooltip } from '#components/ui/tooltip'

import {
  type AccentPalette,
  accentPalettes,
  appearancePresets,
  formatOklch,
} from './appearance'
import { bodyFontOptions, headingFontOptions } from './fonts'
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

const contrastLevels = [
  { label: 'Soft', value: 'soft' },
  { label: 'Normal', value: 'normal' },
  { label: 'Strong', value: 'strong' },
] as const

const defaultFontItem = { label: 'Inter (default)', value: 'default' }

const headingFonts = createListCollection({
  items: [
    defaultFontItem,
    ...headingFontOptions.map((font) => ({
      label: font.label,
      value: font.id,
    })),
  ],
})

const bodyFonts = createListCollection({
  items: [
    defaultFontItem,
    ...bodyFontOptions.map((font) => ({
      label: font.label,
      value: font.id,
    })),
  ],
})

function PresetSwatch(props: { colors: string[] }) {
  return (
    <HStack gap="0">
      {props.colors.map((color, index) => (
        <Box
          key={index}
          boxSize="4"
          borderRadius="full"
          borderWidth="1px"
          borderColor="border"
          style={{ background: color }}
          marginStart={index > 0 ? '-1.5' : undefined}
        />
      ))}
    </HStack>
  )
}

export const ThemePanel = () => {
  const { colorMode, setColorMode } = useColorMode()

  const {
    scaleFactor,
    overlayEffect,
    setScaleFactor,
    setOverlayEffect,
    controlRadius,
    setControlRadius,
    panelRadius,
    setPanelRadius,
    indicatorRadius,
    setIndicatorRadius,
    base,
    accent,
    sidebar,
    preset,
    accentPalette,
    headingFont,
    bodyFont,
    setBase,
    setAccentPalette,
    setSidebar,
    setHeadingFont,
    setBodyFont,
    applyPreset,
    randomize,
    reset,
  } = useTheme()

  const sidebarStyle =
    sidebar.type === 'solid'
      ? 'solid'
      : sidebar.type === 'tonal'
        ? 'tonal'
        : 'base'

  const setSidebarStyle = (style: string) => {
    if (style === 'solid') {
      setSidebar({
        type: 'solid',
        l: accent.l,
        c: accent.c,
        h: accent.h,
        foreground: accent.foreground,
      })
    } else if (style === 'tonal') {
      setSidebar({
        type: 'tonal',
        h: base.h,
        c: Math.max(base.c * 1.5, 0.016),
        contrast: 'normal',
      })
    } else {
      setSidebar({ type: 'base' })
    }
  }

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
            <Drawer.Header alignItems="center" gap="2">
              <Drawer.Title flex="1">Customize your theme</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <CloseButton />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body>
              <Stack gap="4">
                <HStack gap="2">
                  <Button
                    variant="surface"
                    flex="1"
                    onClick={() => randomize()}
                  >
                    <TbArrowsShuffle />
                    Randomize
                  </Button>
                  <Tooltip content="Reset to defaults">
                    <IconButton
                      variant="surface"
                      aria-label="Reset theme"
                      onClick={() => reset()}
                    >
                      <TbRestore />
                    </IconButton>
                  </Tooltip>
                </HStack>

                <Field.Root>
                  <Field.Label>Color mode</Field.Label>
                  <RadioCard.Root
                    value={colorMode}
                    onValueChange={({ value }) => {
                      if (value === 'light' || value === 'dark') {
                        setColorMode(value)
                      }
                    }}
                    display="flex"
                    flexDirection="row"
                    gap="2"
                    w="full"
                  >
                    <RadioCard.Item value="light" label="Light" />
                    <RadioCard.Item value="dark" label="Dark" />
                  </RadioCard.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Appearance</Field.Label>
                  <RadioCard.Root
                    value={preset ?? ''}
                    onValueChange={({ value }) => {
                      const selected = appearancePresets.find(
                        (item) => item.id === value,
                      )
                      if (selected) {
                        applyPreset(selected)
                      }
                    }}
                    display="grid"
                    gridTemplateColumns="repeat(2, 1fr)"
                    gap="2"
                    w="full"
                  >
                    {appearancePresets.map((item) => (
                      <RadioCard.Item
                        key={item.id}
                        value={item.id}
                        indicator={null}
                        icon={
                          <PresetSwatch
                            colors={[
                              formatOklch({
                                l: colorMode === 'dark' ? 0.25 : 0.9,
                                c: Math.min(item.appearance.base.c * 4, 0.06),
                                h: item.appearance.base.h,
                              }),
                              formatOklch(item.appearance.accent),
                            ]}
                          />
                        }
                        label={item.label}
                      />
                    ))}
                  </RadioCard.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Accent color</Field.Label>
                  <ToggleGroup.Root
                    asChild
                    value={accentPalette ? [accentPalette] : []}
                    onValueChange={({ value }) => {
                      if (value[0]) {
                        setAccentPalette(value[0] as AccentPalette)
                      }
                    }}
                  >
                    <Flex direction="row" flexWrap="wrap" gap="2">
                      {accentPalettes.map((color) => (
                        <Tooltip
                          key={color}
                          content={color}
                          positioning={{ placement: 'top' }}
                        >
                          <ToggleGroup.Item value={color} asChild>
                            <Box
                              aria-label={color}
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
                  <Field.Label>
                    Base hue
                    <Span color="fg.muted" ms="auto">
                      {Math.round(base.h)}°
                    </Span>
                  </Field.Label>
                  <Slider
                    size="sm"
                    w="full"
                    min={0}
                    max={360}
                    step={1}
                    value={[base.h]}
                    onValueChange={({ value }) =>
                      setBase({ ...base, h: value[0]! })
                    }
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>
                    Base tint
                    <Span color="fg.muted" ms="auto">
                      {base.c.toFixed(3)}
                    </Span>
                  </Field.Label>
                  <Slider
                    size="sm"
                    w="full"
                    min={0}
                    max={0.03}
                    step={0.001}
                    value={[base.c]}
                    onValueChange={({ value }) =>
                      setBase({ ...base, c: value[0]! })
                    }
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Contrast</Field.Label>
                  <ToggleGroup.Root
                    asChild
                    value={[base.contrast]}
                    onValueChange={({ value }) => {
                      if (value[0]) {
                        setBase({
                          ...base,
                          contrast: value[0] as typeof base.contrast,
                        })
                      }
                    }}
                  >
                    <ButtonGroup attached variant="surface">
                      {contrastLevels.map((item) => (
                        <ToggleGroup.Item
                          key={item.value}
                          value={item.value}
                          asChild
                        >
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
                  <Field.Label>Sidebar</Field.Label>
                  <ToggleGroup.Root
                    asChild
                    value={[sidebarStyle]}
                    onValueChange={({ value }) => {
                      if (value[0]) {
                        setSidebarStyle(value[0])
                      }
                    }}
                  >
                    <ButtonGroup attached variant="surface">
                      <ToggleGroup.Item value="base" asChild>
                        <Button
                          _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                        >
                          Default
                        </Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item value="tonal" asChild>
                        <Button
                          _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                        >
                          Tinted
                        </Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item value="solid" asChild>
                        <Button
                          _checked={{ bg: 'bg.muted', boxShadow: 'none' }}
                        >
                          Solid
                        </Button>
                      </ToggleGroup.Item>
                    </ButtonGroup>
                  </ToggleGroup.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Heading font</Field.Label>
                  <Select.Root
                    collection={headingFonts}
                    value={[headingFont ?? 'default']}
                    onValueChange={({ value }) =>
                      setHeadingFont(value[0] === 'default' ? null : value[0]!)
                    }
                  >
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select heading font" />
                    </Select.Trigger>
                    <Select.Content>
                      {headingFonts.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Body font</Field.Label>
                  <Select.Root
                    collection={bodyFonts}
                    value={[bodyFont ?? 'default']}
                    onValueChange={({ value }) =>
                      setBodyFont(value[0] === 'default' ? null : value[0]!)
                    }
                  >
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select body font" />
                    </Select.Trigger>
                    <Select.Content>
                      {bodyFonts.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
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
                        <ToggleGroup.Item
                          key={item.value}
                          value={item.value}
                          asChild
                        >
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
                        <ToggleGroup.Item
                          key={item.value}
                          value={item.value}
                          asChild
                        >
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
                        <ToggleGroup.Item
                          key={item.value}
                          value={item.value}
                          asChild
                        >
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
