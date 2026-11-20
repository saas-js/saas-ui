'use client'

import * as React from 'react'

import {
  Box,
  Grid,
  HStack,
  SegmentGroup,
  Stack,
  Switch,
  Text,
  chakra,
} from '@chakra-ui/react'
import { scaleSteps } from '@saas-ui/appearance'

import { contrastRatio, inSrgbGamut, oklchToHex, parseOklch } from '#/lib/color'
import { chromaticNames } from '#/lib/palette'

import { usePalette } from '../provider'
import { toast } from '../toaster'

type CopyFormat = 'oklch' | 'hex'

/** The gamut markers are a debugging aid, not something visitors need. */
const isDev = process.env.NODE_ENV === 'development'

const WHITE = { l: 1, c: 0, h: 0 }
const BLACK = { l: 0, c: 0, h: 0 }

const columns = `7rem repeat(${scaleSteps.length}, minmax(0, 1fr))`

function Swatch(props: {
  name: string
  step: number
  value: string
  copyFormat: CopyFormat
  showGamut: boolean
}) {
  const color = parseOklch(props.value)!
  const hex = oklchToHex(color)
  const onWhite = contrastRatio(color, WHITE)
  const onBlack = contrastRatio(color, BLACK)
  const light = onBlack > onWhite
  const ratio = Math.max(onWhite, onBlack)
  const clipped = !inSrgbGamut(color)

  const copy = async () => {
    const text = props.copyFormat === 'hex' ? hex : props.value
    await navigator.clipboard.writeText(text)
    toast.create({ description: `Copied ${props.name}.${props.step}: ${text}` })
  }

  return (
    <chakra.button
      type="button"
      className="group"
      position="relative"
      height="14"
      cursor="pointer"
      style={{ background: props.value }}
      color={light ? 'black' : 'white'}
      transition="transform 0.12s, box-shadow 0.12s"
      _hover={{
        transform: 'scale(1.12)',
        zIndex: 1,
        boxShadow: 'lg',
        borderRadius: 'l2',
      }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'fg', zIndex: 1 }}
      title={`${props.name}.${props.step} · ${props.value} · ${hex}${clipped ? ' (clipped to sRGB)' : ''}`}
      aria-label={`Copy ${props.name}.${props.step}`}
      onClick={() => void copy()}
    >
      <Stack
        gap="0"
        fontSize="2xs"
        lineHeight="short"
        fontFamily="mono"
        opacity="0"
        _groupHover={{ opacity: 1 }}
        _groupFocusVisible={{ opacity: 1 }}
      >
        <span>{hex}</span>
        <span style={{ opacity: 0.7 }}>{ratio.toFixed(1)}</span>
      </Stack>
      {props.showGamut && clipped && (
        <Box
          position="absolute"
          top="1"
          right="1"
          boxSize="1"
          borderRadius="full"
          bg="currentColor"
          opacity="0.5"
        />
      )}
    </chakra.button>
  )
}

function Row(props: {
  name: string
  label?: string
  copyFormat: CopyFormat
  showGamut: boolean
  note?: string
}) {
  const { palette } = usePalette()
  const scale = palette.scales[props.name]
  if (!scale) return null

  return (
    <Grid templateColumns={columns} alignItems="center">
      <Stack gap="0" pr="3">
        <Text textStyle="sm" fontWeight="medium" textTransform="capitalize">
          {props.label ?? props.name}
        </Text>
        {props.note && (
          <Text textStyle="xs" color="fg.subtle">
            {props.note}
          </Text>
        )}
      </Stack>
      {scaleSteps.map((step) => (
        <Swatch
          key={step}
          name={props.name}
          step={step}
          value={scale[step]!.value}
          copyFormat={props.copyFormat}
          showGamut={props.showGamut}
        />
      ))}
    </Grid>
  )
}

export function ColorsPreview() {
  const { palette } = usePalette()
  const [copyFormat, setCopyFormat] = React.useState<CopyFormat>('oklch')
  const [showGamut, setShowGamut] = React.useState(false)

  return (
    <Stack gap="6">
      <HStack justify="flex-end" gap="4">
        {isDev && (
          <Switch.Root
            size="sm"
            checked={showGamut}
            onCheckedChange={(details) => setShowGamut(details.checked)}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Mark out of sRGB</Switch.Label>
          </Switch.Root>
        )}
        <SegmentGroup.Root
          size="xs"
          value={copyFormat}
          onValueChange={(details) =>
            setCopyFormat((details.value ?? 'oklch') as CopyFormat)
          }
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            items={[
              { value: 'oklch', label: 'OKLCH' },
              { value: 'hex', label: 'Hex' },
            ]}
          />
        </SegmentGroup.Root>
      </HStack>

      <Box
        overflowX="auto"
        mx={{ base: '-4', md: '0' }}
        px={{ base: '4', md: '0' }}
      >
        <Stack gap="1" minW="720px" borderRadius="l3" overflow="visible">
          <Grid templateColumns={columns}>
            <Box />
            {scaleSteps.map((step) => (
              <Text
                key={step}
                textAlign="center"
                textStyle="xs"
                color="fg.muted"
                pb="1"
              >
                {step}
              </Text>
            ))}
          </Grid>

          <Row
            name="brand"
            copyFormat={copyFormat}
            showGamut={showGamut}
            note="accent"
          />
          <Row
            name="gray"
            copyFormat={copyFormat}
            showGamut={showGamut}
            note="base tint"
          />
          <Box height="4" />
          {chromaticNames.map((name) => (
            <Row
              key={name}
              name={name}
              copyFormat={copyFormat}
              showGamut={showGamut}
              note={palette.catalog[name] ? 'matched' : undefined}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}
