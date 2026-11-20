'use client'

import * as React from 'react'

import {
  Box,
  Button,
  Field,
  HStack,
  Heading,
  Input,
  SegmentGroup,
  Separator,
  Slider,
  Stack,
  Switch,
  Text,
  chakra,
} from '@chakra-ui/react'
import { paletteSeeds } from '@saas-ui/appearance'
import { FaXTwitter } from 'react-icons/fa6'
import { FiLink, FiRotateCcw } from 'react-icons/fi'

import { contrastRatio, formatOklch, normalizeHex, oklchToHex } from '#/lib/color'
import {
  CATALOG_MAX_CHROMA,
  type ForegroundMode,
  MAX_BASE_CHROMA,
  chromaticNames,
  foregroundColor,
} from '#/lib/palette'

import { usePalette } from './provider'
import { toast } from './toaster'

const swatches = chromaticNames.map((name) => {
  const seed = paletteSeeds[name]
  return { name, hex: oklchToHex({ l: seed.l, c: seed.c, h: seed.h }) }
})

const hueGradient = `linear-gradient(to right, ${Array.from(
  { length: 13 },
  (_, i) => `oklch(0.7 0.12 ${i * 30})`,
).join(', ')})`

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap="5">
      <Heading as="h2" size="sm">
        {props.title}
      </Heading>
      {props.children}
    </Stack>
  )
}

function BrandColorField() {
  const { state, update } = usePalette()
  const [text, setText] = React.useState(state.color)

  // Follow changes made elsewhere (swatches, reset) without clobbering typing.
  React.useEffect(() => {
    setText((current) =>
      normalizeHex(current) === state.color ? current : state.color,
    )
  }, [state.color])

  const invalid = normalizeHex(text) === null

  return (
    <Field.Root invalid={invalid}>
      <Field.Label>Brand color</Field.Label>
      <HStack width="full" gap="2">
        <chakra.input
          type="color"
          aria-label="Pick brand color"
          value={state.color}
          onChange={(event) => update({ color: event.target.value })}
          boxSize="10"
          flexShrink="0"
          p="0"
          borderWidth="1px"
          borderRadius="l2"
          cursor="pointer"
          bg="transparent"
          css={{
            '&::-webkit-color-swatch-wrapper': { padding: 0 },
            '&::-webkit-color-swatch': { border: 'none', borderRadius: 'inherit' },
            '&::-moz-color-swatch': { border: 'none', borderRadius: 'inherit' },
          }}
        />
        <Input
          value={text}
          spellCheck={false}
          fontFamily="mono"
          onChange={(event) => {
            setText(event.target.value)
            const hex = normalizeHex(event.target.value)
            if (hex) update({ color: hex })
          }}
          onBlur={() => setText(state.color)}
        />
      </HStack>
      <Field.ErrorText>Enter a hex color, like #4f46e5</Field.ErrorText>
      <HStack gap="1.5" wrap="wrap" pt="2">
        {swatches.map((swatch) => (
          <chakra.button
            key={swatch.name}
            type="button"
            title={swatch.name}
            aria-label={`Use ${swatch.name}`}
            boxSize="5"
            borderRadius="full"
            style={{ background: swatch.hex }}
            boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
            outline={state.color === swatch.hex ? '2px solid' : undefined}
            outlineColor="fg"
            outlineOffset="2px"
            cursor="pointer"
            transition="transform 0.1s"
            _hover={{ transform: 'scale(1.15)' }}
            onClick={() => update({ color: swatch.hex })}
          />
        ))}
      </HStack>
    </Field.Root>
  )
}

