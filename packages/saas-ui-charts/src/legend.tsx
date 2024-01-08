import { Box, HStack, forwardRef } from '@chakra-ui/react'
import { Payload } from 'recharts/types/component/DefaultLegendContent'

export interface ChartLegendProps {
  payload?: Payload[]
}

export const ChartLegend = forwardRef<ChartLegendProps, 'div'>(
  ({ payload }, ref) => {
    return (
      <HStack ref={ref} justifyContent="flex-end" spacing="4">
        {payload?.map((entry, index) => (
          <HStack key={`item-${index}`} spacing="2">
            <Box rounded="full" bg={entry.color} boxSize="2" />
            <Box as="span">{entry.value}</Box>
          </HStack>
        ))}
      </HStack>
    )
  }
)
