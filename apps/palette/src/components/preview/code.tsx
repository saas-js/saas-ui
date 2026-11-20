'use client'

import * as React from 'react'

import {
  Box,
  Clipboard,
  HStack,
  IconButton,
  SegmentGroup,
  Stack,
  Text,
} from '@chakra-ui/react'

import { type ExportFormat, exportFormats, exportPalette } from '#/lib/code'

import { usePalette } from '../provider'

const descriptions: Record<ExportFormat, React.ReactNode> = {
  'saas-ui':
    'A Chakra UI system on the Saas UI preset. The seeds stay readable and the preset generates every token from them.',
  'chakra-ui':
    'Plain Chakra UI, no preset. Baked scales and semantic palettes you can drop into any v3 system.',
  css: 'Runtime theming. The preset resolves these variables in the browser, which suits white-labelling and live previews.',
  tailwind: 'Tailwind CSS v4 theme variables for the brand, gray and any matched catalog scales.',
  json: 'Seeds, scales and semantic palettes as data, for design tokens tooling.',
}

export function CodePreview() {
  const { palette } = usePalette()
  const [format, setFormat] = React.useState<ExportFormat>('saas-ui')
  const code = React.useMemo(() => exportPalette(palette, format), [palette, format])

  return (
    <Stack gap="4">
      <Box overflowX="auto">
        <SegmentGroup.Root
          size="sm"
          value={format}
          onValueChange={(details) =>
            setFormat((details.value ?? 'saas-ui') as ExportFormat)
          }
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            items={exportFormats.map(({ value, label }) => ({ value, label }))}
          />
        </SegmentGroup.Root>
      </Box>

      <Text color="fg.muted" textStyle="sm" maxW="2xl">
        {descriptions[format]}
      </Text>

      <Box
        position="relative"
        borderWidth="1px"
        borderRadius="l3"
        bg="bg.muted"
        overflow="hidden"
      >
        <HStack position="absolute" top="2" right="2" zIndex="1">
          <Clipboard.Root value={code}>
            <Clipboard.Trigger asChild>
              <IconButton variant="surface" size="xs" aria-label="Copy code">
                <Clipboard.Indicator />
              </IconButton>
            </Clipboard.Trigger>
          </Clipboard.Root>
        </HStack>
        <Box
          as="pre"
          p="5"
          pr="14"
          maxH="70vh"
          overflow="auto"
          fontFamily="mono"
          fontSize="xs"
          lineHeight="tall"
        >
          <code>{code}</code>
        </Box>
      </Box>

      {format === 'saas-ui' && (
        <Text color="fg.subtle" textStyle="xs">
          Requires <code>@saas-ui/chakra-preset</code> 3.x. Want a sidebar
          color, radii or fonts too? Try the theme customizer on{' '}
          <a href="https://saas-ui.dev" style={{ textDecoration: 'underline' }}>
            saas-ui.dev
          </a>
          .
        </Text>
      )}
    </Stack>
  )
}
