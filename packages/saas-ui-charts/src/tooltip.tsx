import { Box, HStack, Text, useStyleConfig } from '@chakra-ui/react'
import React from 'react'
import {
  NameType,
  ValueType,
  Props,
} from 'recharts/types/component/DefaultTooltipContent'

export const ChartTooltip = <TValue extends ValueType, TName extends NameType>(
  props: Props<TValue, TName> & {
    categoryColors: Record<string, string>
  }
) => {
  const {
    categoryColors,
    contentStyle = {},
    itemStyle = {},
    labelStyle = {},
    payload,
    formatter,
    wrapperClassName,
    labelClassName,
    label,
    labelFormatter,
  } = props

  const tooltipTheme = useStyleConfig('Tooltip')

  const renderContent = () => {
    if (payload && payload.length) {
      const items = payload.map((entry, i) => {
        if (
          entry.type === 'none' ||
          entry.value === undefined ||
          entry.name === undefined
        ) {
          return null
        }

        const finalItemStyle = {
          paddingTop: 2,
          paddingBottom: 2,
          ...itemStyle,
        }
        const finalFormatter = entry.formatter || formatter
        const { value, name } = entry
        let finalValue: React.ReactNode = value
        let finalName: React.ReactNode = name
        if (finalFormatter && finalValue != null && finalName != null) {
          const formatted =
            finalFormatter?.(value, name, entry, i, payload) ?? value
          if (Array.isArray(formatted)) {
            ;[finalValue, finalName] = formatted
          } else {
            finalValue = formatted
          }
        }

        return (
          <HStack
            as="li"
            key={`tooltip-item-${i}`}
            style={finalItemStyle}
            spacing="1"
          >
            <Box
              rounded="full"
              bg={categoryColors[entry.name as string] ?? entry.color}
              boxSize="2"
            />
            {finalName ? (
              <Box
                flex="1"
                minWidth="80px"
                color="var(--tooltip-fg-muted, var(--chakra-colors-muted))"
              >
                {finalName}
              </Box>
            ) : null}

            <Box textAlign="right">
              <span>{finalValue}</span>
              <span>{entry.unit || ''}</span>
            </Box>
          </HStack>
        )
      })

      return <Box as="ul">{items}</Box>
    }

    return null
  }

  const hasLabel = !!label
  let finalLabel = hasLabel ? label : ''

  if (hasLabel && labelFormatter && payload !== undefined && payload !== null) {
    finalLabel = labelFormatter(label, payload)
  }

  return (
    <Box
      outline="none"
      flexDirection="column"
      className={wrapperClassName}
      style={contentStyle}
      sx={tooltipTheme}
    >
      <Text w="full" className={labelClassName} style={labelStyle}>
        {React.isValidElement(finalLabel) ? finalLabel : `${finalLabel}`}
      </Text>
      {renderContent()}
    </Box>
  )
}
