import * as React from 'react'

import { extendTheme } from '@chakra-ui/react'
import { makeDecorator } from '@storybook/preview-api'
import { addons } from '@storybook/addons'
import { ColorModeSync } from './color-mode/ColorModeSync'
import { useDirection } from './direction/useDirection'
import { EVENTS, DIRECTION_TOOL_ID } from './constants'

import { SaasProvider, useLocalStorage } from '@saas-ui/react'

import { baseTheme, theme as suiTheme } from '@saas-ui/theme'
import { theme as baseGlassTheme } from '@saas-ui/theme-glass'

const glassTheme = extendTheme(baseGlassTheme, suiTheme)

const useThemeSync = () => {
  const [themeId, setTheme] = useLocalStorage('storybook.theme', '1')

  React.useEffect(() => {
    const channel = addons.getChannel()

    const themeCallback = (value: string) => {
      console.log(value)
      setTheme(value)
    }
    channel.on(EVENTS.SET_THEME, themeCallback)

    return () => {
      channel.removeListener(EVENTS.SET_THEME, themeCallback)
    }
  }, [setTheme])

  return themeId
}

export const ChakraProviderDecorator = makeDecorator({
  name: 'ChakraProviderDecorator',
  parameterName: 'chakra',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const {
      parameters: { saasui: saasuiParams },
      globals: { [DIRECTION_TOOL_ID]: globalDirection },
    } = context

    const themeId = useThemeSync()

    const getTheme = React.useCallback(() => {
      switch (themeId) {
        case '1':
          return suiTheme
        case '2':
          return glassTheme
        default:
          return baseTheme
      }
    }, [themeId])

    const theme = saasuiParams?.theme || getTheme()
    const themeOverride = !!saasuiParams?.theme

    const chakraTheme = saasuiParams?.theme
      ? typeof saasuiParams.theme === 'function'
        ? saasuiParams.theme(context)
        : saasuiParams.theme
      : theme
    const direction = useDirection(globalDirection || chakraTheme?.direction)
    const themeWithDirectionOverride = React.useMemo(
      () =>
        extendTheme(
          {
            direction,
            styles: {
              global: {
                body: {
                  minHeight: 'var(--chakra-vh)',
                },
              },
            },
          },
          chakraTheme
        ),
      [chakraTheme, direction]
    )

    return (
      <SaasProvider {...saasuiParams} theme={themeWithDirectionOverride}>
        <ColorModeSync />
        {getStory(context)}
      </SaasProvider>
    )
  },
})
