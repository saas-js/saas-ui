import { mergeThemeOverride, type ThemeExtension } from '@chakra-ui/react'
import type { ThemingProps } from '@chakra-ui/styled-system'

type Dict<T = any> = Record<string, T>

export function isObject(value: any): value is Dict {
  const type = typeof value
  return (
    value != null &&
    (type === 'object' || type === 'function') &&
    !Array.isArray(value)
  )
}

export function withDefaultColorScheme({
  colorScheme,
  components,
}: {
  colorScheme: ThemingProps['colorScheme']
  components?: string[] | Record<string, any>
}): ThemeExtension {
  return (theme) => {
    let names = Object.keys(theme.components || {})

    if (Array.isArray(components)) {
      names = components
    } else if (isObject(components)) {
      names = Object.keys(components)
    }

    return mergeThemeOverride(theme, {
      components: Object.fromEntries(
        names.map((componentName) => {
          const withColorScheme = {
            defaultProps: {
              colorScheme,
            },
          }
          return [componentName, withColorScheme]
        })
      ),
    })
  }
}
