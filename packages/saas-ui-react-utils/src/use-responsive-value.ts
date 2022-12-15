import {
  ResponsiveValue,
  UseBreakpointOptions,
  useTheme,
  useBreakpointValue,
} from '@chakra-ui/react'

const normalize = (variant: any, toArray?: (value: any) => any) => {
  if (Array.isArray(variant)) return variant
  else if (typeof variant === 'object') return toArray?.(variant)
  if (variant != null) return [variant]
  return []
}

export const useResponsiveValue = (
  value: ResponsiveValue<any>,
  options?: UseBreakpointOptions
) => {
  const theme = useTheme()
  const normalized = normalize(value, theme.__breakpoints?.toArrayValue)
  return useBreakpointValue(normalized, options)
}
