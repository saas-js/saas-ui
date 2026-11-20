'use client'

import { Box, Grid, HStack, Stack, Text } from '@chakra-ui/react'

const palettes = [
  { name: 'accent', note: 'brand' },
  { name: 'base', note: 'neutral' },
  { name: 'info' },
  { name: 'success' },
  { name: 'warning' },
  { name: 'destructive' },
]

const slots = ['solid', 'emphasized', 'subtle', 'muted', 'border', 'fg'] as const

const surfaces = [
  { token: 'bg', label: 'bg' },
  { token: 'bg.surface', label: 'surface' },
  { token: 'bg.elevated', label: 'elevated' },
  { token: 'bg.muted', label: 'muted' },
  { token: 'bg.inverted', label: 'inverted' },
]

const columns = `6.5rem repeat(${slots.length}, minmax(0, 1fr))`

function Chip(props: { palette: string; slot: (typeof slots)[number] }) {
  const { palette, slot } = props
  const common = {
    height: '10',
    borderRadius: 'l2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textStyle: 'xs',
    fontWeight: 'medium',
    title: `${palette}.${slot}`,
  }

  if (slot === 'solid') {
    return (
      <Box {...common} bg={`${palette}.solid`} color={`${palette}.contrast`}>
        Aa
      </Box>
    )
  }
  if (slot === 'border') {
    return <Box {...common} borderWidth="1px" borderColor={`${palette}.border`} />
  }
  if (slot === 'fg') {
    return (
      <Box {...common} color={`${palette}.fg`} fontSize="md">
        Aa
      </Box>
    )
  }
  return (
    <Box {...common} bg={`${palette}.${slot}`} color={`${palette}.fg`}>
      Aa
    </Box>
  )
}

function Panel(props: { mode: 'light' | 'dark' }) {
  return (
    <Stack
      className={props.mode}
      colorScheme={props.mode}
      bg="bg"
      color="fg"
      borderWidth="1px"
      borderRadius="l3"
      p={{ base: '4', md: '5' }}
      gap="5"
    >
      <Text textStyle="sm" fontWeight="semibold" textTransform="capitalize">
        {props.mode}
      </Text>

      <Stack gap="2">
        <Grid templateColumns={columns} gap="1.5">
          <Box />
          {slots.map((slot) => (
            <Text
              key={slot}
              textStyle="2xs"
              color="fg.subtle"
              textAlign="center"
              truncate
              title={slot}
            >
              {slot === 'emphasized' ? 'emph.' : slot}
            </Text>
          ))}
        </Grid>
        {palettes.map((palette) => (
          <Grid
            key={palette.name}
            templateColumns={columns}
            gap="1.5"
            alignItems="center"
          >
            <Stack gap="0">
              <Text textStyle="sm" fontWeight="medium">
                {palette.name}
              </Text>
              {palette.note && (
                <Text textStyle="2xs" color="fg.subtle">
                  {palette.note}
                </Text>
              )}
            </Stack>
            {slots.map((slot) => (
              <Chip key={slot} palette={palette.name} slot={slot} />
            ))}
          </Grid>
        ))}
      </Stack>

      <Stack gap="2">
        <Text textStyle="xs" color="fg.muted">
          Surfaces and text
        </Text>
        <HStack gap="1.5" align="stretch">
          {surfaces.map((surface) => (
            <Stack
              key={surface.token}
              flex="1"
              gap="0.5"
              p="2"
              borderWidth="1px"
              borderRadius="l2"
              bg={surface.token}
              color={surface.token === 'bg.inverted' ? 'fg.inverted' : 'fg'}
              title={surface.token}
            >
              <Text textStyle="xs" fontWeight="medium">
                {surface.label}
              </Text>
              <Text textStyle="2xs" opacity="0.7">
                Aa
              </Text>
            </Stack>
          ))}
        </HStack>
        <HStack gap="3" textStyle="sm">
          <Text color="fg">fg</Text>
          <Text color="fg.emphasized">emphasized</Text>
          <Text color="fg.muted">muted</Text>
          <Text color="fg.subtle">subtle</Text>
        </HStack>
      </Stack>
    </Stack>
  )
}

export function PalettesPreview() {
  return (
    <Stack gap="6">
      <Text color="fg.muted" textStyle="sm" maxW="2xl">
        Components read these semantic slots, not the raw scales. The base hue
        drives surfaces, text and borders. Status colors take their own hue
        and borrow the brand&apos;s lightness and chroma.
      </Text>
      <Grid templateColumns={{ base: '1fr', xl: '1fr 1fr' }} gap="4">
        <Panel mode="light" />
        <Panel mode="dark" />
      </Grid>
    </Stack>
  )
}
