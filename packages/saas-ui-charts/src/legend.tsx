import { Box, HStack, forwardRef } from '@chakra-ui/react'
import { Payload } from 'recharts/types/component/DefaultLegendContent'

export interface ChartLegendProps {
  payload?: Payload[]
  categoryColors: Record<string, string>
}

export const ChartLegend = forwardRef<ChartLegendProps, 'div'>(
  ({ payload, categoryColors }, ref) => {
    return (
      <HStack ref={ref} justifyContent="flex-end" spacing="2">
        {payload?.map((entry, index) => (
          <HStack key={`item-${index}`} spacing="1">
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
  }
)
