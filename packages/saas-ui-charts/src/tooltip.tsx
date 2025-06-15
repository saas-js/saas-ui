import React from 'react'

import { Box, HStack, Text, useSlotRecipe } from '@chakra-ui/react'
import {
  NameType,
  Props,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

export interface ChartTooltipProps<
  TValue extends ValueType,
  TName extends NameType,
> extends Props<TValue, TName> {
  categoryColors: Record<string, string>
}

export const ChartTooltip = <TValue extends ValueType, TName extends NameType>(
  props: ChartTooltipProps<TValue, TName>,
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
    accessibilityLayer,
    itemSorter,
    separator,
    ...rest
  } = props

  const tooltipRecipe = useSlotRecipe({
    key: 'tooltip',
  })

  const [variantProps, restProps] = tooltipRecipe.splitVariantProps(rest)

  const styles = tooltipRecipe(variantProps)

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
            gap="1"
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
      css={styles.content}
      {...restProps}
    >
      <Text w="full" className={labelClassName} style={labelStyle}>
        {React.isValidElement(finalLabel) ? finalLabel : `${finalLabel}`}
      </Text>
      {renderContent()}
    </Box>
  )
}
