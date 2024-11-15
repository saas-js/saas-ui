import { forwardRef } from 'react'

import { Box, HStack } from '@chakra-ui/react'
import { Payload } from 'recharts/types/component/DefaultLegendContent'

export interface ChartLegendProps {
  payload?: Payload[]
  categoryColors: Record<string, string>
}

export const ChartLegend = forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ payload, categoryColors }, ref) => {
    return (
      <HStack ref={ref} justifyContent="flex-end" gap="2">
        {payload?.map((entry, index) => (
          <HStack key={`item-${index}`} gap="1">
            <Box
              rounded="full"
              bg={categoryColors[entry.value as string] ?? entry.color}
              boxSize="2"
            />
            <Box as="span">{entry.value}</Box>
          </HStack>
        ))}
      </HStack>
    )
  },
)