function ForegroundField() {
  const { state, update, palette } = usePalette()
  const ratio = contrastRatio(
    palette.accent,
    foregroundColor(palette.accent, palette.accent.foreground),
  )

  return (
    <Field.Root>
      <Field.Label>Text on brand</Field.Label>
      <SegmentGroup.Root
        size="sm"
        width="full"
        value={state.foreground}
        onValueChange={(details) =>
          update({ foreground: (details.value ?? 'auto') as ForegroundMode })
        }
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          flex="1"
          items={[
            { value: 'auto', label: 'Auto' },
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
        />
      </SegmentGroup.Root>
      <Field.HelperText>
        {ratio.toFixed(2)}:1 contrast on the solid
        {ratio < 4.5 ? ', below WCAG AA for small text.' : '.'}
      </Field.HelperText>
    </Field.Root>
  )
}

function SliderField(props: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (value: number) => string
  onChange: (value: number) => void
  track?: string
  helper?: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <Field.Root>
      <Slider.Root
        width="full"
        size="sm"
        min={props.min}
        max={props.max}
        step={props.step}
        value={[props.value]}
        onValueChange={(details) => props.onChange(details.value[0] ?? 0)}
      >
        <HStack justify="space-between">
          <Slider.Label>{props.label}</Slider.Label>
          <HStack gap="2">
            {props.action}
            <Text textStyle="sm" color="fg.muted" fontFamily="mono">
              {props.format(props.value)}
            </Text>
          </HStack>
        </HStack>
        <Slider.Control>
          <Slider.Track style={props.track ? { background: props.track } : undefined}>
            {props.track ? null : <Slider.Range />}
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
      {props.helper && <Field.HelperText>{props.helper}</Field.HelperText>}
    </Field.Root>
  )
}

function Actions() {
  const { reset } = usePalette()

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    toast.create({ description: 'Link copied to clipboard', type: 'success' })
  }

  const tweet = () => {
    const text = `I made my color palette with the Saas UI palette generator 🎨\n\n${window.location.href}`
    window.open(
      `https://x.com/intent/post?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener',
    )
  }

  return (
    <Stack gap="2">
      <HStack gap="2">
        <Button
          flex="1"
          variant="solid"
          colorPalette="accent"
          onClick={() => void copyLink()}
        >
          <FiLink />
          Copy link
        </Button>
        <Button flex="1" variant="outline" onClick={tweet}>
          <FaXTwitter />
          Share
        </Button>
      </HStack>
      <Button variant="ghost" size="sm" onClick={reset}>
        <FiRotateCcw />
        Reset to Saas UI defaults
      </Button>
    </Stack>
  )
}

export function Configuration(props: { hideTitle?: boolean }) {
  const { state, update, palette } = usePalette()
  const vivid = palette.accent.c >= CATALOG_MAX_CHROMA

  return (
    <chakra.form onSubmit={(event) => event.preventDefault()}>
      <Stack gap="8">
        <Section title={props.hideTitle ? 'Brand' : 'Configure'}>
          <BrandColorField />
          <Text textStyle="xs" color="fg.subtle" fontFamily="mono" mt="-2">
            {formatOklch(palette.accent)}
          </Text>
          <ForegroundField />
        </Section>

        <Separator />

        <Section title="Neutrals">
          <SliderField
            label="Hue"
            value={state.baseHue}
            min={0}
            max={360}
            step={1}
            track={hueGradient}
            format={(value) => `${Math.round(value)}°`}
            onChange={(baseHue) => update({ baseHue })}
            action={
              <Button
                size="2xs"
                variant="ghost"
                onClick={() => update({ baseHue: Math.round(palette.accent.h) })}
              >
                Match brand
              </Button>
            }
          />
          <SliderField
            label="Tint"
            value={state.baseChroma}
            min={0}
            max={MAX_BASE_CHROMA}
            step={0.001}
            format={(value) => value.toFixed(3)}
            onChange={(baseChroma) => update({ baseChroma })}
            helper="How much of the hue shows in backgrounds, text and borders."
          />
          <Field.Root>
            <Field.Label>Contrast</Field.Label>
            <SegmentGroup.Root
              size="sm"
              width="full"
              value={state.contrast}
              onValueChange={(details) =>
                update({
                  contrast: (details.value ?? 'normal') as typeof state.contrast,
                })
              }
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items
                flex="1"
                items={[
                  { value: 'soft', label: 'Soft' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'strong', label: 'Strong' },
                ]}
              />
            </SegmentGroup.Root>
          </Field.Root>
        </Section>

        <Separator />

        <Section title="Catalog colors">
          <Switch.Root
            checked={state.harmonize}
            onCheckedChange={(details) => update({ harmonize: details.checked })}
            alignItems="flex-start"
          >
            <Switch.HiddenInput />
            <Switch.Control mt="0.5">
              <Switch.Thumb />
            </Switch.Control>
            <Box>
              <Switch.Label>Match brand chroma</Switch.Label>
              <Text textStyle="xs" color="fg.muted" mt="1">
                {vivid
                  ? 'Your brand color is already at full chroma, so the catalog stays as is.'
                  : 'Mute red, green, blue and the other catalog hues to sit next to your brand color.'}
              </Text>
            </Box>
          </Switch.Root>
        </Section>

        <Separator />

        <Actions />
      </Stack>
    </chakra.form>
  )
}
