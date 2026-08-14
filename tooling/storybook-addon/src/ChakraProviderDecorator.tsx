import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { addons, makeDecorator } from 'storybook/preview-api'

import { ColorModeSync } from './color-mode/ColorModeSync'
import { DIRECTION_TOOL_ID, EVENTS } from './constants'
import { useDirection } from './direction/useDirection'

function isSystemContext(value: unknown): value is typeof defaultSystem {
  return (
    typeof value === 'object' &&
    value !== null &&
    'css' in value &&
    'token' in value
  )
}

function useThemeSync() {
  const [themeId, setThemeId] = React.useState(() => {
    if (typeof window === 'undefined') return '1'
    return window.localStorage.getItem('storybook.theme') ?? '1'
  })

  React.useEffect(() => {
    const channel = addons.getChannel()
    const setTheme = (value: string) => {
      window.localStorage.setItem('storybook.theme', value)
      setThemeId(value)
    }
    channel.on(EVENTS.SET_THEME, setTheme)
    return () => channel.removeListener(EVENTS.SET_THEME, setTheme)
  }, [])

  return themeId
}

/**
 * Chakra v3 decorator backed by the published Saas UI preset.
 *
 * `parameters.saasui.system` is the preferred custom-system override. For
 * compatibility, `parameters.saasui.theme` is also accepted when it is a
 * Chakra v3 SystemContext or a function returning one.
 */
export const ChakraProviderDecorator = makeDecorator({
  name: 'ChakraProviderDecorator',
  parameterName: 'chakra',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context) => {
    const {
      parameters: { saasui: saasuiParams = {} },
      globals: { [DIRECTION_TOOL_ID]: globalDirection },
    } = context

    useThemeSync()
    useDirection(globalDirection === 'rtl' ? 'rtl' : 'ltr')

    const configuredSystem =
      typeof saasuiParams.system === 'function'
        ? saasuiParams.system(context)
        : saasuiParams.system
    const legacyTheme =
      typeof saasuiParams.theme === 'function'
        ? saasuiParams.theme(context)
        : saasuiParams.theme
    const system = isSystemContext(configuredSystem)
      ? configuredSystem
      : isSystemContext(legacyTheme)
        ? legacyTheme
        : defaultSystem
    const story = getStory(context) as React.ReactNode

    return (
      <ChakraProvider value={system}>
        <ColorModeSync />
        {story}
      </ChakraProvider>
    )
  },
})
